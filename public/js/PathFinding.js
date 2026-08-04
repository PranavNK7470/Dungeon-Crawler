export default class PathFinding {
    constructor(mapCells, goal, mapRows, mapCols) {
        this.mapCells = mapCells;
        this.goal = goal;
        this.mapRows = mapRows;
        this.mapCols = mapCols;
        this.wasHere = Array.from({length: this.mapCols},() => Array(this.mapRows).fill(false));
        this.correctPath = Array.from({length: this.mapCols},() => Array(this.mapRows).fill(false));
    }

    findNeighbours(x, y) {
        var neighbours = [];
        if(x !== 0 && this.mapCells[x][y].left) {
            neighbours.push(0);
        } else neighbours.push(-1);
        if(y !== 0 && this.mapCells[x][y].up) {
            neighbours.push(1);
        }else neighbours.push(-1);
        if(x !== this.mapCols - 1 && this.mapCells[x][y].right) {
            neighbours.push(2);
        }else neighbours.push(-1);
        if(y !== this.mapRows - 1 && this.mapCells[x][y].down) {
            neighbours.push(3);
        }else neighbours.push(-1);

        return neighbours;
    }

    findPath(start) {        
        var b = this.recursiveSolve(start.indx, start.indy);

        return {pathExists : b, correctPath : this.correctPath};
    }

    recursiveSolve(cellx, celly) {
        //console.log("visiting: " + cellx +"  "+ celly);

        if(cellx === this.goal.indx && celly === this.goal.indy) {
            //console.log("FOUND!!");
            return true;
        }

        if(this.wasHere[cellx][celly] === true) return false;
        this.wasHere[cellx][celly] = true;

        let neighbours = this.findNeighbours(cellx, celly);

            if(neighbours[0] === 0) {
                if(this.recursiveSolve(cellx - 1, celly)) {
                    this.correctPath[cellx][celly] = true;
                    return true;
                }
            }
            if(neighbours[1] === 1) {
                if(this.recursiveSolve(cellx, celly - 1)) {
                    this.correctPath[cellx][celly] = true;
                    return true;
                }
            }
            if(neighbours[2] === 2){
                if(this.recursiveSolve(cellx + 1, celly)) {
                    this.correctPath[cellx][celly] = true;
                    return true;
                }
            }
            if(neighbours[3] === 3) {
                if(this.recursiveSolve(cellx, celly + 1)) {
                    this.correctPath[cellx][celly] = true;
                    return true;
                }
            }

        return false;
    }
}   
