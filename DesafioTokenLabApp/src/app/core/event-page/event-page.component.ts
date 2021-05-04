import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/shared/services/event-service/event.service';
import { EventModel } from '../../shared/models/event'

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

  eventList: EventModel[] = [];

  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => this.eventList = events);
  }

  deleteEvent(index: number) {
    this.eventService.deleteEvent(this.eventList[index]._id).subscribe(() => {
      this.eventList.splice(index, 1);
    });
  }

  editEvent(index: number) {
    this.router.navigate([`events/edit/${this.eventList[index]._id}`]);
  }
}
