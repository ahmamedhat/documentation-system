import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { docService } from 'src/app/documents-service';
import { files } from 'src/app/files.model';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css']
})
export class DocumentPreviewComponent implements OnInit {
  file:File;
  @ViewChild('img' , {static:true}) imageFile;
  id:number;
  document:files;
  constructor(private route:ActivatedRoute, private router:Router , private documentService:docService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) =>{
        this.id = +params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    )
    this.file = this.document.file;
    const reader = new FileReader();
    reader.onload = (e) => {    
      this.imageFile.nativeElement.src = e.target.result;      
    };
    reader.readAsDataURL(this.file);
  }

  onEdit(){
    this.router.navigate(['edit'] , {relativeTo:this.route});
  }

  onDelete(){
    this.documentService.deleteDocument(this.id);
    this.router.navigate(['../'] , {relativeTo:this.route});
  }


}
