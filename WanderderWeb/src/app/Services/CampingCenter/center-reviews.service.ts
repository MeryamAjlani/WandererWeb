import { Injectable } from '@angular/core';
import { CenterReview } from 'src/app/Models/Reviews';

@Injectable({
  providedIn: 'root'
})
export class CenterReviewsService {
reviews:CenterReview[]=[
  new CenterReview('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic sunt odit id error blanditiis odio labore alias, voluptate eligendi incidunt dignissimos. Ullam dolorem aliquam recusandae omnis tempore id inventore cumque! ','kkk',4,'21/21/2121','ffffffff'),
  new CenterReview('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic sunt odit id error blanditiis odio labore alias, voluptate eligendi incidunt dignissimos. Ullam dolorem aliquam recusandae omnis tempore id inventore cumque! ','kkk',4,'21/21/2121','ffffffff'),
  new CenterReview('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic sunt odit id error blanditiis odio labore alias, voluptate eligendi incidunt dignissimos. Ullam dolorem aliquam recusandae omnis tempore id inventore cumque! ','kkk',4,'21/21/2121','ffffffff'),
  new CenterReview('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic sunt odit id error blanditiis odio labore alias, voluptate eligendi incidunt dignissimos. Ullam dolorem aliquam recusandae omnis tempore id inventore cumque! ','kkk',4,'21/21/2121','ffffffff'),
  new CenterReview('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic sunt odit id error blanditiis odio labore alias, voluptate eligendi incidunt dignissimos. Ullam dolorem aliquam recusandae omnis tempore id inventore cumque! ','kkk',4,'21/21/2121','ffffffff'),
];
  constructor() { }
  public getReviews():CenterReview[]{
return this.reviews;
  }
}
