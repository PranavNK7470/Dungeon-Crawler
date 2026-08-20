const cellHeight = 50;
const cellWidth = 50;
const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;
const screenRows = Math.floor(screenHeight / cellHeight);
const screenCols = Math.floor(screenWidth / cellWidth) + 1;
const mapHeight = screenHeight * 3;
const mapWidth = screenWidth * 3;
const mapRows = Math.floor(mapHeight / cellHeight);
const mapCols = Math.floor(mapWidth / cellWidth);
let screenCells = [];
let mapCells = [];
let mc;
let mc_image_front;
let mc_image_left;
let mc_image_right;
let start;
let goal;
let pf;

import Player from "./Player.js";
import Cell from "./Cell.js";
import generateMaze from "./generateMaze.js";
import PathFinding from "./PathFinding.js";

new p5(function(p5) 
{
    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        

        /*
            use sprite animations instead of switching the pics.
        */

        mc_image_front = await p5.loadImage('./assets/MC_sprite.png');
        mc_image_left = await p5.loadImage('./assets/MC_sprite_left.png');
        mc_image_right = await p5.loadImage('./assets/MC_sprite_right.png');
        mc = new Player(Math.floor(screenCols / 2), Math.floor(screenRows / 2), screenCells,0,0,cellHeight,cellWidth,screenRows,screenCols,mapRows,mapCols,mapCells, mc_image_front, mc_image_left, mc_image_right);
        for(var i = 0; i < screenCols; i++) {
            screenCells[i] = [];
            for(var j = 0; j < screenRows; j++) {
                screenCells[i][j] = new Cell(i * cellWidth, j * cellHeight,1,true,-1,-1, false,false,false,false,1);
            }
        }
        
        for(var i = 0; i < mapCols; i++) {
            mapCells[i] = [];
            for(var j = 0; j < mapRows; j++) {
                mapCells[i][j] = new Cell(0,0,2,false,i,j,false,false,false,false,0);
            }
        }  
        
        var gm = new generateMaze(0,0,mapCells,mc.x,mc.y,mapRows,mapCols);
        gm.generateMaze(p5);
        
        goal = mapCells[mapCols - 1][mapRows - 1];
        pf = new PathFinding(mapCells,goal,mapRows,mapCols);
        
        console.log(mc.x + " " + mc.y);
        console.log("map info: " + mapCols + " " + mapRows);
    }
    
    p5.draw = function() {
        p5.background(0);
        for(var i = 0; i < mapCols; i++) {
            for(var j = 0; j < mapRows; j++) {
                mapCells[i][j].render = false;
            }
        }

        var ans = pf.findPath(mapCells[mc.cameraX + mc.x][mc.cameraY + mc.y]);
        let path = ans.correctPath;

        for(var i = 0; i < mapCols; i++) {
            for(var j = 0; j < mapRows; j++) {
                if(path[i][j]) mapCells[i][j].color = 3;
                if(mapCells[i][j] === goal) mapCells[i][j].color = 4;
            }
        }


        // initialize every mapcell and every screencell but render only ones in range.     
        
        for(var i = mc.cameraX; i < mc.cameraX + screenCols; i++) {
            for(var j = mc.cameraY; j < mc.cameraY + screenRows; j++) { 
                mapCells[i][j].x = screenCells[i - mc.cameraX][j - mc.cameraY].x; 
                mapCells[i][j].y = screenCells[i - mc.cameraX][j - mc.cameraY].y;
                screenCells[i - mc.cameraX][j - mc.cameraY].left = mapCells[i][j].left;
                screenCells[i - mc.cameraX][j - mc.cameraY].up = mapCells[i][j].up;
                screenCells[i - mc.cameraX][j - mc.cameraY].right = mapCells[i][j].right;
                screenCells[i - mc.cameraX][j - mc.cameraY].down = mapCells[i][j].down;
                if(mapCells[i][j] === goal || (mc.toggle && mapCells[i][j].color === 3)) {
                    mapCells[i][j].render = true;
                    mapCells[i][j].show(p5);
                }
            }
        }

        // fog feature
         
        for(var i = mc.x - 5; i < mc.x + 5; i++) {
            for(var j = mc.y - 3; j < mc.y + 3; j++) {
                if(i >= 0 && i < screenCols && j >= 0 && j < screenRows) {
                    screenCells[i][j].render = true;
                    screenCells[i][j].show(p5);
                } else continue;
            }
        }

        for(var i = 0; i < mapCols; i++) {
            for(var j = 0; j < mapRows; j++) {
                if(mapCells[i][j] === goal) mapCells[i][j].color = 4;
                else mapCells[i][j].color = 1;
            }
        }

        
        mc.movePlayer(p5);
        mc.show(p5);
        mc.togglePath(p5);
    }
 })
 