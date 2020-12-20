export class files {
    public documentName:string;
    public req1:string;
    public req2:string;
    public req3:string;
    public req4:string;
    public file:File;

    constructor(
        documentName:string,
        file:File
        ,req1?:string 
        ,req2?:string,
        req3?:string,
        req4?:string
        ) {
            this.documentName = documentName;
            this.req1 = req1;
            this.req2 = req2;
            this.req3 = req3;
            this.req4 = req4;
            this.file = file;
        }
}