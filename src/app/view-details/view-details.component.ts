import { Component, OnInit } from '@angular/core';
import { RegDetails, RegForm } from '../models/reg-details';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css'],
})
export class ViewDetailsComponent implements OnInit {
  registrationDetails: RegForm;

  constructor(
    private store: Store<{ regDetails: RegDetails }>,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('View Details');
    this.store.select('regDetails').subscribe((data: RegDetails) => {
      this.registrationDetails = data.regDetails;
    });
    if (this.registrationDetails.age == undefined) {
      this.router.navigate(['register']);
    }
  }
}
