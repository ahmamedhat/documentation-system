import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { docService } from 'src/app/documents-service';
import { dpFiles } from 'src/app/dpFiles.model';
import { files } from 'src/app/files.model';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit , OnDestroy {

  switchTabs:boolean = false;
  file:files ;
  imageFile:File;
  documents:files[] = [];
  dPimageFile:File;
  dPdocuments:dpFiles[] = [];
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
    const document = new files(name , file , req1 , req2 , req3 , req4 );
    this.documentService.addDocument(document);
    
    form.reset();
    this.route.navigate(['/sdlc']);
  }


  /* Design Phase Component Typescript Code From Here */

  addDocument(){
    
  }
  onDpSubmit(form){
    console.log(form);

  }
  onUploadDp(event){
    this.dPimageFile = event.target.files[0];
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

