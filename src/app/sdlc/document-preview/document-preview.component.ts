import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { docService } from 'src/app/documents-service';
import { files } from 'src/app/files.model';
import { initFiles } from 'src/app/initFiles.model';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css']
})
export class DocumentPreviewComponent implements OnInit , OnDestroy {
  phase:number;
  file:File;
  @ViewChild('img' , {static:false}) imageFile;
  sub:Subscription;
  id:number;
  document:files = {
    documentName:'',
    req1:'',
    req2:'',
    req3:'',
    req4:'',
    file:null,
  };
  initDocument:initFiles = {
    documentName:'',
    date1:'',
    date2:'',
    req2:'',
    req3:'',
    req4:'',
    req5:'',
  };
  dPArray:any[] = [];

  constructor(private route:ActivatedRoute, private router:Router , private documentService:docService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      (params:Params) =>{
        this.id = +params['id'];
        this.documentService.chooseFile(this.id);
        if(this.documentService.documentCheck(this.id) === 0){
          this.phase = 0;
          this.document = this.documentService.getFromAllDocuments(this.id);
          this.file = this.document.file;
          this.imageInit(this.file);
        }
        else if (this.documentService.documentCheck(this.id) === 1){
          this.phase = 1;
          this.initDocument = this.documentService.getFromAllDocuments(this.id);
        }
        else {
          this.phase = 2;
          this.dPArray = this.documentService.getFromAllDocuments(this.id);
          this.file = this.dPArray[1].file;
          this.imageInit(this.file);
          
        }
      }
    )
    
  }

  imageInit(file:File){
    let reader = new FileReader();
    reader.onloadend = (e) => {     
      this.imageFile.nativeElement.src = e.target.result;      
    };
    reader.readAsDataURL(file);
  }

  viewImage(index: number){
    const file = this.dPArray[index].file;
    const reader = new FileReader();
    reader.onloadend = (e) => {     
      this.imageFile.nativeElement.src = e.target.result;      
    };
    reader.readAsDataURL(file);
  }
  onEdit(){
    this.router.navigate(['edit'] , {relativeTo:this.route});
  }

  onDelete(){
    this.documentService.deleteFromAllDocuments(this.id);
    this.router.navigate(['../'] , {relativeTo:this.route});
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


}
