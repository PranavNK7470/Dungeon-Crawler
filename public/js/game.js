const cellHeight = 50;
const cellWidth = 50;
const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;
const screenRows = Math.floor(screenHeight / cellHeight);
const screenCols = Math.floor(screenWidth / cellWidth);
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
    constructor(x,y,color,render,indx,indy) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.render = render;
        this.indx = indx;
        this.indy = indy;
    }

    show() {
        if(this.render) {
            if(this.color === 1)fill(0);
            else if(this.color === 2) {
                if(this.indy < 13 && this.indx < 28) fill(150,0,0);
                else if(this.indy >= 13 && this.indx <  28*2)fill(0,150,0);
                else fill(0,0,150);
            }
            stroke(255);
            strokeWeight(0.2);
            rect(this.x,this.y,cellWidth,cellHeight);
        }
    }
}

let screenCells = [];
let mapCells = [];
let mc;

function setup() {
    createCanvas(windowWidth, windowHeight);

    mc = new player(0,0);
    
    for(var i = 0; i < screenCols; i++) {
        screenCells[i] = [];
        for(var j = 0; j < screenRows; j++) {
            screenCells[i][j] = new cell(i * cellWidth, j * cellHeight,1,true,-1,-1);
        }
    }
    
    for(var i = 0; i < mapCols; i++) {
        mapCells[i] = [];
        for(var j = 0; j < mapRows; j++) {
            mapCells[i][j] = new cell(0,0,2,false,i,j);
        }
    }
}

let cameraX = 0;
let cameraY = 0;
let i;
let j;
function draw() {
    background(0);

    for(var i = 0; i < screenCols; i++) {
        for(var j = 0; j < screenRows; j++) {
            screenCells[i][j].show();
        }
    }
    
    for(i = cameraX; i < cameraX + screenCols; i++) {
        for(j = cameraY; j < cameraY + screenRows; j++) {
            mapCells[i][j].x = screenCells[i - cameraX][j - cameraY].x;
            mapCells[i][j].y = screenCells[i - cameraX][j - cameraY].y;
            mapCells[i][j].render = true;
            mapCells[i][j].show();
        }
    }
    movePlayer();
    mc.show();
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
        } else if(cameraY != 0){
            cameraY -= 1;
        }
    } else if(keyIsDown(65)) {
        if(mc.x > 0) {
            mc.x -= 1;
        } else if(cameraX != 0) {
            cameraX -= 1;
        }
    } else if(keyIsDown(83)) {
        if(mc.y < screenRows - 1) {
            mc.y += 1;
        } else if(cameraY < mapCols) {
            cameraY += 1;
        }
    } else if(keyIsDown(68)){
        if(mc.x < screenCols - 1) {
            mc.x += 1;
        } else if(cameraX < mapRows) {
            cameraX += 1;
        }
    }
    last = millis();
}