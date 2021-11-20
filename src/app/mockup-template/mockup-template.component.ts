import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mockup-template',
  templateUrl: './mockup-template.component.html',
  styleUrls: ['./mockup-template.component.css']
})
export class MockupTemplateComponent implements OnInit {

  @Input() public loginOrReg:string;

  isLoginOrReg: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isLoginOrReg = this.loginOrReg == "Login" ? true: false;
  }

}
