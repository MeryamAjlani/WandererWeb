import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http:HttpClient) { }

  getAllReservations(){
    return this.http.post('http://localhost:3000/center/getReservationsList',{})
  }
}
