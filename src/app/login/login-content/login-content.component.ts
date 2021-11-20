import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.css'],
})
export class LoginContentComponent implements OnInit, DoCheck {
  tempLoginDetails = [{ userName: 'Winay' }, { password: 'Winay@Nov05' }];

  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^[a-zA-Z-0-9]+$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
      ),
    ]),
  });

  loginFailure: boolean = false;
  showPswd = false;

  // returns form control
  getFormControl(controlName) {
    return this.loginForm.get(controlName);
  }

  constructor(private route: Router) {}

  ngDoCheck() {
    if (this.loginForm.valid) {
      $('.loginBtn').addClass('enabled');
    } else {
      $('.loginBtn').removeClass('enabled');
    }
  }

  ngOnInit(): void {}

  goToRegister() {
    this.route.navigate(['/register']);
  }

  showPassword() {
    this.showPswd = !this.showPswd;
  }

  loginUser() {
    var userName = this.getFormControl('userName').value;
    var password = this.getFormControl('password').value;
    if (userName && password) {
      if (
        userName === this.tempLoginDetails[0].userName &&
        password == this.tempLoginDetails[1].password
      ) {
        this.loginFailure = this.loginFailure;
        localStorage.setItem('login', JSON.stringify(this.tempLoginDetails));
        this.route.navigate(['todo']);
      } else {
        this.loginFailure = !this.loginFailure;
        this.loginForm.reset();
      }
    }
  }
}
