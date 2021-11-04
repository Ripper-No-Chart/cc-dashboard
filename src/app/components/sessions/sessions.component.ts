import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Service } from 'src/app/services/http.service';
import { Users } from '../users/users';
import { Sessions } from './sessions';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
})
export class SessionsComponent implements OnInit {
  users = new Array<Users>();
  user = '' as String;
  sessions = new Array<Sessions>();
  displayedColumns: string[] = ['action', 'created_at'];
  // date = new FormControl(new Date()); // Show current date on input date picker
  date = new FormControl();
  events: string[] = [];

  constructor(private service: Service) {}

  async ngOnInit(): Promise<void> {
    await this.getUsers();
  }

  async getUsers(): Promise<void> {
    (await this.service.apiRest('', 'users/get_users')).subscribe(({ result }) => {
      return (this.users = result);
    });
  }

  selectUser(user: String): void {
    this.user = user; // User ID
    this.sessions = [];
    this._resetInput();
  }

  _resetInput() {
    this.date = new FormControl();
  }

  // On change date, get all sessions of this user on current date
  async changeDate(event: MatDatepickerInputEvent<Date>): Promise<void> {
    const date = event.value?.getTime(); // Epoch time
    (await this.service.apiRest(JSON.stringify({ date, user: this.user }), 'sessions/get')).subscribe(
      ({ sessions }) => {
        this.sessions = sessions;
      }
    );
  }
}
