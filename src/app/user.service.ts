import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from '../environments/environment.development'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlUser = environment.urlApi + '/user';

  constructor(private http: HttpClient) {}

  createUser(user : User):Observable<User>{

    return this.http.post<User>(this.urlUser, user, httpOptions);
  }

}
