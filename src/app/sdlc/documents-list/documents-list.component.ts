import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { docService } from 'src/app/documents-service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit , OnDestroy{
  chosen:number;
  documents: any[] = [];
  sub:Subscription;
  sub2:Subscription;
  constructor(private documentService:docService) { }
  
  ngOnInit(): void {
    this.getDocuments();
    this.sub = this.documentService.allDocumentChanged.subscribe(
      documents => {
        this.documents = documents;
      }
    )
    this.sub2 = this.documentService.chosenFileChanged.subscribe(
      chosen => {
        this.chosen = chosen;
      }
    )

  }

  getDocuments(){
    this.documents = this.documentService.getAllDocument();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
