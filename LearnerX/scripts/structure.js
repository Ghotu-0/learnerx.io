class ScriptStructure{

    file="../str.json";

    constructor(filex){
    if (filex) {
      this.file=filex;
    }
    }

    async log() {
        try{
        let fileObj = await fetch(this.file);
        let json = await fileObj.text();
 
        var logData = JSON.parse(json);
        return logData;

       }catch(err){
       console.log(err);
       }

      }
      
}

export{ScriptStructure}