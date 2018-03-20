import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) { }
  user = {};
  logged = false;


  onLoginSubmit(e) {
    e.preventDefault();
    this.usersService.login(this.user)
    .subscribe(user => {
     // console.log("maldito",user);
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
    if ( localStorage.getItem('user') ) {
      this.router.navigate(['users']);
    }
  }
}
