
const cellHeight = 50;
const cellWidth = 50;

export default class Cell {
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

    show(p5) {
        if(this.render) {
            if(this.color === 3) {
                p5.fill(0,150,0);
                p5.rect(this.x + 10, this.y + 10, cellWidth - 20, cellHeight - 20);
            } else if(this.color === 4)  {
                p5.fill(150,0,0);
                p5.rect(this.x + 10, this.y + 10, cellWidth - 20, cellHeight - 20);
            }

            p5.stroke(255);
            p5.strokeWeight(0.2);
            if(!this.left) p5.line(this.x,this.y,this.x,this.y + cellHeight);
            if(!this.up) p5.line(this.x,this.y,this.x + cellWidth,this.y);
            if(!this.right) p5.line(this.x + cellWidth, this.y, this.x + cellWidth, this.y + cellHeight);
            if(!this.down) p5.line(this.x,this.y + cellHeight,this.x + cellWidth,this.y + cellHeight);
        }
    }
}