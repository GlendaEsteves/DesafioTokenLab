import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  currentRoute = '/login';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((routerEvent: Event): routerEvent is RouterEvent => routerEvent instanceof RouterEvent && !!routerEvent.url)
      )
      .subscribe(activatedRoute => {
        this.currentRoute = activatedRoute.url;
      })

  }

  gotToNewEvent() {
    this.router.navigateByUrl('events/new');
  }

  goToEvents() {
    this.router.navigateByUrl('events');
  }
}
