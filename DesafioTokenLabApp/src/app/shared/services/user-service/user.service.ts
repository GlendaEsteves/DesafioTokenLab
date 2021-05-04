import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userEndpoint = environment.apiEndpoint + '/user';
  userIsLogged = false;

  constructor(private http: HttpClient) { }

  login(user: UserModel): Observable<any> {
    return this.http.post(this.userEndpoint + '/login', user);
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.userEndpoint + '/create', user);
  }
}
