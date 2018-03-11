import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mirror-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit, OnDestroy {

  private timer: Observable<number>;
  private subscription: Subscription;
  public time: string;
  public date: string;

  constructor() { }

  ngOnInit() {
    this.timer = TimerObservable.create(0, 60000);
    this.subscription = this.timer
      .subscribe(() => {
        this.updateTimeAndDate();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateTimeAndDate() {
    const now = new Date();
    this.time = now.toString();
    this.date = now.toDateString();
  }

}
