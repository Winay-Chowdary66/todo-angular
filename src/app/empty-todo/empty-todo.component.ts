import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-todo',
  templateUrl: './empty-todo.component.html',
  styleUrls: ['./empty-todo.component.css']
})
export class EmptyTodoComponent implements OnInit {

  @Input() public emptyText;
  constructor() { }

  ngOnInit(): void {
  }

}
