import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}
  formData = new FormData();
  user;
  success = true;

//   user=local
//   user.role === "IRONHACKER"
//   navigate

chooseFile(input) {
  input.click();
}

  ngOnInit() {
 if (!localStorage.getItem('user')) {
      this.router.navigate(['login']);
 }
 this.user = JSON.parse(localStorage.getItem('user'));
 // console.log("otro maldito",this.user);
}

// Show alert when User update profile
 showAlert() {
  this.success = !this.success;
 }

// Update User Component
 updateUser() {
    console.log(this.user);
    // add every field in user to fromdata
    const keys = Object.keys(this.user);
    for (const key of keys) {
      this.formData.append(key, this.user[key]);
    }
    console.log(this.user);

    this.usersService.updateUser(this.formData, this.user._id)
    .subscribe(user => {
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.formData = new FormData();
 });
    this.showAlert(); // activating alert panel
    setTimeout(() => {
      location.reload();
    }, 500); // refreshing picture when change
}


// Delete User Component
deleteUser() {
  this.usersService.removeUser(this.user._id)
  .subscribe(user => {
    this.router.navigate(['']);
  });
  console.log(this.user + 'was deleted');
}

manageFile(e) {
  this.formData.append(e.target.name, e.target.files[0]);
}

 }// class close
