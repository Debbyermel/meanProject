import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {BlogService} from '../../services/blog.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

 messageClass;
 message;
 newPost = false;
 loadingPosts = false;
 form;
 processing = false;
 user;
 posts = [];
 // username;  name of creator of post 

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) {
    this.createNewBlogForm();
  // Create new blog form on start up
  }

// Function to create new blog form with validation
  createNewBlogForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    });
  }

  // Enable new blog form
  enableFormNewBlogForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('body').enable(); // Enable body field
  }

  // Disable new blog form
  disableFormNewBlogForm() {
    this.form.get('title').disable(); // Disable title field
    this.form.get('body').disable(); // Disable body field
  }


  // Function to display new blog form
   newBlogForm() {
    this.newPost = true; // Show new blog form
  }

  // Reload blogs on current page
 refreshPosts() {
    this.loadingPosts = true; // Used to lock button
     // showing posts
     setTimeout(() => {
         this.loadingPosts = false;
       }, 4000); // After click Refresh posts and it will have 4s till refresh again.
    }

  // Function to post a new comment on blog post
  // postComment() {

  // }

  // Function to submit a new blog post
  onPostSubmit() {
    console.log('form submited');
   this.processing = true; // Disable submit button
   this.disableFormNewBlogForm(); // Lock form
    // Create blog object from form fields

 const blog = {
      title: this.form.get('title').value, // Title field
      body: this.form.get('body').value, // Body field
      // createdBy: this.username  // --> bring the user that is logged in a author
      //author: this.user._id
    };

     this.blogService.newBlog(blog).subscribe(data => { 
      console.log("chubaquito",data); 
      // Check if blog was saved to database or not
      if (!data.success) {
       this.messageClass = 'alert alert-danger'; // Return error class
         this.message = data.message; // Return error message
        this.processing = false; // Enable submit button
        this.enableFormNewBlogForm(); // Enable form
       } else {
         this.messageClass = 'alert alert-success'; // Return success class
         this.message = data.message; // Return success message
        // Clear form data after two seconds
        setTimeout(() => {
          this.newPost = false; // Hide form
          this.processing = false; // Enable submit button
          this.message = false; // Erase error/success message
         this.form.reset(); // Reset all form fields
          this.enableFormNewBlogForm(); // Enable the form fields
        }, 2000);
     }
   });
  }

  // Function to go back to previous page
  backToBoard() {
    window.location.reload(); // Clear all variable states
  }

  ngOnInit() {
     this.user = JSON.parse(localStorage.getItem('user'));
    if(!this.user || this.user.role !== "IRONHACKER"){
      this.router.navigate(['']) //redireccionar to a page para tell the user to become un ironhacker
    }

    this.blogService.getAllBlogs()
    .subscribe(posts=>{
      this.posts = posts;
    })
  }
} // end of class

