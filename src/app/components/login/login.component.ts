import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup

  constructor(private auth: AuthService, private router: Router, private cookieService: CookieService){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    })
  }

 

  login() {
    const user = this.loginForm.value;
    this.auth.login(user).subscribe(
      (res) => {
        const token = res.token;
        this.cookieService.set('TokenKey', token);
        this.router.navigate(['/movies']);

      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
