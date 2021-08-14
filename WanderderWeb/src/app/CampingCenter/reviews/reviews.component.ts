import { Component, OnInit } from '@angular/core';
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
  reviews:CenterReview[]=[]
  constructor(config: NgbRatingConfig,private reviewService:CenterReviewsService) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;
    this.reviews=this.reviewService.getReviews()
  }

  ngOnInit(): void {
  }

}
