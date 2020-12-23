import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { docService } from 'src/app/documents-service';
import { files } from 'src/app/files.model';
import { initFiles } from 'src/app/initFiles.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('img' , {static:false}) imageFile;
  phase:boolean;
  sub:Subscription;
  id:number;
  document:files;
  initDocument:initFiles;
  initDocumentObject:initFiles ={
    documentName:'',
    date1:'',
    date2:'',
    req2:'',
    req3:'',
    req4:'',
    req5:''
  }

  documentName:string;
  req1:string;
  req2:string;
  req3:string;
  req4:string;
  file:File;
  file2:File;
  image:File;


  constructor(private router:ActivatedRoute , private documentService:docService , private route:Router) { }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        if(!this.documentService.documentCheck(this.id)){
          this.document = this.documentService.getFromAllDocuments(this.id);
          this.phase = true;
          this.formInit();
          this.imagInit(this.document.file);

        }
        else{
          this.initDocument = this.documentService.getFromAllDocuments(this.id);
          this.initPhaseForm();
        }
      }
    )

    
  }

  /* Start of Initialization Phase Code */

  initPhaseForm(){
    this.initDocumentObject = this.initDocument
  }

  onSubmitInit(form:NgForm){
    const name = form.value.initName;
    const date1 = form.value.date1;
    const date2 = form.value.date2;
    const req2 = form.value.initReq2;
    const req3 = form.value.initReq3;
    const req4 = form.value.initReq4;
    const req5 = form.value.initReq5;

    const document = new initFiles (name , date1 , date2 , req2 , req3 , req4 , req5);
    this.documentService.editDocuments(document , this.id);
    this.route.navigate(['../'] , {relativeTo:this.router});
  }
  /* Start of Initialization Phase Code */

  /* End of Requirements Phase Code */

  imagInit(file:File){
    this.file2 = file;
    const reader = new FileReader();
    reader.onload = (e) => {    
      this.imageFile.nativeElement.src = e.target.result;      
    };
    reader.readAsDataURL(this.file2);

  }

  formInit(){
    this.documentName = this.document.documentName;
    this.req1 = this.document.req1;
    this.req2 = this.document.req2;
    this.req3 = this.document.req3;
    this.req4 = this.document.req4;
  }
  onSubmit(form:NgForm){
    const name = form.value.name;
    const req1 = form.value.req1;
    const req2 = form.value.req2;
    const req3 = form.value.req3;
    const req4 = form.value.req4;
    const file = this.checkFile(this.image);
    const document = new files(name , file , req1 , req2 , req3 , req4);
    this.documentService.editDocuments(document , this.id);

    this.route.navigate(['../'] , {relativeTo:this.router});
  }
  onUpload(event){
    this.image = event.target.files[0];
    this.imagInit(this.image);
  }

  onCancel(){
    this.route.navigate(['../'] , {relativeTo:this.router});
  }

  checkFile(file:File){
    if (file){
      return file;
    }
    else{
      return this.document.file;
    }
  }

  /* End of Requirements Phase Code */

}
