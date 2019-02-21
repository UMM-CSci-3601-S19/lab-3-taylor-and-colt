import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {User} from './todo';

@Component({
  selector: 'app-user-component',
  styleUrls: ['./todo.component.css'],
  templateUrl: 'todo.component.html'
})
export class todoComponent implements OnInit {
  public user: User = null;
  private id: string;

  constructor(private todoListService: TodoListService) {
    // this.users = this.userListService.getUsers();
  }

  private subscribeToServiceForId() {
    if (this.id) {
      this.todoListService.getUserById(this.id).subscribe(
        user => this.user = user,
        err => {
          console.log(err);
        }
      );
    }
  }

  setId(id: string) {
    this.id = id;
    this.subscribeToServiceForId();
  }

  ngOnInit(): void {
    this.subscribeToServiceForId();
  }
}
