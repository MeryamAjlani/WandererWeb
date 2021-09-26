import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/Services/CampingCenter/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  index?:number;
  constructor(private reservationService:ReservationService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => { 
      this.index = +params.get('index');
      console.log(this.index) 
  });
    switch(this.index){
      case 0:{
        this.reservationService.getAllReservations().subscribe(data=>{
          console.log(data)
        })
      }
    }
  }

}
