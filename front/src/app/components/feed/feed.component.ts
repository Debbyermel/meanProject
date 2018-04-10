import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {BlogService} from '../../services/blog.service';
import {UsersService} from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
 msgClass;
 msg;
 newPost = false;
 loadingPosts = false;
 form;
 processing = false;
 user;
 posts = [];

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private usersService: UsersService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {
    this.createNewPostForm();
  // Create new post form on start up
  }

// Function to create new post form with validation
  createNewPostForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(400),
        Validators.minLength(5)
      ])]
    });
  }

  // Enable new blog form
  enableFormNewPostForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('body').enable(); // Enable body field
  }

  // Disable new blog form
  disableFormNewPostForm() {
    this.form.get('title').disable(); // Disable title field
    this.form.get('body').disable(); // Disable body field
  }


  // Function to display new blog form
   newPostForm() {
    this.newPost = true; // Show new blog form
  }

  // Reload blogs on current page
  refreshPosts() {
    this.loadingPosts = true;
     // showing posts
     setTimeout(() => {
         this.loadingPosts = false;
       }, 4000); // After click Refresh posts and it will have 4s till refresh again.
    }

  // Function to post a new comment
   postComment() {

   }

  // Function to submit a new post
  onPostSubmit() {
    console.log('form submited');
   this.processing = true; // Disable submit button
   this.disableFormNewPostForm(); // Lock form

  const post = {
      title: this.form.get('title').value, // Title field
      body: this.form.get('body').value, // Body field
      user: this.user.username           // Creator field
    };

     this.blogService.newBlog(post).subscribe(data => {
      // Check if post was saved to database or not
      if (data.success) {
        this.msgClass = 'alert alert-success'; // Return success class
        this.msg = data.message; // Return success message
        // this.getAllBlogs();
       // Clear form data after two seconds
       setTimeout(() => {
         this.newPost = false; // Hide form
         this.processing = false; // Enable submit button
         this.msg = false; // Erase error/success message
         this.form.reset(); // Reset all form fields
         this.enableFormNewPostForm(); // Enable the form fields
       }, 2000);
      } else {
     this.msgClass = 'alert alert-danger'; // Return error class
     this.msg = data.message; // Return error message
     this.processing = false; // Enable submit button
     this.enableFormNewPostForm(); // Enable form
   }
   window.location.reload();

  });
}

  // Function to go back to previous page
  backToBoard() {
    window.location.reload(); // Clear all variable states
  }

  ngOnInit() {
     this.user = JSON.parse(localStorage.getItem('user'));
     if (!this.user || this.user.role !== 'IRONHACKER') {
      this.router.navigate(['']); // redirect to a new page and tell the user to become an ironhacker
    }
    this.activateRouter.params.subscribe(params => {
      this.usersService.getUser(params['id'])
      .subscribe(singleUser => this.user = singleUser.username);
    });

 this.blogService.getAllBlogs()
    .subscribe(posts => {
      this.posts = posts;
    });

  }
} // end of class

