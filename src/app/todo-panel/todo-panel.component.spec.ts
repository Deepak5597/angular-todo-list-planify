import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPanelComponent } from './todo-panel.component';

describe('TodoPanelComponent', () => {
  let component: TodoPanelComponent;
  let fixture: ComponentFixture<TodoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
