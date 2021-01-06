import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { docService } from 'src/app/documents-service';
import { documentModel } from 'src/app/documents.model';


@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit , OnDestroy {
  @ViewChild('img' , {static:false}) imageFile;
  phase:boolean;
  sub:Subscription;
  id:number;
  documentFormObject:documentModel;
  image:File;


  constructor(private router:ActivatedRoute , private documentService:docService , private route:Router) { }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.documentFormObject = this.documentService.getFromAllDocument(this.id);
        if (this.documentFormObject.file){
          this.imagInit(this.documentFormObject.file);
          this.phase = true;
        }
        else{
          this.phase = false;
        }
      }
    )
  }

  /* Optimized Code */

  onFormSubmit(form:NgForm , state:boolean){
    let name , date1 , date2 , req1 , req2 , req3 , req4 , file , document:documentModel;
    switch (state) {
      case false:
        name = form.value.initName;
        date1 = form.value.date1;
        date2 = form.value.date2;
        req1 = form.value.initReq2;
        req2 = form.value.initReq3;
        req3 = form.value.initReq4;
        req4 = form.value.initReq5; 
        document = {documentName: name , date1:date1 , date2:date2 , req1:req1 , req2:req2 , req3:req3 , req4:req4 };
        this.documentService.editDocument(document , this.id);
        break;
    
      case true:
        name = form.value.name;
        req1 = form.value.req1;
        req2 = form.value.req2;
        req3 = form.value.req3;
        req4 = form.value.req4;
        file = this.checkFile(this.image);
        document = {documentName: name , req1:req1 , req2:req2 , req3:req3 , req4:req4 , file: file}; 
        this.documentService.editDocument(document , this.id);
        break;
      }
    this.route.navigate(['../'] , {relativeTo:this.router});
  }


  imagInit(file:File){
    let image = file;
    const reader = new FileReader();
    reader.onload = (e) => {    
      this.imageFile.nativeElement.src = e.target.result;      
    };
    reader.readAsDataURL(image);

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
      return this.documentFormObject.file;
    }
  }

  ngOnDestroy (){
    this.sub.unsubscribe();
  }

}
