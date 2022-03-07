import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Service } from 'src/app/services/http.service';
import { Users } from '../users/users';
import { Tracking } from './tracking';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit {
  users = new Array<Users>();
  trackings = new Array<Tracking>();
  user = '' as String;
  date = new FormControl();
  displayedColumns: string[] = ['latitude', 'longitude', 'created_at', 'map'];

  constructor(private service: Service) {}

  async ngOnInit(): Promise<void> {
    await this.getUsers();
  }

  openMap(latitude: string, longitude: string) {
    window.open('https://www.google.com.ar/maps/place/' + latitude + longitude, '_blank');
  }

  async getUsers(): Promise<Users[] | void> {
    (await this.service.apiRest('', 'user/get_users')).subscribe({
      next: ({ result }) => {
        return (this.users = result);
      },
      error: () => {
        return [];
      },
    });
  }

  selectUser(user: String): void {
    this.user = user; // User ID
    this.trackings = [];
    this._resetInput();
  }

  _resetInput() {
    this.date = new FormControl();
  }

  // On change date, get all sessions of this user on current date
  async changeDate(event: MatDatepickerInputEvent<Date>): Promise<void> {
    const date = event.value?.getTime(); // Epoch time
    (await this.service.apiRest(JSON.stringify({ date, user: this.user }), 'tracking/get')).subscribe(({ result }) => {
      this.trackings = result;
    });
  }

  // or const {Loader} = require('google-maps'); without typescript
}
