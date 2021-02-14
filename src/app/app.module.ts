import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgDragDropModule } from 'ng-drag-drop';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { TaskDataService } from './task/task.service';
import { TodoPanelComponent } from './todo-panel/todo-panel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TodoPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    NgDragDropModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TaskDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
