const delay = 50;
let last = 0;
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


export default class Player{
    constructor(x,y,screenCells,cameraX,cameraY){
        this.x = x;
        this.y = y;
        this.screenCells = screenCells;
        this.cameraX = cameraX;
        this.cameraY = cameraY;
    }

    show(p5) {
        p5.fill(255,0,0);
        p5.circle(this.x * cellWidth + cellWidth/2, this.y * cellHeight + cellHeight/2, Math.min(cellHeight,cellWidth) - 5);
    }

    movePlayer(p5) {
        if(p5.millis() - last < delay) {
            return;
        }

        if(p5.keyIsDown(87)) {
            if(this.y > 0 && this.screenCells[this.x][this.y].up) {
                this.y -= 1;
            } else if(this.cameraY != 0 && this.screenCells[this.x][this.y].up){
                this.cameraY -= 1;
                this.y += 1;
            }
        } else if(p5.keyIsDown(65)) {
            if(this.x > 0 && this.screenCells[this.x][this.y].left) {
                this.x -= 1;
            } else if(this.cameraX != 0 && this.screenCells[this.x][this.y].left) {
                this.cameraX -= 1;
                this.x += 1;
            }
        } else if(p5.keyIsDown(83)) {
            if(this.y < screenRows - 1 && this.screenCells[this.x][this.y].down) {
                this.y += 1;
            } else if(this.cameraY < mapRows - screenRows && this.screenCells[this.x][this.y].down) {
                this.cameraY += 1;
                this.y -= 1;
            }
        } else if(p5.keyIsDown(68)) {
            if(this.x < screenCols - 1 && this.screenCells[this.x][this.y].right) {
                this.x += 1;
            } else if(this.cameraX < mapCols - screenCols && this.screenCells[this.x][this.y].right) {
                this.cameraX += 1;
                this.x -= 1;
            }
        }
        last = p5.millis();
    }
}