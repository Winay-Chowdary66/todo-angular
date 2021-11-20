import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TodoInputService } from 'src/app/services/todo-input.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent implements DoCheck, OnInit, OnChanges {
  editInput: boolean = false;
  todoInputChild: string = '';
  @Input() public todo;
  @Input() public index;

  @Output()
  public finishEvent = new EventEmitter();
  @Output()
  public editEvent = new EventEmitter();
  @Output()
  public deleteEvent = new EventEmitter();
  @Output()
  public progressEvent = new EventEmitter();

  constructor(
    private todoInputServ: TodoInputService,
    private ref: ChangeDetectorRef
  ) {}

  ngDoCheck(): void {
    // this.ref.detach();
    // this.ref.reattach();
  }

  ngOnInit() {
    // console.log(JSON.stringify(this.todo));
    this.todoInputChild = this.todo.todoContent;
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    // this.ref.markForCheck()
    // this.ref.detectChanges()
  }

  finishTodo(id) {
    this.finishEvent.emit(id);
  }
  editTodo(id) {
    this.todoInputServ.sendMessage(this.todoInputChild);
    this.editEvent.emit(id);
    this.editInput = !this.editInput;
  }
  deleteTodo(id) {
    this.deleteEvent.emit(id);
  }

  makeInProgress(id) {
    this.progressEvent.emit(id);
  }
}
