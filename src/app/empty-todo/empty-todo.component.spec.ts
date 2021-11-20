import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTodoComponent } from './empty-todo.component';

describe('EmptyTodoComponent', () => {
  let component: EmptyTodoComponent;
  let fixture: ComponentFixture<EmptyTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
