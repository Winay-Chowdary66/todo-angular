import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  DefaultValueAccessor,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from './validators/pswd-match.validator';
import * as $ from 'jquery';
import { FormListService } from 'src/app/services/form-list.service';
import { Field, FieldList } from 'src/app/models/FieldList';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { RegDetails, RegForm } from 'src/app/models/reg-details';
import { registerUser } from 'src/app/store/reg.action';

@Component({
  selector: 'app-register-content',
  templateUrl: './register-content.component.html',
  styleUrls: ['./register-content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterContentComponent
  implements OnInit, DoCheck, OnDestroy, AfterViewInit
{
  //creating form group
  regForm = new FormGroup(
    {
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z-0-9]+$'),
      ]),
      emailId: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]),
      dateOfBirth: new FormControl('', Validators.required),
      /*TODO Gender */
      gender: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      age: new FormControl({ disabled: true }, [Validators.min(18)]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      termsAndCond: new FormControl(false, Validators.required),
    },
    { validators: passwordMatchValidator }
  );

  // returns form control
  getFormControl(controlName) {
    return this.regForm.get(controlName);
  }

  hasPatternError(regex: RegExp) {
    const userPswd = this.getFormControl('password').value;
    var regExp = new RegExp(regex);
    var hasNum = regExp.test(userPswd);
    return hasNum;
  }

  get hasNum() {
    return this.hasPatternError(new RegExp(/\d/));
  }

  get hasUpperAlpha() {
    return this.hasPatternError(new RegExp(/[A-Z]/));
  }

  get hasLowerAlpha() {
    return this.hasPatternError(new RegExp(/[a-z]/));
  }

  get hasSpecialChar() {
    return this.hasPatternError(new RegExp(/[^A-Za-z0-9]/));
  }

  showPswd: boolean = false;
  showReptPswd: boolean = false;

  currDate = new Date();
  minDate = new Date(1950, 0, 2);
  userAge: number;
  regDetails: Field[] = [];
  subscription: Subscription;
  regDet: RegForm;
  tempMinDate
  maxDate

  @ViewChildren('itemForm') firstNameDom: FormGroupDirective;
  arr: FormControlName[] = [];

  @ViewChildren('itemControl')
  item : QueryList<ElementRef> = new QueryList<ElementRef>();
  constructor(
    private route: Router,
    private ref: ChangeDetectorRef,
    private formListService: FormListService,
    private store: Store<{ regDetails: RegDetails }>
  ) {}

  ngDoCheck() {
    this.ref.markForCheck();
    const userDOB = this.getFormControl('dateOfBirth').value;
    // To get and set user's Age from DOB
    this.userAge;
    if (userDOB != '') {
      let userYear = userDOB.substring(0, 4);
      var currYear = new Date().getFullYear();
      this.userAge = currYear - userYear;
      this.getFormControl('age').setValue(this.userAge);
    }

    // if (this.regForm.valid && this.getFormControl('termsAndCond').value) {
    //   $('.regBtn').addClass('enabled');
    // } else {
    //   $('.regBtn').removeClass('enabled');
    // }
    this.tempMinDate = this.minDate.toISOString().slice(0, 10)
    this.maxDate = this.currDate.toISOString().slice(0, 10)
    // $('input[type="date"]').attr(
    //   'min',
    //   this.minDate.toISOString().slice(0, 10)
    // );
    // $('input[type="date"]').attr(
    //   'max',
    //   this.currDate.toISOString().slice(0, 10)
    // );

    $('#male').val('Male');
    $('#female').val('Female');
  }

  ngOnInit(): void {
    // this.ref.detach();
    // this.timeOut();
    this.subscription = this.formListService.getFieldList().subscribe(
      (data: FieldList) => {
        this.regDetails = data.regDetails;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngAfterViewInit() {
    // this.firstNameDom.directives.forEach((i)=> console.log(i));
    // this.arr = this.firstNameDom.directives;
    // console.log(this.item);
    // console.log(this.firstNameDom);
    // var first: HTMLDataElement = new HTMLDataElement();
    // first = this.item.first.nativeElement
    // console.log(first);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // console.log("On destory called");
  }

  // Navigate to Login page
  goToLogin() {
    this.route.navigate(['login']);
  }

  // Submit the form
  submitForm() {
    if (this.regForm.valid) {
      this.regDet = this.regForm.value;
      console.log(this.regDet);
      this.store.dispatch(registerUser({ regDetails: this.regDet }));
      this.route.navigate(['view-details']);
    }
  }

  //To show Password
  showPassword() {
    this.showPswd = !this.showPswd;
  }

  showReptPassword() {
    this.showReptPswd = !this.showReptPswd;
  }
}
