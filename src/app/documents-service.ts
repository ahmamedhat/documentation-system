import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { documentModel } from "./documents.model";

@Injectable({providedIn:"root"})

export class docService{

    allFiles:documentModel[] = [];
    chosenFile:number;
    chosenFileChanged = new Subject<number>();
    allDocument: any[] = [];
    allDocumentChanged = new Subject<documentModel[]>();


    chooseFile(id:number){
        this.chosenFile = id;
        this.chosenFileChanged.next(this.chosenFile);
    }

    /* New Optimized Code */

    addToAllDocument(document:any){
        this.allDocument.push(document);
        this.allDocumentChanged.next(this.allDocument);
    }
    getAllDocument(){
        return this.allDocument;
    }
    editDocument(document ,index:number){
        this.allDocument[index] = document;
        this.allDocumentChanged.next(this.allDocument);
    }
    deleteFromAllDocument(index:number){
        this.allDocument.splice(index , 1);
        this.allDocumentChanged.next(this.allDocument);
    }
    getFromAllDocument(index:number){
        return this.allDocument[index];
    }


    mergeFiles(){
        const ds1 = this.getAllDocument();
        this.allFiles = [];
        let doc:documentModel;
        for(let document of ds1){
            if(!document.date1 && !document[0]){
                let name = document.documentName;
                let file = document.file;
                doc = {documentName: name , file: file};
                this.allFiles.push(doc);
            }
            else if (document[0]){
                for (let d of document){
                    if(d.documentName){
                        let name = d.documentName;
                        let file = d.file;
                        doc = {documentName: name , file: file};
                        this.allFiles.push(doc);
                    }
                }
            }
        }
    }
    
    getAllFiles(){
        return this.allFiles;
    }


}