import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { docService } from '../documents-service';
import { dpFiles } from '../dpFiles.model';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.css']
})
export class AllFilesComponent implements OnInit , OnDestroy{

  chosen: number;
  sub:Subscription;
  allFiles:dpFiles[] = [];
  @ViewChild('img' , {static:false}) image;

  constructor(private documentService:docService) { }

  ngOnInit(): void {
    this.documentService.mergeFiles();
    this.sub = this.documentService.allDocumentsChanged.subscribe(
      () => {
        this.documentService.mergeFiles();
      }
    )

    this.allFiles = this.documentService.getAllFiles();
  }

  fileChosen(id:number){
    this.chosen = id;
    const imageFile = this.allFiles[id].file;
    const reader = new FileReader();
    reader.onload = (e) =>{
      this.image.nativeElement.src = e.target.result;
    }
    reader.readAsDataURL(imageFile);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
