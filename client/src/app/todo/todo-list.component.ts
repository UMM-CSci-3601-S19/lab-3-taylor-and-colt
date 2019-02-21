import {Component, OnInit} from '@angular/core';

import {TodoListService} from './todo-list.service';
import {User} from './todo';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: []
})

export class todoListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public users: User[];
  public filteredUsers: User[];

  public userName: string;
  public userAge: number;


  // Inject the UserListService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private todoListService: TodoListService) {

  }

  public filterUsers(searchName: string, searchAge: number): User[] {

    this.filteredUsers = this.users;

    // Filter by name
    if (searchName != null) {
      searchName = searchName.toLocaleLowerCase();

      this.filteredUsers = this.filteredUsers.filter(user => {
        return !searchName || user.name.toLowerCase().indexOf(searchName) !== -1;
      });
    }

    // Filter by age
    if (searchAge != null) {
      this.filteredUsers = this.filteredUsers.filter((user: User) => {
        return !searchAge || (user.age === Number(searchAge));
      });
    }

    return this.filteredUsers;
  }

  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  refreshUsers(): Observable<User[]> {
    // Get Users returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)

    const users: Observable<User[]> = this.todoListService.getUsers();
    users.subscribe(
      returnedUsers => {
        this.users = returnedUsers;
        this.filterUsers(this.userName, this.userAge);
      },
      err => {
        console.log(err);
      });
    return users;
  }



  ngOnInit(): void {
    this.refreshUsers();
  }


}
