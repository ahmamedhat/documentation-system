import { Component, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { docService } from 'src/app/documents-service';
import { documentModel } from 'src/app/documents.model';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  df:FormGroup;
  switchTabs:number = 0;
  imageFile:File;
  dPArray:any[] = [];
  dPimageFile:File[] = [];
  sub:Subscription;

  constructor(private documentService:docService , private route:Router , private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.documentService.chooseFile(-1);
    this.formInit();
    
    
  }

  onSwitchTabs(state:number){
    this.switchTabs = state;
    if (state === 0 || state === 1){
      this.df.reset();
    }
  }

  onFormSubmit(form:NgForm , state:number){
    let name , date1 , date2 , req1 , req2 , req3 , req4 , file , document:documentModel;
    switch (state) {
      case 0:
        name = form.value.initName;
        date1 = form.value.start;
        date2 = form.value.end;
        req1 = form.value.initReq2;
        req2 = form.value.initReq3;
        req3 = form.value.initReq4;
        req4 = form.value.initReq5;
        document = {documentName: name , date1:date1 , date2:date2 , req1:req1 , req2:req2 , req3:req3 , req4:req4 };
        this.documentService.addToAllDocument(document);
        break;

      case 1:
        name = form.value.name;
        req1 = form.value.req1;
        req2 = form.value.req2;
        req3 = form.value.req3;
        req4 = form.value.req4;
        file = this.imageFile;
        document = {documentName: name , req1:req1 , req2:req2 , req3:req3 , req4:req4 , file: file};
        this.documentService.addToAllDocument(document);
        break;
      case 2:
        const dpDocuments = this.df.value.documents;
        let i = 0;
        for(let document of dpDocuments){
          let name = document.dpName;
          let file = this.dPimageFile[i];
          if (this.dPArray.length === 0){
            this.dPArray.push(name);
          }
          let dp:documentModel = {documentName: name , file: file};
          this.dPArray.push(dp);
          i++;
        }
        this.documentService.addToAllDocument(this.dPArray);
    }
    this.route.navigate(['sdlc']);
  }

 

  onUpload(event){
    this.imageFile = event.target.files[0];
  }

  onReset(form:NgForm){
    form.reset();
  }

  formInit(){
    let documentArray = new FormArray([]);
    documentArray.push (new FormGroup({
      'dpName': new FormControl(null , Validators.required),
      'dpFile': new FormControl(null, Validators.required)
    }) 
    )

    this.df = new FormGroup({
      'documents': documentArray,
    })
  }

  addDocument(){
    this.controls2.push(new FormGroup({
      'dpName': new FormControl(null , Validators.required),
      'dpFile': new FormControl(null , Validators.required)
    }))
  }

  onUploadDp(event){
    this.dPimageFile.push(event.target.files[0]);
  }

  get controls() { 
    return (<FormArray>this.df.get('documents')).controls;
  }
  get controls2() { 
    return (<FormArray>this.df.get('documents'));
  }

}

