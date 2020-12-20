export class dpFiles {
    public documentName:string;
    public file:File;

    constructor(documentName:string , file:File) {
        this.documentName = documentName;
        this.file = file;
    }
}