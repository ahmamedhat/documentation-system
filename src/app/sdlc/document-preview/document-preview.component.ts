import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { docService } from 'src/app/documents-service';
import { files } from 'src/app/files.model';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css']
})
export class DocumentPreviewComponent implements OnInit , OnDestroy {
  file:File;
  @ViewChild('img' , {static:true}) imageFile;
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

  constructor(private route:ActivatedRoute, private router:Router , private documentService:docService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      (params:Params) =>{
        this.id = +params['id'];
        if(!this.documentService.getDocument(this.id)){
          this.router.navigate(['../'] , {relativeTo:this.route});
        }
        else{
          this.document = this.documentService.getDocument(this.id);
          this.file = this.document.file;
          this.imageInit(this.file);
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
    this.documentService.deleteDocument(this.id);
    this.router.navigate(['../'] , {relativeTo:this.route});
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


}
