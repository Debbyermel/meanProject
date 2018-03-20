import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
 messageClass;
 message;
 newPost = false;
 loadingFeed = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }
  newFeedForm() {
  this.newPost = true;
  }

  reloadFeed() {
    this.loadingFeed = true;
    // Get all feed
   setTimeout(() => {
     this.loadingFeed = false;
   }, 4000);
  }

  ngOnInit() {
  }

}
