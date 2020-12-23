import { Component, OnInit } from '@angular/core';
import { docService } from '../documents-service';

@Component({
  selector: 'app-sdlc',
  templateUrl: './sdlc.component.html',
  styleUrls: ['./sdlc.component.css']
})
export class SdlcComponent implements OnInit {

  constructor(private documentService:docService) { }

  ngOnInit(): void {

  }
}
