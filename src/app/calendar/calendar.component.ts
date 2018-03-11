import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mirror-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private key: string;
  private id: string;

  public todaysEvents: Array<IEvent> = [];
  public weeksEvents: Array<IEvent> = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('./../assets/mirror-config.json').subscribe((data) => {
      this.key = data['googleApiKey'];
      this.id = data['googleCalendarId'];
      this.setDaysCalendarEvents();
      this.setWeeksCalendarEvents();
    });
  }

  private setDaysCalendarEvents(): void {
    const response = this.http
      .get(`https://www.googleapis.com/calendar/v3/calendars/${this.id}/events/?${this.getQueryParameters(1)}&key=${this.key}`);
    response.subscribe((calendar: ICalendarInfo) => {
      this.todaysEvents = calendar.items;
    });
  }

  private setWeeksCalendarEvents(): void {
    const response = this.http
      .get(`https://www.googleapis.com/calendar/v3/calendars/${this.id}/events/?${this.getQueryParameters(8, 1)}&key=${this.key}`);
    response.subscribe((calendar: ICalendarInfo) => {
      this.weeksEvents = calendar.items;
    });
  }

  private getQueryParameters(days: number, skip: number = 0): string {
    const parameters: Array<string> = [];

    parameters.push('singleEvents=True');
    parameters.push('orderBy=startTime');

    const maxDate = new Date();
    maxDate.setTime(maxDate.getTime() + (1000 * 3600 * 24 * days));
    parameters.push(`timeMax=${maxDate.toISOString()}`);

    const today: Date = new Date();
    today.setTime(today.getTime() + (1000 * 3600 * 24 * skip));
    parameters.push(`timeMin=${today.toISOString()}`);

    let query = '';
    for (let i = 0; i < parameters.length; i++) {
      if (i > 0) {
        query += '&';
      }

      query += parameters[i];
    }

    return query;
  }

  private formatStartTime(start: IStartTime): string {
    if (start.date) {
      return new Date(start.date).toISOString();
    }

    const date = new Date(start.dateTime);
    return `${date.toDateString()} ${date.toTimeString()}`;
  }
}

class ICalendarInfo {
  accessRole: string;
  defaultReminders: Array<any>;
  description: string;
  etag: string;
  items: Array<IEvent>;
  kind: string;
  nextSyncToken: string;
  summary: string;
  timeZone: string;
  updated: string;
}

class IEvent {
  created: string;
  creator: any; // {email: "nickrflynn@gmail.com", displayName: "Nick Flynn"}
  end: any;
  etag: string;
  htmlLink: string;
  iCalUID: string;
  id: string;
  kind: string;
  organizer: any; // {email: "flse212r4o10j3fkg34fqtj3gk@group.calendar.google.com", displayName: "The Flynns", self: true}
  sequence: number;
  start: IStartTime;
  status: string;
  summary: string;
  transparency: string;
  updated: string;
}

class IStartTime {
  date: string;
  dateTime: string;
}
