import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { docService } from 'src/app/documents-service';
import { files } from 'src/app/files.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  sub:Subscription;
  id:number;
  document:files;
  documentName:string;
  req1:string;
  req2:string;
  req3:string;
  req4:string;
  file:File;

  constructor(private router:ActivatedRoute , private documentService:docService , private route:Router) { }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.document = this.documentService.getDocument(this.id);
        this.formInit();
      }
    )
    
  }

  formInit(){
    this.documentName = this.document.documentName;
    this.req1 = this.document.req1;
    this.req2 = this.document.req2;
    this.req3 = this.document.req3;
    this.req4 = this.document.req4;
    this.file = this.document.file;
  }
  onSubmit(form:NgForm){
    const name = form.value.name;
    const req1 = form.value.req1;
    const req2 = form.value.req2;
    const req3 = form.value.req3;
    const req4 = form.value.req4;
    const file = form.value.file;
    const document = new files(name , req1 , req2 , req3 , req4 , file);
    this.documentService.editDocument(document , this.id);

    this.route.navigate(['../'] , {relativeTo:this.router});
  }

  onCancel(){
    this.route.navigate(['../'] , {relativeTo:this.router});
  }

}
