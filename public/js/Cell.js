const cellHeight = 50;
const cellWidth = 50;

export default class Cell {
    constructor(x,y,color,render,indx,indy,left,up,right,down,type,wall_block) {
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
        this.type = type;
        this.wall_block = wall_block;
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
            // p5.stroke(255,0,0);
            // p5.strokeWeight(0.2);
            // p5.line(this.x,this.y,this.x,this.y + cellHeight);
            // p5.line(this.x,this.y,this.x + cellWidth,this.y);
            // p5.line(this.x + cellWidth, this.y, this.x + cellWidth, this.y + cellHeight);
            // p5.line(this.x,this.y + cellHeight,this.x + cellWidth,this.y + cellHeight);
            p5.stroke(255);
            if(this.type == 0) {
                // mapCells
                p5.strokeWeight(0);
            } else {
                p5.strokeWeight(0.4);
            }


            if(this.render) {
                const wallThickness = 10; // tune to taste

                if(!this.left) {
                    for(let i = 0; i < 6; i++) p5.image(this.wall_block, this.x - wallThickness / 2, this.y + i * wallThickness - wallThickness / 2, 
                                                         wallThickness, wallThickness);
                }
                if(!this.up) {
                    for(let i = 0; i < 5; i++) p5.image(this.wall_block, this.x + i * wallThickness - wallThickness / 2, this.y - wallThickness / 2 , 
                                                         wallThickness, wallThickness);
                }
                if(!this.right) {
                    for(let i = 0; i < 6; i++) p5.image(this.wall_block, this.x + cellWidth - wallThickness / 2, this.y + i * wallThickness - wallThickness / 2, 
                                                         wallThickness, wallThickness);
                }
                if(!this.down) {
                    for(let i = 0; i < 5; i++) p5.image(this.wall_block, this.x + i * wallThickness - wallThickness / 2, this.y - wallThickness / 2 + cellHeight, 
                                                         wallThickness, wallThickness);
                }
            }
        }
    }
}