import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSvgComponent } from './todo-svg.component';

describe('TodoSvgComponent', () => {
  let component: TodoSvgComponent;
  let fixture: ComponentFixture<TodoSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
