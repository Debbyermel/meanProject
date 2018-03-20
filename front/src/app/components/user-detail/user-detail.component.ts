import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  singleUser = {avatar:''};
  constructor(
      private usersService: UsersService,
      private activateRouter: ActivatedRoute
    ) { }

  ngOnInit() {
    this.activateRouter.params.subscribe(params => {
      this.usersService.getUser(params['id'])
        .subscribe(singleUser => this.singleUser = singleUser);
    });
  }

}

