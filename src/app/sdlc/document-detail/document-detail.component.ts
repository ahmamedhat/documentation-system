import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  df:FormGroup;
  switchTabs:boolean = false;
  file:files ;
  imageFile:File;
  documents:files[] = [];
  dPimageFile:File;
  sub:Subscription;

  constructor(private documentService:docService , private route:Router) { }

  ngOnInit(): void {
    this.sub = this.documentService.documentsChanged.subscribe(
      documents => {
        this.documents = documents
      }
    )
    this.formInit();
    
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
  onDpSubmit(){
    const dpDocuments = this.df.value.documents;
    for(let document of dpDocuments){
      let name = document.dpName;
      let file = this.dPimageFile;
      let documentFile = new dpFiles(name , file);
      this.documentService.addDpDocument(documentFile);
    }

  }
  onUploadDp(event){
    this.dPimageFile = event.target.files[0];
  }
  get controls() { 
    return (<FormArray>this.df.get('documents')).controls;
  }
  get controls2() { 
    return (<FormArray>this.df.get('documents'));
  }

  /* End of Design Phase Code */

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

