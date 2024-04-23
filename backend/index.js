const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config({path: './config.env'});
const app = express();
const userRoute = require('../backend/Routes/UsersRoute')



app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/avatarPic', express.static('avatarPic'));



app.use("/users", userRoute);

app.all('*', (request, response, next) => {
    response.status(404).json({
        status: 'failed',
        message: `Can't find ${request.originalUrl} on the server!`
    })
})



mongoose.connect(process.env.CONN_STR)
.then((con) => {
    console.log('DB connected!')
}).catch((err) => {
    console.error(`Error connecting to DB: ${err}`)
})


app.listen(process.env.PORT || 3000, () => {
    console.log("server started...")
});