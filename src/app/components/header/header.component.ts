import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  leftSidebar;
  userLogged: any

  constructor(private auth: AuthService, private cookieService: CookieService){}

  ngOnInit(): void {
    const token = this.cookieService.get('TokenKey');
    this.auth.getLoggedUser(token).subscribe((res) => {
      this.userLogged = res
      console.log(this.userLogged)
    })
  }



}
