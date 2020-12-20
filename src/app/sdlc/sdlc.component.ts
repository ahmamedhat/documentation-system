import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { docService } from '../documents-service';

@Component({
  selector: 'app-sdlc',
  templateUrl: './sdlc.component.html',
  styleUrls: ['./sdlc.component.css']
})
export class SdlcComponent implements OnInit , OnDestroy {
  state = false;
  prevState = false;
  sub:Subscription;
  constructor(private documentService:docService) { }

  ngOnInit(): void {
    this.sub = this.documentService.creatState.subscribe(
      state =>{
        this.state = state;
      }
    )
/*     this.documentService.prevState.subscribe(
      document =>{
        if (document){
          this.prevState = true;
        }
      }
    ) */ 
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
