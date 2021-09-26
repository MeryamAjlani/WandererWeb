import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(public activatedRoute:ActivatedRoute,public router:Router) { }

  ngOnInit(): void {
    console.log(this.router.url)
  }

}
