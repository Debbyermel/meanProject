import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged = !true;
  user;
  constructor(
    private session: UsersService,
    private route: Router
  ) { }



  ngOnInit() {}

  logout() {
    this.session.logout()
    .subscribe(data => {
      this.route.navigate(['login']);
      localStorage.removeItem('user');
    });
  }

}
