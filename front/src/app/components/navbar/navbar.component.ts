import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged = false;
  user;
  constructor(
    private session: UsersService,
    private route: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  mouseHover(e) {
    console.log('hovered', e);
  }

  logout() {
    this.session.logout()
    .subscribe(data => {
      localStorage.removeItem('user');
      this.user = null;
      this.route.navigate(['/']);
    });
  }

}

