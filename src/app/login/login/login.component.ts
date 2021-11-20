import { Component, DoCheck, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck {
  loginOrReg = "Login"

  constructor(private route: Router, private title: Title) { }

  ngDoCheck(): void {
    this.title.setTitle("Login")
    if(localStorage.getItem('login')){
      this.route.navigate(['todo'])
    }
  }

  ngOnInit(){

  }

}
