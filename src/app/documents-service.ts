import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { dpFiles } from "./dpFiles.model";

@Injectable({providedIn:"root"})

export class docService{
    allDocuments: any[] = [];
    allDocumentsChanged = new Subject<any[]>();
    dPdocuments:dpFiles[] = [];
    allFiles:dpFiles[] = [];
    dpDocumentsChanged = new Subject<dpFiles[]>();
    chosenFile:number;
    chosenFileChanged = new Subject<number>();


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
            return 1;
        }
        else if (document[0]){
            return 2;
        }
        else {
            return 0;
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

    chooseFile(id:number){
        this.chosenFile = id;
        this.chosenFileChanged.next(this.chosenFile);
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
        this.allFiles = [];
        for(let document of ds1){
            if(!document.date1 && !document[0]){
                let name = document.documentName;
                let file = document.file;
                this.allFiles.push(new dpFiles(name , file));
            }
            else if (document[0]){
                for (let d of document){
                    if(d.documentName){
                        let name = d.documentName;
                        let file = d.file;
                        this.allFiles.push(new dpFiles(name , file));
                    }
                }
            }
        }
    }
    
    getAllFiles(){
        return this.allFiles;
    }

    /* End of Design Phase Code */

}