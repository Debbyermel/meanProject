import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {


  constructor(private usersService: UsersService) {}

   usersList: Array<any>;

  ngOnInit() {
  this.usersService.fetchUsers()
  .subscribe(usersList => {
    this.usersList = usersList;
  });

  }
}



