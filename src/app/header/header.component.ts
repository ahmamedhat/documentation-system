import { Component, OnInit } from '@angular/core';
import { docService } from '../documents-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private docService:docService) { }

  ngOnInit(): void {
  }


}
