import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { dpFiles } from "./dpFiles.model";
import { files } from "./files.model";

@Injectable({providedIn:"root"})

export class docService {
    documents: files[] = [];
    dPdocuments:dpFiles[] = [];
    documentsChanged = new Subject<files[]>();    

    
    addDocument(document:files){
        this.documents.push(document);
        this.documentsChanged.next(this.documents);
    }
    getDocuments(){
        return this.documents;
    }
    getDocument(index:number){
        return this.documents[index];
    }
    editDocument(document:files , id:number){
        this.documents[id] = document;
        this.documentsChanged.next(this.documents);
    }
    deleteDocument(id:number){
        this.documents.splice(id , 1);
        this.documentsChanged.next(this.documents);
    }

}