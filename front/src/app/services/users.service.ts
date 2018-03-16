import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



@Injectable()
export class UsersService {

  constructor(
    private http: Http
  ) { }

  fetchUsers(): Observable<any> {
   return this.http.get('http://localhost:3000/users')
   .map((res: Response) => res.json())
   .map(user => user)
   .catch(e => {
     console.log(e);
     return Observable.throw(e);
   });
  }

   addUser(newUser): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/signup', newUser)
    .map((res: Response) => res.json())
    .map(user => user)
    .catch(e => {
      console.log(e);
      return Observable.throw(e);
    });
  }

  login(user) {
    return this.http.post('http://localhost:3000/api/users/login', user, { withCredentials: true })
    .map(res => res.json())
    .map(userL => {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    })
    .catch(e => {
      console.log(e);
      return Observable.throw(e);
  });
  }

}
