import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-bar-chart',
  templateUrl: './todo-bar-chart.component.html',
  styleUrls: ['./todo-bar-chart.component.css'],
})
export class TodoBarChartComponent implements OnInit {
  @Input()
  openCount: number;
  @Input()
  finishedCount: number;
  @Input()
  inProgressCount: number;
  constructor() {}

  ngOnInit(): void {}
}
