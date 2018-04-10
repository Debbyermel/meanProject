import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BlogService {
  options = {withCredentials: true};

  constructor( private http: Http ) { }

  // Create a new Post
  newBlog(blog) {
    return this.http.post('http://localhost:3000/api/blogs/newPost', blog, this.options)
    .map(res => res.json());
  }

  // Function to get all posts from the database
  getAllBlogs() {
    return this.http.get('http://localhost:3000/api/blogs/', this.options)
    .map(res => res.json());
  }

} // End class.

