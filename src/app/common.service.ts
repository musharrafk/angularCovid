import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Feed } from "./feed";
import Pusher from "pusher-js";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  private subject: Subject<Feed> = new Subject<Feed>();

  private pusherClient: Pusher;

  apiUrl = 'http://localhost/space/';

  constructor(public http: HttpClient) {
    this.pusherClient = new Pusher("019028e2fef4b0c89303", {
      cluster: "ap2"
    });

    const channel = this.pusherClient.subscribe("realtime-feeds");

    channel.bind(
      "posts",
      (data: { title: string; body: string; time: string }) => {
        this.subject.next(data);
      }
    );
  }

  ///////////////F E E D ///////

  postfeed(value: any) {
    return this.http.post<any>(`${this.apiUrl}postFeed`, value);
  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }
  ///////////////F E E D ///////

  sendMessage(msg: any) {
    return this.http.post<any>(`${this.apiUrl}sendMessge`, msg);
  }

  loadChat() {
    return this.http.get<any>(`${this.apiUrl}loadchat`);
  }

  posts() {
    return this.http.get<any>(`${this.apiUrl}post`);
  }

  login(value: any) {
    return this.http.post<any>(`${this.apiUrl}login/index`, value);
  }

  usereData() {
    return this.http.get<any>(`${this.apiUrl}itemDetails`);
  }
}
