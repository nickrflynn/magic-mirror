import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mirror-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  public time: string;
  public date: string;

  constructor() { }

  ngOnInit() {
    const now = new Date();
    this.time = now.toString();
    this.date = now.toDateString();
  }

}
