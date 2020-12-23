import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { docService } from 'src/app/documents-service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit , OnDestroy{
  documents: any[] = [];
  sub:Subscription;
  constructor(private documentService:docService) { }
  
  ngOnInit(): void {
    this.getDocuments();
    this.sub = this.documentService.allDocumentsChanged.subscribe(
      documents => {
        this.documents = documents;
      }
    )
  }

  getDocuments(){
    this.documents = this.documentService.getAllDocuments();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
