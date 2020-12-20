import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { docService } from '../documents-service';

@Component({
  selector: 'app-sdlc',
  templateUrl: './sdlc.component.html',
  styleUrls: ['./sdlc.component.css']
})
export class SdlcComponent implements OnInit {
  state = false;
  prevState = false;
  sub:Subscription;
  constructor(private documentService:docService) { }

  ngOnInit(): void {

  }
}
