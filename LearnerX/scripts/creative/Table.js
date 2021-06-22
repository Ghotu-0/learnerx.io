class Table {
    rootElement = document.getElementsByTagName('body')[0];
    id = "";
    cls = "defaultTable";
    headCls = "defaultHead";
    sideCls = "defaultSideCol"
    analyzedInt = {};
    analyzedString = {};

    mainTable = document.createElement('table');

    constructor(element) {

        this.rootElement = element;

    }


    configure(elementId, mainClass, headClass, sideClass) {

        if (id) {
            this.id = elementId;
        }
        else {
            this.id = ""
        }

        if (mainClass) {
            this.cls = mainClass;
        }
        else {
            this.cls = "defaultTable";
        }

        if (headClass) {
            this.headCls = headClass;
        }
        else {
            this.headCls = "defaultHead"
        }

        if (sideClass) {
            this.sideCls = sideClass;
        }
        else {
            this.sideCls = "defaultSideCol";
        }

    }



    pushInTop(value, index, sideo) {

        if (this.mainTable.rows[index]) {

            this.mainTable.rows[index].insertCell(0).innerHTML = value;

        } else {
            this.mainTable.insertRow(index).insertCell(0).innerHTML = value;

        }


        if (index == 0) {
            this.mainTable.rows[index].classList.add(this.headCls);
        }

        if (sideo) {
            this.mainTable.rows[index].cells[0].classList.add(this.sideCls);
        }

    }



    createEmpty(rows, clm, string) {

        for (let i = 0; i < rows; i++) {
            for (let l = 0; l < clm; l++) {

                this.pushInTop(string + l, i);

            }


        }
    }




    createWithArray(array, serial, side) {

        let extent = 0;

        if (serial) {
            extent = -1;
        }


        for (let o = Object.keys(array[0]).length - 1; o >= 0; o--) {

            this.pushInTop(Object.keys(array[0])[o], 0);
        }
        //////
        if (serial) {
            if (side) {
                this.pushInTop("", 0);
            }
            else {
                this.pushInTop("S.No", 0);
            }
        }



        for (let i = 0; i < array.length; i++) {

            for (let l = Object.keys(array[i]).length - 1; l >= extent; l--) {

                let objKeys = Object.keys(array[i])[l];

                if (array[i][objKeys]) {
                    this.pushInTop(array[i][objKeys], i + 1);

                }
                else {
                    if (l = extent) {
                        if (side) {
                            this.pushInTop(side[i], i + 1, true);
                        }
                        else {
                            this.pushInTop(i + 1, i + 1);
                        }
                    }

                }
            }

        }


    }


    appendTable() {
        this.mainTable.id = this.id;
        this.mainTable.classList.add(this.cls);
        this.rootElement.append(this.mainTable);
    }




    deleteTable() {
        this.mainTable.remove();
    }


    createUnique(id,index) {

        if (!(this.mainTable.querySelectorAll('[data-id="'+id +'"]'))[0]) {

         this.mainTable.insertRow(index);
         this.mainTable.rows[index].setAttribute('data-id', id);
         return true;
        }
        else{
            false;
        }

    }


    addBottomRow(id,refRow,side) {

        let len = this.colLength(refRow);
        let hei = this.rowLength();

        if(this.createUnique(id,hei)){

        for (let l = 0; l < len; l++) {

            if (l == len - 1 && side) {
                this.pushInTop('-', hei, true);
            } else {
                this.pushInTop('-', hei);
            }

        }
    }
    }



    pushInCol(row, col, id, value) {


        if (row && value) {
            if (col) {
                this.selectCol(row, col).innerHTML = value;
            }
        }

        if (id && value) {
            if (col) {

                (this.mainTable.querySelectorAll('[data-id="' + id + '"]'))[0].cells[col].innerHTML = value;

            }
        }


    }




    analyze(coloumn) {

        for (let m = 0; m < this.mainTable.rows.length; m++) {

            for (let l = 0; l < this.mainTable.rows[m].cells.length; l++) {

                if (this.mainTable.rows[m].cells[coloumn] && this.mainTable.rows[m].cells[coloumn].innerHTML != "null") {

                    if (Math.abs(this.mainTable.rows[m].cells[coloumn].innerHTML)) {

                        this.analyzedInt[m] = Math.abs(this.mainTable.rows[m].cells[coloumn].innerHTML);

                    }

                }



            }


        }

        // let selected=this.selectCol(this.maximum(this.analyzedInt,coloumn)[1],this.maximum(this.analyzedInt,coloumn)[2]);

        //this.highlight(selected,'aliceblue')

        // return this.maximum(this.analyzedInt,coloumn);


        /// ////
        //let keyo=Object.keys(this.median(this.analyzedInt))[this.maximum(this.median(this.analyzedInt),coloumn)[1]-1];
        //console.log(keyo+"/"+this.median(this.analyzedInt)[keyo]);
        //this.median(this.analyzedInt)[keyo]


        //this.addBottomRow('Totalo',0,true);
        
        //this.pushInCol(null, coloumn, 'Totalo', this.sum(this.analyzedInt, coloumn));

        //this.setUniqueProp();

        return this.analyzedInt;

    }

    setUniqueProp() {

        for (let m = 0; m < this.mainTable.rows.length; m++) {

            for (let l = 0; l < this.mainTable.rows[m].cells.length; l++) {


                this.mainTable.rows[m].cells[l].setAttribute('data-colid', m + "/" + l);

            }

            this.mainTable.rows[m].setAttribute('data-rowid', m);

        }

    }


    rowLength() {
        return this.mainTable.rows.length
    }

    colLength(row) {
        return this.mainTable.rows[row].cells.length;
    }


    sum(object) {

        let sumo = 0;

        for (let i = 0; i < Object.keys(object).length; i++) {

            let previous = Number(Object.keys(object)[i - 1]) || 0;

            if (Number(Object.keys(object)[i]) - previous == 1) {


                sumo += object[Object.keys(object)[i]];

            }
            else {
                return null;
            }

        }

        return sumo;

    }



    maximum(object, col) {

        let max = [0, 0, 0];
        for (let l = 0; l < Object.values(object).length; l++) {
            if (max[0] < Object.values(object)[l]) {

                max[0] = Object.values(object)[l];
                max[1] = l + 1;
                max[2] = col;

            }


        }

        return max;

    }


    average(object) {

        return this.sum(object) / Object.keys(object).length;

    }

    median(object) {

        let median = {};
        for (let g = 0; g < Object.keys(object).length; g++) {

            if (median[object[Object.keys(object)[g]]]) {
                median[object[Object.keys(object)[g]]] += 1;
            }
            else {
                median[object[Object.keys(object)[g]]] = 1;
            }
        }


        return median;
    }


    selectCol(row, col) {

        if ((this.mainTable.querySelectorAll('[data-colid="' + row + '/' + col + '"]'))[0]) {
            return (this.mainTable.querySelectorAll('[data-colid="' + row + '/' + col + '"]'))[0];
        } else {
            return null;
        }

    }



    highlight(ele, color) {

        ele.style.backgroundColor = color;

    }



}

export { Table };