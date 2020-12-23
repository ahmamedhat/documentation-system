import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { dpFiles } from "./dpFiles.model";
import { files } from "./files.model";
import { initFiles } from "./initFiles.model";

@Injectable({providedIn:"root"})

export class docService{
    allDocuments: any[] = [];
    allDocumentsChanged = new Subject<any[]>();
    dPdocuments:dpFiles[] = [];
    allFiles:dpFiles[] = [];
    dpDocumentsChanged = new Subject<dpFiles[]>();


    addToAllDocuments(document:any){
        this.allDocuments.push(document);
        this.allDocumentsChanged.next(this.allDocuments);
    }
    getAllDocuments(){
        return this.allDocuments;
    }
    getFromAllDocuments(index:number){
        return this.allDocuments[index];
    }
    documentCheck(index:number){
        const document = this.getFromAllDocuments(index);
        if (document.date1){
            return true;
        }
        else{
            return false;
        }
    }
    editDocuments(document ,index:number){
        this.allDocuments[index] = document;
        this.allDocumentsChanged.next(this.allDocuments);
    }
    deleteFromAllDocuments(index:number){
        this.allDocuments.splice(index , 1);
        this.allDocumentsChanged.next(this.allDocuments);
    }

    
    /* Design Phase Functions */

    addDpDocument(document:dpFiles){
        this.dPdocuments.push(document);
        this.dpDocumentsChanged.next(this.dPdocuments);
    }
    getDpDocuments(){
        return this.dPdocuments;
    }

    mergeFiles(){
         const ds1 = this.getAllDocuments();
        const ds2 = this.getDpDocuments();
        this.allFiles = [];
        for(let document of ds1){
            if(!document.date1){
                let name = document.documentName;
                let file = document.file;
                this.allFiles.push(new dpFiles(name , file));
            }
            
        }
        for(let document of ds2){
            let name = document.documentName;
            let file = document.file;
            this.allFiles.push(new dpFiles(name , file));
        } 
        
    }
    getAllFiles(){
        return this.allFiles;
    }

    /* End of Design Phase Code */

}