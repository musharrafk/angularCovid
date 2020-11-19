import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PhotographerService {
  apiUrl = "http://localhost:3000/";

  constructor(public http: HttpClient) {}
  profileData(data: any) {
    return this.http.post<any>(`${this.apiUrl}profileupdate`, data);
  }

  usereData() {
    return this.http.get<any>(`${this.apiUrl}userdata`);
  }
}
