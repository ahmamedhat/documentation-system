export class documentModel {
    public documentName:string;
    public date1?:string;
    public date2?:string;
    public req1?:string;
    public req2?:string;
    public req3?:string;
    public req4?:string;
    public file?:File;

    constructor(documentName:string , date1?:string , date2?:string , req1?:string , req2?:string , req3?:string , req4?:string , file?:File) {
        this.documentName = documentName;
        this.date1 = date1;
        this.date2 = date2;
        this.req1 = req1;
        this.req2 = req2;
        this.req3 = req3;
        this.req4 = req4;
        this.file = file;
     }
}