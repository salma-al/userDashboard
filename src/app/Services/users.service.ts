import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private api_URL = 'https://reqres.in/api';
  http = inject(HttpClient);
  constructor() {}

  getAllUsers(number: number) {
    return this.http.get(this.api_URL + '/users?page=' + number);
  }

  GetUserByID(id: number) {
    return this.http.get(this.api_URL + '/users/' + id);
  }
}
