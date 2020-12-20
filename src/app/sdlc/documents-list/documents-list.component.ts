import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { docService } from 'src/app/documents-service';
import { files } from 'src/app/files.model';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit , OnDestroy{
  documents: files[] = [];
  sub:Subscription;
  constructor(private documentService:docService) { }
  
  ngOnInit(): void {
    this.getDocuments();
    this.sub = this.documentService.documentsChanged.subscribe(
      documents => {
        this.documents = documents;
      }
    )
  }

  getDocuments(){
    this.documents = this.documentService.getDocuments();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
