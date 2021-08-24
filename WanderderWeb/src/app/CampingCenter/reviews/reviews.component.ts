import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CenterReview } from 'src/app/Models/Reviews';
import { CenterReviewsService } from 'src/app/Services/CampingCenter/center-reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  providers: [NgbRatingConfig] 
})
export class ReviewsComponent implements OnInit {
  selected = 8;
  hovered = 0;
  readonly =true;
  isLoading:boolean;
  reviews:CenterReview[]=[]
  constructor(config: NgbRatingConfig,private reviewService:CenterReviewsService, private router:Router) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    this.isLoading=true
    config.readonly = true;
    this.reviews=[]
  }

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe(data=>{
      if(data)
      console.log(data)
    },error=>{
      switch (error.status){
        case 401 : this.router.navigate(['/'])
      }
    })
  }

}
