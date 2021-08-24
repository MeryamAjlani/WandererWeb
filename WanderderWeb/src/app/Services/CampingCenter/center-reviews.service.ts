import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CenterReview } from 'src/app/Models/Reviews';

@Injectable({
  providedIn: 'root'
})
export class CenterReviewsService {
reviews:CenterReview[]=[]
  
  constructor(private http:HttpClient) {
  
  }
  public getReviews(){
   return this.http.post('http://localhost:3000/center/ratings',{
     center:localStorage._id
   })
  }

}
