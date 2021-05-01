class  Table{
    rootElement=document.getElementsByTagName('body')[0];
     id="";
     cls="defaultTable";
     headCls="defaultHead";

    mainTable=document.createElement('table');

    constructor(element){

        this.rootElement=element;

    }


    configure(elementId,mainClass,headClass){

    if (id) {
        this.id=elementId;
    }
    else{
        this.id=""
    }

    if (mainClass) {
        this.cls=mainClass;
    }
    else{
        this.cls="defaultTable";
    }

    if (headClass) {
        this.headCls=headClass;
    }
    else{
        this.headCls="defaultHead"
    }

    }



    pushInTop(value,index){

     if (this.mainTable.rows[index]) {
         
        this.mainTable.rows[index].insertCell(0).innerHTML=value;

     } else {
        this.mainTable.insertRow(index).insertCell(0).innerHTML=value;
     }


     if (index==0){
        this.mainTable.rows[index].classList.add(this.headCls)
     }

 

    }


    createEmpty(rows,clm,string){

        for (let i = 0; i < rows; i++) {
            for (let l = 0; l < clm; l++) {
                
                this.pushInTop(string+l,i);

            }

            
        }
    }


    createWithArray(array){

        for (let o = Object.keys(array[0]).length-1; o >= 0 ; o--) {
            
             this.pushInTop(Object.keys(array[0])[o],0);
            
        }

        for (let i = 0; i < array.length; i++) {
           
            for (let l = Object.keys(array[i]).length-1; l >= 0; l--) {
             
                let objKeys=Object.keys(array[i])[l];

                this.pushInTop(array[i][objKeys],i+1);
                
            }

        }


    }


    appendTable(){
        this.mainTable.id=this.id;
        this.mainTable.classList.add(this.cls);
        this.rootElement.append(this.mainTable);
    }



    deleteTable(){
        this.mainTable.remove();
    }
    

}

export{Table};