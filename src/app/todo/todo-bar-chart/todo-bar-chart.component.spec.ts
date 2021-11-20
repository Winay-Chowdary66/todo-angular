import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoBarChartComponent } from './todo-bar-chart.component';

describe('TodoBarChartComponent', () => {
  let component: TodoBarChartComponent;
  let fixture: ComponentFixture<TodoBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
