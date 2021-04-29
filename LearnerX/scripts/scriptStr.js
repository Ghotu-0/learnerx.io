class ScriptStructure{
    file="D:/learnerx.io/LearnerX/scripts/ScriptStructure.json";

    async log() {
        let myObject = await fetch(this.file);
        let myText = await myObject.text();
        console.log(myText);
      }

}

let tryo=new ScriptStructure;

tryo.log();