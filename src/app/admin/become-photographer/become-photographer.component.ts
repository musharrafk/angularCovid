import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormControlName } from "@angular/forms";
import { PhotographerService } from "./photographer.service";

@Component({
  selector: "app-become-photographer",
  templateUrl: "./become-photographer.component.html",
  styleUrls: ["./become-photographer.component.css"]
})
export class BecomePhotographerComponent implements OnInit {
  photographer: any;
  data: any;
  constructor(private ps: PhotographerService) {}

  ngOnInit() {
    const value = "empty";
    this.initPhotographerForm(value);

    this.ps
      .usereData()
      .toPromise()
      .then((res: any) => {
        // console.log(res);
        if (res.status == "success") {
          this.initPhotographerForm(res.data);
        } else {
          const value = "empty";
          this.initPhotographerForm(value);
        }
      });
  }

  initPhotographerForm(value) {
    // console.log(value);
    if (value !== "empty") {
      this.photographer = new FormGroup({
        first_name: new FormControl(value[0].firstName),
        last_name: new FormControl(value[0].lastName),
        username: new FormControl(value[0].username),
        email: new FormControl({ value: value[0].email, disabled: true }),
        mobile: new FormControl(value[0].mobile),
        role: new FormControl(value[0].role)
      });
    } else {
      this.photographer = new FormGroup({
        first_name: new FormControl(""),
        last_name: new FormControl(""),
        username: new FormControl(""),
        email: new FormControl(""),
        mobile: new FormControl(""),
        role: new FormControl("")
      });
    }
  }

  onSubmit() {
    const data = this.photographer.value;
    this.ps.profileData(data).subscribe((res: any) => {
      console.log(res);
    });
  }
}
