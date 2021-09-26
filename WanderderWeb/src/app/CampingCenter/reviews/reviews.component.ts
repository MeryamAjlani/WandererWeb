import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CenterReview } from 'src/app/Models/Reviews';
import { CenterReviewsService } from 'src/app/Services/CampingCenter/center-reviews.service';
import { ImageService } from 'src/app/Services/image.service';

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
  isEmpty:boolean;
  isLoading:boolean;
  reviews:CenterReview[]=[]
  constructor(config: NgbRatingConfig,private reviewService:CenterReviewsService, private router:Router,private imageService:ImageService) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    this.isLoading=true
    config.readonly = true;
    this.reviews=[]
    this.isEmpty=false
  }

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe(data=>{
      if(data)
     {data.forEach(el=>{
       console.log(el)
       this.reviews.push(new CenterReview(el.content,el.userId.name,el.rating,el.date,this.imageService.getImageByUrl(el.userId.img)))
     })
       
       this.isLoading=false
       if(Object.keys(data).length === 0)
      { this.isEmpty=true
       
}
     }
    },error=>{
      switch (error.status){
        case 401 : this.router.navigate(['/'])
      }
    })
  }

}
