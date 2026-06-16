const l = 10;
const w = 10;
const len = 25;
const wid = 25;
const win_l = 1440;
const win_w = 1000;


class cell {
    constructor(x,y,left,right,up,down) {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.x = x;
        this.y = y;
    }

    show() {
        fill(0);
        stroke(255);
        strokeWeight(2);
        rect(this.x,this.y,len,wid);
    }
}

let cells = [];

function setup() {
    createCanvas(win_l,win_w);
    for(let i = 0; i < l * w; i++) {
        cells[i] = new cell(0,0,false,false,false,false);
    }
}

function draw() {
    background(0);

    for(let cell of cells) {
        cell.show();
    }
}