import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { docService } from 'src/app/documents-service';
import { documentModel } from 'src/app/documents.model';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css']
})
export class DocumentPreviewComponent implements OnInit , OnDestroy {
  phase:number;
  @ViewChild('img' , {static:false}) imageFile;
  sub:Subscription;
  id:number;
  documentFormObject:documentModel;
  dPArray:any[] = [];

  constructor(private route:ActivatedRoute, private router:Router , private documentService:docService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      (params:Params) =>{
        this.id = +params['id'];
        this.documentService.chooseFile(this.id);
        this.documentFormObject = this.documentService.getFromAllDocument(this.id);
        if (this.documentFormObject.date1){
          this.phase = 1;
        }
        else if(this.documentFormObject.file && this.documentFormObject.req1){
          this.phase = 0;
          let file = this.documentFormObject.file;
          this.imageInit(file);
        }
        else {
          this.phase = 2;
          let file = this.documentFormObject[1].file;
          this.imageInit(file);
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
    const file = this.documentFormObject[index].file;
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
    this.documentService.deleteFromAllDocument(this.id);
    this.router.navigate(['../'] , {relativeTo:this.route});
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


}
