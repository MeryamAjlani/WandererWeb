import { Output, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CloudinaryImage } from '@cloudinary/base';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import { Center } from 'src/app/Models/CenterModel';
import { AuthentificationServiceService } from 'src/app/Services/authentification-service.service';
import { ProfileDetailsService } from 'src/app/Services/CampingCenter/profile-details.service';
import { ImageService } from 'src/app/Services/image.service';


@Component({
  selector: 'app-center-profile',
  templateUrl: './center-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./center-profile.component.css']
})
export class CenterProfileComponent implements OnInit {
  
  centerName?:string
  centerRating?:number
  centerCity?:string;
  cover?:string
  isLoading:Boolean;
  imageFile!: File;
  coverImage:string;

  url:string | ArrayBuffer | null | undefined;
  constructor(
     private modalService: NgbModal,
     private imageService:ImageService,
     config: NgbRatingConfig,
     private authService:AuthentificationServiceService, 
     private detailService:ProfileDetailsService) 
     {
    this.isLoading=true;
    this.url=""
    
    this.centerName=''
    this.centerCity=''
    this.centerRating=0
    config.max = 5;
    config.readonly = true;
    this.coverImage=this.imageService.getImageByUrl('not-found')

   }

  ngOnInit(): void {
    this.detailService.getDataListener().subscribe(data=>{
      if(data) this.setHeaderInfo()
    })
    this.detailService.getHeaderListener().subscribe((data)=>{
      this.centerName=data[0]
      this.centerCity=this.detailService.getCityName(+data[1])
    })
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
  logOut(){
    this.authService.logOut()
  }
  setHeaderInfo(){
    
    let centerCity=this.detailService.getCityName(+localStorage.getItem('city')!)
    let centerName=localStorage.getItem('name')!
    let rating=localStorage.getItem("rating")!
    let cover=localStorage.getItem("cover")!
  //  if( this.centerCity && this.centerCity && this.centerName && this.centerRating)
    {

      this.centerName=centerName
      this.cover=cover
      this.centerRating=+rating
      this.centerCity=centerCity
      this.isLoading=false
      this.coverImage=this.imageService.getImageByUrl(this.cover)
      console.log(this.coverImage)
    }
  }
  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true });
  }
  onFileSelected(event:any){
   
    if(event.target.files){
      this.imageFile=<File>event.target.files[0]
      var reader=new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload=(event)=>{
        this.url=event.target?.result
      }
    }
  }
  uploadImage(){
    const formData= new FormData()
    formData.append('image',this.imageFile,this.imageFile.name)
    this.imageService.uploadCoverImage(formData).subscribe(data=>{
      console.log('data')
    },
      err=>{
        console.log(err)
      })
  }
  
}
