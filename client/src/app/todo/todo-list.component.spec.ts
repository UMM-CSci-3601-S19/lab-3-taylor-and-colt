import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import {CustomModule} from '../custom.module';

import {User} from './todo';
import {todoListComponent} from './todo-list.component';
import {TodoListService} from './todo-list.service';

describe('User list', () => {

  let userList: todoListComponent;
  let fixture: ComponentFixture<todoListComponent>;

  let userListServiceStub: {
    getUsers: () => Observable<User[]>
  };

  beforeEach(() => {
    // stub UserService for test purposes
    userListServiceStub = {
      getUsers: () => Observable.of([
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
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [TodoListService],
      // providers:    [ UserListService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: TodoListService, useValue: userListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]

    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(todoListComponent);
      userList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the users', () => {
    expect(userList.users.length).toBe(3);
  });

  it('contains a user named \'Chris\'', () => {
    expect(userList.users.some((user: User) => user.name === 'Chris')).toBe(true);
  });

  it('contain a user named \'Jamie\'', () => {
    expect(userList.users.some((user: User) => user.name === 'Jamie')).toBe(true);
  });

  it('doesn\'t contain a user named \'Santa\'', () => {
    expect(userList.users.some((user: User) => user.name === 'Santa')).toBe(false);
  });

  it('has two users that are 37 years old', () => {
    expect(userList.users.filter((user: User) => user.age === 37).length).toBe(2);
  });
  it('user list filters by name', () => {
    expect(userList.filteredUsers.length).toBe(3);
    userList.userName = 'a';
    const a: Observable<User[]> = userList.refreshUsers();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(userList.filteredUsers.length).toBe(2));
  });

  it('user list filters by age', () => {
    expect(userList.filteredUsers.length).toBe(3);
    userList.userAge = 37;
    const a: Observable<User[]> = userList.refreshUsers();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(userList.filteredUsers.length).toBe(2));
  });

  it('user list filters by name and age', () => {
    expect(userList.filteredUsers.length).toBe(3);
    userList.userAge = 37;
    userList.userName = 'i';
    const a: Observable<User[]> = userList.refreshUsers();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(userList.filteredUsers.length).toBe(1));
  });

});

describe('Misbehaving User List', () => {
  let userList: todoListComponent;
  let fixture: ComponentFixture<todoListComponent>;

  let userListServiceStub: {
    getUsers: () => Observable<User[]>
  };

  beforeEach(() => {
    // stub UserService for test purposes
    userListServiceStub = {
      getUsers: () => Observable.create(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CustomModule],
      declarations: [todoListComponent],
      providers: [{provide: TodoListService, useValue: userListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(todoListComponent);
      userList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a UserListService', () => {
    // Since the observer throws an error, we don't expect users to be defined.
    expect(userList.users).toBeUndefined();
  });
});
