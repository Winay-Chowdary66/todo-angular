import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Todo } from 'src/app/models/Todo';
import { TodoInputService } from 'src/app/services/todo-input.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit, DoCheck, AfterViewInit {
  @ViewChild('todoInputDom')
  private todoInputDom: ElementRef;

  @ViewChildren('imgDom')
  private imgDom: QueryList<ElementRef>;

  @ViewChildren('bars')
  private bars

  todoList: Todo[] = [];

  inputTodo: string = '';
  emptyTodo = 'Hurrah! your Todos are empty';
  logoutUser = () => {};
  todoInput: string = '';
  openCount: number;
  finishedCount: number;
  inProgressCount: number;

  constructor(
    private route: Router,
    private title: Title,
    private todoInputServ: TodoInputService
  ) {
    this.todoList =
      JSON.parse(localStorage.getItem('todos')) != null
        ? JSON.parse(localStorage.getItem('todos'))
        : [];
  }
  ngDoCheck() {
    this.openCount = 0;
    this.finishedCount = 0;
    this.inProgressCount = 0;
    this.todoList.map((v, i) => {
      if (v.finished) {
        this.finishedCount += 1;
      } else if (v.inProgress) {
        this.inProgressCount += 1;
      } else {
        this.openCount += 1;
      }
    });

    this.todoInputServ.getMessage().subscribe((data) => {
      this.todoInput = data;
    });
    //No cache then redirect to login
    if (!localStorage.getItem('login')) {
      this.route.navigate(['login']);
    }
    // Logging out User
    this.logoutUser = () => {
      localStorage.removeItem('login');
    };
    this.todoList.map((v, i) => {
      if (v.finished) {
        v.inProgress = false;
      }
    });
    this.insertInLocSto();
    // console.log(this.todoInputDom, this.imgDom);
  }
  ngOnInit() {
    this.title.setTitle('My Todo');
    // $(document).ready(() => {
    //   $('#add').hover(
    //     function () {
    //       $(this).attr('src', 'assets/images/add.gif');
    //     },
    //     function () {
    //       $(this).attr('src', 'assets/images/add.png');
    //     }
    //   );
    //   $('#todo-text').focus();
    // });
  }

  ngAfterViewInit() {
    this.todoInputDom.nativeElement.focus();
    // console.log(this.openCount, this.finishedCount, this.inProgressCount);
    // console.log(this.bars);

    // this.imgDom.forEach((i)=>{
    //   i.nativeElement.hover();
    // })
  }
  /* Adding Todo to todoList */
  addTodo(event) {
    event.preventDefault();
    if (
      !this.todoList.some((todo) => todo.todoContent === this.inputTodo) &&
      this.inputTodo != ''
    ) {
      this.todoList.unshift({
        todoContent: this.inputTodo,
        finished: $('#todos').hasClass('finished'),
        inProgress: $('#todos').hasClass('inprogress'),
      });
    }
    this.inputTodo = '';
    this.insertInLocSto();
    // console.log(this.todoList);
  }

  finishTodo(id) {
    this.todoList.map((value, index) => {
      if (id == index) {
        value.finished = !value.finished;
      }
      return value;
    });
    this.insertInLocSto();
  }

  // To edit Todo
  editTodo(id) {
    // console.log(this.todoInput);
    if (
      this.todoInput != null &&
      this.todoInput != ' ' &&
      this.todoInput != ''
    ) {
      this.todoList.find((data) => {
        if (data.todoContent === this.todoList[id].todoContent) {
          this.todoList[id].todoContent = this.todoInput;
        }
      });
    }
    this.insertInLocSto();
  }

  /* To delete todo */
  deleteTodo(id) {
    this.todoList = this.todoList.filter((value, index) => {
      return index != id;
    });
    this.insertInLocSto();
  }

  makeInProgress(id) {
    this.todoList.map((value, index) => {
      if (id == index) {
        value.inProgress = !value.inProgress;
      }
      return value;
    });
    this.insertInLocSto();
  }

  /* Inserting todos into Local */
  insertInLocSto() {
    localStorage.setItem('todos', JSON.stringify(this.todoList));
  }
}
