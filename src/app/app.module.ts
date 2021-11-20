import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterComponents } from './app-routing.module';
import { EmptyTodoComponent } from './empty-todo/empty-todo.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
import { TodoSvgComponent } from './todo/todo-svg/todo-svg.component';
import { LoginContentComponent } from './login/login-content/login-content.component';
import { RegisterContentComponent } from './register/register-content/register-content.component';
import { MockupTemplateComponent } from './mockup-template/mockup-template.component';
import { TodoInputService } from './services/todo-input.service';
import { FormListService } from './services/form-list.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { RegForm } from './models/reg-details';
import { regReducer } from './store/reg.reducer';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { TodoBarChartComponent } from './todo/todo-bar-chart/todo-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    RouterComponents,
    EmptyTodoComponent,
    TodoItemComponent,
    TodoSvgComponent,
    MockupTemplateComponent,
    LoginContentComponent,
    RegisterContentComponent,
    ViewDetailsComponent,
    TodoBarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({regDetails: regReducer}),
  ],
  providers: [TodoInputService, FormListService],
  bootstrap: [AppComponent],
})
export class AppModule {}
