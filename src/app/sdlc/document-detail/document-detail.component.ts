import { Component, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { docService } from 'src/app/documents-service';
import { dpFiles } from 'src/app/dpFiles.model';
import { files } from 'src/app/files.model';
import { initFiles } from 'src/app/initFiles.model';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  df:FormGroup;
  switchTabs:number = 0;
  file:files ;
  imageFile:File;
  documents:files[] = [];
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
  }

  /* Start of Initialization Phase Code */

  onInitSubmit(form:NgForm){
    const req1 = form.value.initName;
    const date1 = form.value.start;
    const date2 = form.value.end;
    const req2 = form.value.initReq2;
    const req3 = form.value.initReq3;
    const req4 = form.value.initReq4;
    const req5 = form.value.initReq5;
    const document = new initFiles(req1 , date1 , date2 , req2 , req3 , req4 , req5);
    this.documentService.addToAllDocuments(document);

    form.reset();
    this.route.navigate(['/sdlc']);
  } 

  /* End of Initialization Phase Code */

  /* Start of Requirements Phase Code */

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
    this.documentService.addToAllDocuments(document);
    
    form.reset();
    this.route.navigate(['/sdlc']);
  }

  onReset(form:NgForm){
    form.reset();
  }

  /* End of Requirements Phase Code */

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
    let i =0;
    for(let document of dpDocuments){
      let name = document.dpName;
      let file = this.dPimageFile[i];
      if (this.dPArray.length === 0){
        this.dPArray.push(name);
      }
      this.dPArray.push(new dpFiles(name , file));
      let documentFile = new dpFiles(name , file);
      this.documentService.addDpDocument(documentFile);
      i++;
    }
    this.documentService.addToAllDocuments(this.dPArray);
    this.route.navigate(['../'] , {relativeTo:this.router});

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

  /* End of Design Phase Code */

}

