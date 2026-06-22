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
let screenCells = [];
let mapCells = [];
let mc;

import Player from "./Player.js";
import Cell from "./Cell.js";
import generateMaze from "./generateMaze.js";

 new p5(function(p5) 
 {
    p5.setup = function() {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        
        mc = new Player(Math.floor(screenCols / 2), Math.floor(screenRows / 2) , screenCells,0,0);
        
        for(var i = 0; i < screenCols; i++) {
            screenCells[i] = [];
            for(var j = 0; j < screenRows; j++) {
                screenCells[i][j] = new Cell(i * cellWidth, j * cellHeight,1,true,-1,-1,true,true,true,true);
            }
        }
        
        for(var i = 0; i < mapCols; i++) {
            mapCells[i] = [];
            for(var j = 0; j < mapRows; j++) {
                mapCells[i][j] = new Cell(0,0,2,false,i,j,true,true,true,true);
            }
        }  
        
        var gm = new generateMaze(0,0,mapCells,mc.x,mc.y);
        gm.generateMaze(p5);
    }

    p5.draw = function() {
        p5.background(0);

        for(var i = 0; i < screenCols; i++) {
            for(var j = 0; j < screenRows; j++) {
                screenCells[i][j].show(p5);
            }
        }

        
        for(var i = mc.cameraX; i < mc.cameraX + screenCols; i++) {
            for(var j = mc.cameraY; j < mc.cameraY + screenRows; j++) {
                mapCells[i][j].x = screenCells[i - mc.cameraX][j - mc.cameraY].x;
                mapCells[i][j].y = screenCells[i - mc.cameraX][j - mc.cameraY].y;
                screenCells[i - mc.cameraX][j - mc.cameraY].left = mapCells[i][j].left;
                screenCells[i - mc.cameraX][j - mc.cameraY].up = mapCells[i][j].up;
                screenCells[i - mc.cameraX][j - mc.cameraY].right = mapCells[i][j].right;
                screenCells[i - mc.cameraX][j - mc.cameraY].down = mapCells[i][j].down;
                mapCells[i][j].render = true;
                mapCells[i][j].show(p5);
            }
        }
        mc.movePlayer(p5);
        mc.show(p5);
    }
 })
 