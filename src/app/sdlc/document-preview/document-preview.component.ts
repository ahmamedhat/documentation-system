import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
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
  phase:boolean;
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

  constructor(private route:ActivatedRoute, private router:Router , private documentService:docService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      (params:Params) =>{
        this.id = +params['id'];
        if(!this.documentService.getFromAllDocuments(this.id)){
          this.router.navigate(['../'] , {relativeTo:this.route});
        }
        else if(!this.documentService.documentCheck(this.id)){
          this.phase = false;
          this.document = this.documentService.getFromAllDocuments(this.id);
          this.file = this.document.file;
          this.imageInit(this.file);
        }
        else{
          this.phase = true;
          this.initDocument = this.documentService.getFromAllDocuments(this.id);
        }
      }
    )
    
  }

  imageInit(file:File){
    const reader = new FileReader();
    reader.onload = (e) => {    
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
