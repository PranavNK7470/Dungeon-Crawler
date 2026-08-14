const delay = 50;
let last = 0;
let lastPath = 99999;
let recordCount = 0;
let toggleCount = 0;
let image_x_offset = 10;
let image_y_offset = 17;
const togglePathTime = 3000;
export default class Player{
    constructor(x,y,screenCells,cameraX,cameraY,cellHeight,cellWidth,screenRows, screenCols,mapRows,mapCols,mapCells, mc_image_front, mc_image_left, mc_image_right){
        this.x = x;
        this.y = y;
        this.screenCells = screenCells;
        this.cameraX = cameraX;
        this.cameraY = cameraY;
        this.cellHeight = cellHeight;
        this.cellWidth = cellWidth;
        this.screenRows = screenRows;
        this.screenCols = screenCols;
        this.mapRows = mapRows;
        this.mapCols = mapCols;
        this.mapCells = mapCells;
        this.toggle = false;
        this.mc_image_front = mc_image_front;
        this.mc_image_left = mc_image_left;
        this.mc_image_right = mc_image_right; 
        this.curr_image = mc_image_front;
    }

    show(p5) {
        p5.fill(255,0,0);
        p5.image(this.curr_image, this.x * this.cellWidth + image_x_offset, this.y * this.cellHeight + image_y_offset);   
        // p5.circle(this.x * this.cellWidth + this.cellWidth/2, this.y * this.cellHeight + this.cellHeight/2, Math.min(this.cellHeight,this.cellWidth) - 5);
    }

    movePlayer(p5) {
        if(p5.millis() - last < delay) {
            return;
        }

        if(p5.keyIsDown(87)) {
            this.curr_image = this.mc_image_front;
            if(this.y > 0 && this.screenCells[this.x][this.y].up) {
                this.y -= 1;
            } else if(this.cameraY != 0 && this.screenCells[this.x][this.y].up){
                this.cameraY -= 1;
                this.y += 1;
            }
        } else if(p5.keyIsDown(65)) {
            this.curr_image = this.mc_image_right;
            if(this.x > 0 && this.screenCells[this.x][this.y].left) {
                this.x -= 1;
            } else if(this.cameraX != 0 && this.screenCells[this.x][this.y].left) {
                this.cameraX -= 1;
                this.x += 1;
            }
        } else if(p5.keyIsDown(83)) {
            this.curr_image = this.mc_image_front;
            if(this.y < this.screenRows - 1 && this.screenCells[this.x][this.y].down) {
                this.y += 1;
            } else if(this.cameraY < this.mapRows - this.screenRows && this.screenCells[this.x][this.y].down) {
                this.cameraY += 1;
                this.y -= 1;
            }
        } else if(p5.keyIsDown(68)) {
            this.acurr_image = this.mc_image_left;
            if(this.x < this.screenCols - 1 && this.screenCells[this.x][this.y].right) {
                this.x += 1;
            } else if(this.cameraX < this.mapCols - this.screenCols && this.screenCells[this.x][this.y].right) {
                this.cameraX += 1;
                this.x -= 1;
            }
        }
        last = p5.millis();
    }

    togglePath(p5) {
        if(p5.keyIsDown(69) || ((p5.millis() - lastPath) <= togglePathTime && recordCount > 0) && toggleCount >= 0) {
            recordCount++;
            if(recordCount <= 1) lastPath = p5.millis();

            toggleCount++;
            this.toggle = true;
        } else {
            this.toggle = false;
            recordCount = 0;
        }    
    }
}