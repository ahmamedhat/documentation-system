import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { docService } from '../documents-service';
import { dpFiles } from '../dpFiles.model';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.css']
})
export class AllFilesComponent implements OnInit {

  sub1:Subscription;
  sub2:Subscription;
  allFiles:dpFiles[] = [];
  @ViewChild('img' , {static:true}) image;

  constructor(private documentService:docService) { }

  ngOnInit(): void {
    this.documentService.mergeFiles();
    this.sub1 = this.documentService.documentsChanged.subscribe(
      () => {
        this.documentService.mergeFiles();
      }
    )
    this.sub2 = this.documentService.dpDocumentsChanged.subscribe(
      () => {
        this.documentService.mergeFiles();
      }
    )
    this.allFiles = this.documentService.getAllFiles();
  }

  fileChosen(id:number){
    const imageFile = this.allFiles[id].file;
    const reader = new FileReader();
    reader.onload = (e) =>{
      this.image.nativeElement.src = e.target.result;
    }
    reader.readAsDataURL(imageFile);
  }


}
