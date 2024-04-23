const User = require('../Models/UsersSchema');
const jwt = require('jsonwebtoken');
const util = require('util');
const sendEmail = require('../Email');


exports.signup = async(request, response) => {
    try{
        const { name, email, password, role, age } = request.body;
        const photoPath = request.file ? request.file.path : undefined;

        const newUser = await User.create({
            name,
            email,
            password,
            role,
            age,
            photo: photoPath
        });

        response
            .status(201)
            .json({
                status: "success",
                data: newUser
            })
    }catch(err){
        response
            .status(400)
            .json({
                status: "fail",
                message: err.message
            })
    }
}

exports.login = async(request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    
    if(!email || !password){
        return response.status(400).json({
            status: "failed",
            messagge: 'Please provide email and password for login!'
        })
    }

    
    const userDB = await User.findOne({email});

    if(!userDB || !(await userDB.comparePassword(password, userDB.password))){
        return response.status(404).json({
            status: "failed",
            messagge: 'Incorrect email or password!'
        })
    }


   
    const token = jwt.sign({id: userDB._id}, process.env.SECRET_STR, {
        expiresIn: process.env.EXPIRATION_TIME
    });

    response.status(200).json({
        status: 'succes',
        token,
        data: userDB
    });
};


exports.protectSystem = async(request, response, next) => {
    try{
       
        const valueToken = request.headers.authorization;
        let token;
        if(valueToken && valueToken.toLowerCase().startsWith('bearer')){
            token = valueToken.split(" ")[1];
        }

        if(!token){
            return response.status(401).json({
                status: "failed",
                messagge: "You are not logged in!"
            })
        }

      
        const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);

       
        const currentUser = await User.findById(decodedToken.id);
        if(!currentUser){
            return response.status(401).json({
                status: "failed",
                messagge: "The user doesn't exist!!"
            });
        };


       
        if(await currentUser.isPasswordChanged(decodedToken.iat)){
            return response.status(401).json({
                status: "failed",
                messagge: "The password was changed!Please login again!!"
            });
        }

        
        request.user = currentUser;
        next()
    }catch(err){
        response.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.getLoggedUser = async(request, response) => {
    return response.status(200).json({
        status:"success",
        data: request.user
    })
}


exports.permission = async(req, res, next) => {
    if (req.user && req.user.role && req.user.role == "admin") {
      next();
    } else {
        return res.status(403).json({
            message: "you don’t have permission",
        });
    }
};

exports.forgotPassword = async(request, response, next) => {
        const user = await User.findOne({email: request.body.email});
        if(!user){
            return response.status(404).json({
                status:"failed",
                messagge: "User not found!"
            })
        }

    
        const resetToken = await user.createNewPasswordToken();
        await user.save();

  
    const resetUrl = `${request.protocol}://localhost:4200/resetPassword/${resetToken}`;
    const message = `Follow this link to reset you password\n\n${resetUrl}\n\nThis reset password link will expire in 10 minutes.`

    try{
        sendEmail({
            email: user.email,
            subject: 'Reset your password',
            message: message
        });
        return response.status(200).json({
            status: "succes",
            message: "Token sent to your email!",
            
        });
    }catch(err){
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        await user.save();
        return response.status(500).json({
            status: "failed",
            message: "error sending email",
        });
    }
}

exports.resetPassword = async(request, response, next) => {
    const userData = await User.findOne({passwordResetToken: request.params.token, passwordResetTokenExpires: {$gt: Date.now()}});
    if(!userData){
        return response.status(400).json({
            status: "failed",
            messagge: "Token is invalid or has expired!!"
        }); 
    }

    
    userData.password = request.body.password;
    userData.passwordResetToken = undefined;
    userData.passwordResetTokenExpires = undefined;
    userData.passwordChangedAt = Date.now();
    await userData.save();

    
    const JWT = jwt.sign({id: userData._id}, process.env.SECRET_STR, {
        expiresIn: process.env.EXPIRATION_TIME
    });


    return response.status(200).json({
        status: 'succes',
        JWT,
        data: userData
    });
}


exports.updatePassword = async(request, response) => {
   
    const userData = await User.findById(request.user.id);

    
    if(!await userData.comparePassword(request.body.password, userData.password)){
        return response.status(404).json({
            status:"failed",
            message: "Incorrect current password!"
        })
    }
   
    userData.password = request.body.newPassword;
    userData.passwordChangedAt = Date.now();
    await userData.save();

    
    const JWT = jwt.sign({id: userData._id}, process.env.SECRET_STR, {
        expiresIn: process.env.EXPIRATION_TIME
    })

    return response.status(200).json({
        status: 'success',
        JWT,
        data: userData
    })
}


exports.updateUserInfo = async(request, response) => {
    
    if(request.body.password){
        return response.status(400).json({
            status:'failed',
            message: "This route is not for password updated. Please access /updatePassword"
        })
    }

    
    const updateData = { ...request.body };
  
    if (request.file) {
        updateData.photo = request.file.path; 
    }
    const updatedUser = await User.findByIdAndUpdate(request.user.id,updateData, {new: true, runValidators: true});

    return response.status(200).json({
        status: 'succes',
        data: updatedUser
    })
}


exports.deleteMe = async(request, response) => {
    await User.findByIdAndDelete(request.user.id);

    return response.status(200).json({
        status: 'succes',
        data: null
    })
}


// exports.getAllUsers = async(request, response) => {
//     const allusers = await User.find();

//     return response.status(200).json({
//         status: 'succes',
//         count: allusers.length,
//         data: allusers
//     })
// }


exports.getAllUsers = async (request, response) => {
    try {
        const currentUserID = request.user.id; 
        const allUsersExceptCurrent = await User.find({ _id: { $ne: currentUserID } });

        return response.status(200).json({
            status: 'success',
            count: allUsersExceptCurrent.length,
            data: allUsersExceptCurrent
        });
    } catch (error) {
        return response.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};


