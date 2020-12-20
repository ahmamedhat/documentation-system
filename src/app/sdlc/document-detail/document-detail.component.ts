import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { docService } from 'src/app/documents-service';
import { files } from 'src/app/files.model';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit , OnDestroy {

  @ViewChild('img' , {static:true}) image:ElementRef;
  switchTabs:boolean = false;
  file:files ;
  imageFile:File;
  documents:files[] = [];
  sub:Subscription;
  constructor(private documentService:docService , private route:Router) { }

  ngOnInit(): void {
    this.sub = this.documentService.documentsChanged.subscribe(
      documents => {
        this.documents = documents
      }
    )
  }

  onSwitchTabs(state:boolean){
    this.switchTabs = state;
  }
  onUpload(event){
    this.imageFile = event.target.files[0];
  }

  onSubmit(form:NgForm){
    const name = form.value.name;
    const req1 = form.value.req1;
    const req2 = form.value.req2;
    const req3 = form.value.req3;
    const req4 = form.value.req4;
    const file = this.imageFile;
    const document = new files(name , req1 , req2 , req3 , req4 , file);
    this.documentService.addDocument(document);
    
    form.reset();
    this.route.navigate(['/sdlc']);
  }


  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

