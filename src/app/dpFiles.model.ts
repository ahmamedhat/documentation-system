export class dpFiles {
    public documentName:string;
    public file:File;
    public _array:any[] = [];

    constructor(documentName:string , file:File) {
        this.documentName = documentName;
        this.file = file;
    }


    pushToArray(documentName:string , file:File){
        this._array.push(new dpFiles (documentName , file));
    }
    get array(){
        return this._array;
    }
}