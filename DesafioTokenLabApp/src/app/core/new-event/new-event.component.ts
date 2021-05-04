import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EventService } from 'src/app/shared/services/event-service/event.service';
import { EventModel } from '../../shared/models/event'

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  newEventForm: FormGroup;
  isEdit = false;
  eventId: any;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.newEventForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.eventService.getEvents().subscribe(event => {
        const eventToEdit = event.find(eventToFind => eventToFind._id === this.eventId)
        if (eventToEdit) {
          const date = new Date(eventToEdit.date);
          const year = date.getFullYear();
          const month = date.getMonth().toString().length === 1 ? `0${(date.getMonth() + 1).toString()}` : date.getMonth() + 1
          const day = date.getDate().toString().length === 1 ? `0${(date.getDate() + 1).toString()}` : date.getDate() + 1;
          this.newEventForm.setValue({
            id: eventToEdit._id,
            name: eventToEdit.name,
            description: eventToEdit.description,
            start: eventToEdit.start,
            end: eventToEdit.end,
            date: `${year}-${month}-${day}`,
          });
          this.isEdit = true;
        } else {
          alert('Evento não encontrado');
        }
      })
    }
  }

  createNewEvent() {
    if (this.newEventForm.valid) {
      this.eventService.createNewEvent(this.newEventForm.value).subscribe(() => {
        this.router.navigateByUrl('events');
      });
    }
  }

  editEvent() {
    this.eventService.editEvent(this.eventId, this.newEventForm.value).subscribe(() => {
      this.router.navigateByUrl('events');
    });
  }

}
