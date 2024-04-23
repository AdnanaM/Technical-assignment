import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userForm!: FormGroup
  selectedFile: File | null = null

  constructor(private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      age: new FormControl(''),
      photo: new FormControl('')
    })
  }

  signup(){
    const formData = new FormData();
    formData.append('name', this.userForm.get('name')?.value);
    formData.append('email', this.userForm.get('email')?.value);
    formData.append('password', this.userForm.get('password')?.value);
    formData.append('age', this.userForm.get('age')?.value);
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    this.auth.signup(formData).subscribe((res) => {
      console.log('succes', res)
      this.router.navigate(['/login'])
    })
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
