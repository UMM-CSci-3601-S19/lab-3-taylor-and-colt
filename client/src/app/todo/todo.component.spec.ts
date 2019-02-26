import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {User} from './todo';
import {todoComponent} from './todo.component';
import {TodoListService} from './todo-list.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('User component', () => {

  let TodoComponent: todoComponent;
  let fixture: ComponentFixture<todoComponent>;

  let todoListServiceStub: {
    getUserById: (userId: string) => Observable<User>
  };

  beforeEach(() => {
    // stub UserService for test purposes
    todoListServiceStub = {
      getUserById: (userId: string) => Observable.of([
        {
          id: 'chris_id',
          name: 'Chris',
          age: 25,
          company: 'UMM',
          email: 'chris@this.that'
        },
        {
          id: 'pat_id',
          name: 'Pat',
          age: 37,
          company: 'IBM',
          email: 'pat@something.com'
        },
        {
          id: 'jamie_id',
          name: 'Jamie',
          age: 37,
          company: 'Frogs, Inc.',
          email: 'jamie@frogs.com'
        }
      ].find(user => user.id === userId))
    };

    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(todoComponent);
      TodoComponent = fixture.componentInstance;
    });
  }));

  it('can retrieve Pat by ID', () => {
    TodoComponent.setId('pat_id');
    expect(TodoComponent.user).toBeDefined();
    expect(TodoComponent.user.name).toBe('Pat');
    expect(TodoComponent.user.email).toBe('pat@something.com');
  });

  it('returns undefined for Santa', () => {
    TodoComponent.setId('Santa');
    expect(TodoComponent.user).not.toBeDefined();
  });

});
