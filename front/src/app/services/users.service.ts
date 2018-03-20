import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class UsersService {


  user;
  constructor( private http: Http ) { }

  fetchUsers(): Observable<any> {
   return this.http.get('http://localhost:3000/api/users', { withCredentials: true})
   .map((res: Response) => res.json())
   .map(user => user)
   .catch(e => {
     console.log(e);
     return Observable.throw(e);
   });
  }


  // detailUser(id): Observable<any>  {
  //   return this.http.get(`http://localhost:3000/api/users/${id}`)
  //  .map((res: Response) => res.json())
  //  .map(user => user)
  //  .catch(e => {
  //   return Observable.throw(e);
  //  });
  // }

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
      localStorage.setItem('user', JSON.stringify(userL));
      return userL;
    })
    .catch(e => {
      console.log(e);
      return Observable.throw(e);
  });
  }

  logout() {
    return this.http.post('http://localhost:3000/api/users/logout', {})
      .map(res => res.json())
      .catch(e => {
        console.log(e);
        return Observable.throw(e);
      });
}

  updateUser(updatedUser, id) {
    return this.http.patch('http://localhost:3000/api/users/update/' + id, updatedUser, {withCredentials: true})
    .map((res: Response) => res.json())
    .map(user => user)
    .catch(e => {
      console.log(e);
      return Observable.throw(e);
    });
  }

  

  // singleFile(formData) {
  //   return this.http.post('http://localhost:3000/single', formData)
  //   .map(res => res.json())
  //   .catch(e => Observable.throw(e));
  // }

  // removeUser(id): Observable<any> {
  //   return this.http.delete(`http://localhost:3000/api/users/${id}`)
  //   .map((res: Response ) => res.json())
  //   .map(deleteUser => user)
  //   .catch(e => {
  //     console.log(e);
  //     return Observable.throw(e);
  //   });
  // }
}

