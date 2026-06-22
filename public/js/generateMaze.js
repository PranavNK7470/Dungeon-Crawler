const cellHeight = 50;
const cellWidth = 50;
const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;
const mapHeight = screenHeight * 5;
const mapWidth = screenWidth * 5;
const mapRows = Math.floor(mapHeight / cellHeight);
const mapCols = Math.floor(mapWidth / cellWidth);
const visited = new Set();
const stack = [];

export default class generateMaze {
    constructor(indx, indy, mapCells, initx, inity) {
        this.indx = indx;
        this.indy = indy;
        this.mapCells = mapCells;
        this.initx = initx;
        this.inity = inity;
        for(var i = this.initx - 1; i <= this.initx + 1; i++) {
            for(var j = this.inity - 1; j <= this.inity + 1; j++) {
                visited.add(this.mapCells[i][j]);
            }
        } 
    }

    generateMaze(p5) {
        visited.add(this.mapCells[this.indx][this.indy]);
        stack.push(this.mapCells[this.indx][this.indy]);

        while(stack.length !== 0) {
            let current = stack.pop();
            let neighbours = this.findNeighbours(current.indx, current.indy);
            if(neighbours.length !== 0) {
                stack.push(current);
                let chosen = neighbours[Math.floor(p5.random(neighbours.length))];
                this.removeWalls(current.indx, current.indy, chosen.indx, chosen.indy);
                visited.add(chosen);
                stack.push(chosen);
            }
        }
    }

    removeWalls(currx, curry, chosenx, choseny) {
        if(currx < chosenx && curry === choseny) {
            //right
            this.mapCells[currx][curry].right = false;
            this.mapCells[chosenx][choseny].left = false;
        } else if(currx > chosenx && curry === choseny) {
            //left
            this.mapCells[currx][curry].left = false;
            this.mapCells[chosenx][choseny].right = false;
        } else if(currx === chosenx && curry < choseny) {
            //down
            this.mapCells[currx][curry].down = false;
            this.mapCells[chosenx][choseny].up = false;
        } else if(currx === chosenx && curry > choseny) {
            //up
            this.mapCells[currx][curry].up = false;
            this.mapCells[chosenx][choseny].down = false;
        }
    }

    findNeighbours(x, y) {
        var neighbours = [];
        if(x !== 0 && !visited.has(this.mapCells[x - 1][y])) neighbours.push(this.mapCells[x - 1][y]);
        if(y !== 0 && !visited.has(this.mapCells[x][y - 1])) neighbours.push(this.mapCells[x][y - 1]);
        if(x !== mapCols - 1 && !visited.has(this.mapCells[x + 1][y])) neighbours.push(this.mapCells[x + 1][y]);
        if(y !== mapRows - 1 && !visited.has(this.mapCells[x][y + 1])) neighbours.push(this.mapCells[x][y + 1]);

        return neighbours;
    }
}