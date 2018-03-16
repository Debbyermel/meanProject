import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private router: Router,
    private usersService: UsersService
  ) { }
  user = {};
//     user=local
//   user.role === "IRONHACKER"
//    navigate

  ngOnInit() {
    if ( !localStorage.getItem('user') ) {
      this.router.navigate(['login']);
    }
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  updateUser(){
    this.usersService.updateUser(this.user)
    .subscribe(user=>{
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
      alert('exito');
    });
  }

}
