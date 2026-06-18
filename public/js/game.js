const cellHeight = 50;
const cellWidth = 50;
const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;
const screenRows = Math.floor(screenHeight / cellHeight);
const screenCols = Math.floor(screenWidth / cellWidth) + 1;
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
    constructor(x,y,color,render,indx,indy,left,up,right,down) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.render = render;
        this.indx = indx;
        this.indy = indy;
        this.left = left;
        this.up = up;
        this.right = right;
        this.down = down;
    }

    show() {
        if(this.render) {
            fill(0);
            stroke(255);
            strokeWeight(0.2);
            if(!this.left) line(this.x,this.y,this.x,this.y + cellHeight);
            if(!this.up) line(this.x,this.y,this.x + cellWidth,this.y);
            if(!this.right) line(this.x + cellWidth, this.y, this.x + cellWidth, this.y + cellHeight);
            if(!this.down) line(this.x,this.y + cellHeight,this.x + cellWidth,this.y + cellHeight);
        }
    }
}

let screenCells = [];
let mapCells = [];
let mc;                        
const visited = new Set();
const stack = [];

function findNeighbours(indx, indy) {
    var neighbours = [];
    if(indx !== 0 && !visited.has(mapCells[indx - 1][indy])) neighbours.push(mapCells[indx - 1][indy]);
    if(indy !== 0 && !visited.has(mapCells[indx][indy - 1])) neighbours.push(mapCells[indx][indy - 1]);
    if(indx !== mapCols - 1 && !visited.has(mapCells[indx + 1][indy])) neighbours.push(mapCells[indx + 1][indy]);
    if(indy !== mapRows - 1 && !visited.has(mapCells[indx][indy + 1])) neighbours.push(mapCells[indx][indy + 1]);

    return neighbours;
}

function removeWalls(currx,curry,chosenx,choseny) {
    if(currx < chosenx && curry === choseny) {
        //right
        mapCells[currx][curry].right = false;
        mapCells[chosenx][choseny].left = false;
    } else if(currx > chosenx && curry === choseny) {
        //left
        mapCells[currx][curry].left = false;
        mapCells[chosenx][choseny].right = false;
    } else if(currx === chosenx && curry < choseny) {
        //down
        mapCells[currx][curry].down = false;
        mapCells[chosenx][choseny].up = false;
    } else if(currx === chosenx && curry > choseny) {
        //up
        mapCells[currx][curry].up = false;
        mapCells[chosenx][choseny].down = false;
    }
}

function generateMaze(indx, indy) {
    visited.add(mapCells[indx][indy]);
    stack.push(mapCells[indx][indy]);

    while(stack.length !== 0) {
        let current = stack.pop();
        let neighbours = findNeighbours(current.indx, current.indy);
        if(neighbours.length !== 0) {
            stack.push(current);
            let chosen = neighbours[Math.floor(random(neighbours.length))];
            removeWalls(current.indx, current.indy, chosen.indx, chosen.indy);
            visited.add(chosen);
            stack.push(chosen);
        }
    }
}
                        
function setup() {
    createCanvas(windowWidth, windowHeight);
                            
    mc = new player(Math.floor(screenCols / 2), Math.floor(screenRows / 2));
    
    for(var i = 0; i < screenCols; i++) {
        screenCells[i] = [];
        for(var j = 0; j < screenRows; j++) {
            screenCells[i][j] = new cell(i * cellWidth, j * cellHeight,1,true,-1,-1,true,true,true,true);
        }
    }
    
    for(var i = 0; i < mapCols; i++) {
        mapCells[i] = [];
        for(var j = 0; j < mapRows; j++) {
            mapCells[i][j] = new cell(0,0,2,false,i,j,true,true,true,true);
        }
    }

    generateMaze(0,0);
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
            screenCells[i - cameraX][j - cameraY].left = mapCells[i][j].left;
            screenCells[i - cameraX][j - cameraY].up = mapCells[i][j].up;
            screenCells[i - cameraX][j - cameraY].right = mapCells[i][j].right;
            screenCells[i - cameraX][j - cameraY].down = mapCells[i][j].down;
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
        if(mc.y > 0 && mapCells[mc.x][mc.y].up) {
            mc.y -= 1;
        } else if(cameraY != 0 && mapCells[mc.x][mc.y].up){
            cameraY -= 1;
        }
    } else if(keyIsDown(65)) {
        if(mc.x > 0 && mapCells[mc.x][mc.y].left) {
            mc.x -= 1;
        } else if(cameraX != 0 && mapCells[mc.x][mc.y].left) {
            cameraX -= 1;
        }
    } else if(keyIsDown(83)) {
        if(mc.y < screenRows - 1 && mapCells[mc.x][mc.y].down) {
            mc.y += 1;
        } else if(cameraY < mapRows - screenRows && mapCells[mc.x][mc.y].down) {
            cameraY += 1;
        }
    } else if(keyIsDown(68)) {
        if(mc.x < screenCols - 1 && mapCells[mc.x][mc.y].right) {
            mc.x += 1;
        } else if(cameraX < mapCols - screenCols && mapCells[mc.x][mc.y].right) {
            cameraX += 1;
        }
    }
    last = millis();
}