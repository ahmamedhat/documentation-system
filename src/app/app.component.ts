import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { docService } from './documents-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy{
  @ViewChild('image' , {static:true}) imageFile:ElementRef;
  file:File;
  sub:Subscription;
  state = false;
  constructor(private docService: docService){}
  
  /* onAddfile(event){
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {    
      this.imageFile.nativeElement.src = e.target.result;      
    };
    reader.readAsDataURL(this.file);
  } */

  ngOnInit(){

  }

  ngOnDestroy(){
  }


}
