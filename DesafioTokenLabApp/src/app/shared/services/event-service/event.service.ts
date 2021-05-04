import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventModel } from '../../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiEndpoint = environment.apiEndpoint + '/event';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.apiEndpoint);
  }

  createNewEvent(event: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(this.apiEndpoint, event);
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(this.apiEndpoint + '/' + eventId);
  }

  editEvent(eventId: string, event: EventModel): Observable<EventModel> {
    return this.http.put<EventModel>(this.apiEndpoint + '/' + eventId, event);
  }
}
