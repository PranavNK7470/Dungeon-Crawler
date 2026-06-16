const cellHeight = 50;
const cellWidth = 50;
const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;
const mapHeight = screenHeight * 5;
const mapWidth = screenWidth * 5;
const mapRows = Math.floor(mapHeight / cellHeight);
const mapCols = Math.floor(mapWidth / cellWidth);
const renderHeight = 5;
const renderWidth = 8;

class player{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    show() {
        fill(255,0,0);
        circle(this.x * cellWidth + cellWidth/2, this.y * cellHeight + cellHeight/2, Math.min(cellHeight,cellWidth) - 5);
    }
}

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
        rect(this.x,this.y,cellWidth,cellHeight);
    }
}

let cells = [];
let mc;

function setup() {
    createCanvas(windowWidth, windowHeight);

    mc = new player(mapRows/2, mapCols/2);

    for(var i = 0; i < mapCols; i++) {
        cells[i] = [];
        for(var j = 0; j < mapRows; j++) {
            cells[i][j] = new cell(i * cellWidth, j * cellHeight,false,false,false,false);
        }
    }
}

function draw() {
    background(0);
    let cameraX = mc.x * cellWidth - width/2;
    let cameraY = mc.y * cellHeight - height/2;

    push();
    translate(-cameraX,-cameraY);

    for(var i = mc.x - renderWidth; i < mc.x + renderWidth; i++) {
        for(var j = mc.y - renderHeight; j < mc.y + renderHeight; j++) {
            if(i >= 0 && i < mapCols && j >= 0 && j < mapRows) cells[i][j].show();
        }
    }
    movePlayer();
    mc.show();
    pop();
}


const delay = 50;
let last = 0;

function movePlayer() {
    if(millis() - last < delay) {
        return;
    }

    if(keyIsDown(87)) {
        if(mc.y > 0) {
            mc.y -= 1;
        }
    } else if(keyIsDown(65)) {
        if(mc.x > 0) {
            mc.x -= 1;
        }
    } else if(keyIsDown(83)) {
        if(mc.y < (height / ch)) {
            mc.y += 1;
        }
    } else if(keyIsDown(68)){
        if(mc.x < (width / cw)) {
            mc.x += 1;
        }
    }
    last = millis();
}