import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CommonService } from "../common.service";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { AuthService } from "../auth/auth.service";
import { Router, CanActivate } from "@angular/router";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  animation
} from "@angular/animations";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
  // animations: [trigger("chnageState, [ ")]
})
export class LoginComponent implements OnInit {
  login: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // @Input() currentState;
  constructor(
    public router: Router,
    public cs: CommonService,
    public as: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.login = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    });

    const user = localStorage.getItem("currentUser");
    // console.log(user)

    if (user !== null) {
      this.router.navigate(["admin/dashboard"]);
    } else {
    }
  }

  onSubmit() {
    const data = this.login.value;
    // console.log(localStorage.getItem('currentUser'))

    if (data.email && data.password) {

      this.as.login(data).subscribe((res: any) => {
        console.log(res);
        if (res.status ===1) {
          localStorage.setItem("user", JSON.stringify(res.result.first_name));
          localStorage.setItem("token", res.result.token);
            localStorage.setItem("user_id", res.result.id);
          this.openSnackBar('Success', 3000);
          this.router.navigate(["admin/dashboard"]);

        } else {
          this.openSnackBar(res.status, 2000);
        }
      });
    } else {
      this.openSnackBar('All fields are required', 2000);

    }
  }

  openSnackBar(value: any, duration) {
    this.snackBar.open(value, 'Close', {
      duration: duration ? duration : 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
