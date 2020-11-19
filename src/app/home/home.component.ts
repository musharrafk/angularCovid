import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { CommonService } from '../common.service';
import { AuthService } from '../auth/auth.service';
import { Router, CanActivate } from '@angular/router';
import { Feed } from '../feed';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  message: any;
  chat: any;
  loggedIn = false;
  toState = 'state1';
  /// FOR FEEDS///////
  public data: Feed[] = [];
  public feedSubscription: Subscription;
  /// FOR FEEDS///////

  public isSending: boolean;
  public httpClient: HttpClient;

  public content: string;
  public errorMsg: string;
  public infoMsg: string;
  public title: string;
  public userdata: string;
  public name: string;
  public posts: Feed[] = [];

  constructor(
    public cs: CommonService,
    public router: Router,
    public as: AuthService,
    public http: HttpClient
  ) {
    this.httpClient = http;

    this.feedSubscription = cs.getFeedItems().subscribe((feed: Feed) => {
      this.data.push(feed);
      // console.log(feed.time);
    });
  }

  // loadChat() {
  //   this.cs.loadChat().subscribe((res: any) => {
  //     this.chat = res;
  //     console.log(this.chat);
  //   });
  // }

  ngOnInit() {
    this.message = new FormGroup({
      msg: new FormControl()
    });
    // this.router.navigate(['login']);
    // this.loadChat()
    this.allposts();

    this.loggedIn = this.as.isLoggedIn();

    this.cs.usereData().subscribe((res: any) => {
      this.userdata = res.data;
      this.name = res.data[0].firstname;
    });
  }
  allposts() {
    this.cs.posts().subscribe((res: any) => {
      this.posts = res.result;
    });
  }

  ngOnDestroy() {
    this.feedSubscription.unsubscribe();
  }

  // onSubmit() {
  //   this.cs.sendMessage(this.message.value).subscribe((res: any) => {
  //     console.log(res);
  //   });

  // const mymsg = this.message.value
  // console.log(mymsg.msg)
  // }

  logOut() {
    this.as.logout();
    // console.log("hit");
    location.reload();
    this.router.navigate(['']);
  }

  // cnageState(state: any) {
  //   this.toState = state;
  // }

  postSubmit() {
    // console.log(this.content);

    this.errorMsg = '';
    this.isSending = true;
    this.infoMsg = 'Processing your request.. Wait a minute';

    this.cs
      .postfeed({ body: this.content, name: this.name })
      .toPromise()
      .then((data: { message: string; status: boolean }) => {
        this.infoMsg = data.message;
        setTimeout(() => {
          this.infoMsg = '';
        }, 1000);

        this.isSending = false;
        this.content = '';
      })
      .catch(error => {
        this.infoMsg = '';
        this.errorMsg = error.error.message;
        this.isSending = false;
      });
    this.allposts();
  }
}
