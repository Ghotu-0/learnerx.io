class ScriptStructure{

    file="https://github.com/NikhilPunia01/learnerx.io/blob/aac8758c440ee0f79ded29e00af14ae2dc0270ec/LearnerX/scripts/ScriptStructure.json";

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

        for (let l = 0; l < logData.Scripts.length; l++) {
         let entry=logData.Scripts[l];
         console.table(entry);
        }
       }catch(err){
       console.log(err);
       }

      }
      
}

let tryo=new ScriptStructure;

tryo.log();