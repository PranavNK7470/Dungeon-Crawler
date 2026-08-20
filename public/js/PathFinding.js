export default class PathFinding {
    constructor(mapCells, goal, mapRows, mapCols) {
        this.mapCells = mapCells;
        this.goal = goal;
        this.mapRows = mapRows;
        this.mapCols = mapCols;
    }

    findNeighbours(x, y) {
        var neighbours = [];
        if(x !== 0 && this.mapCells[x][y].left) neighbours.push([x - 1, y]);
        if(y !== 0 && this.mapCells[x][y].up) neighbours.push([x, y - 1]);
        if(x !== this.mapCols - 1 && this.mapCells[x][y].right) neighbours.push([x + 1, y]);
        if(y !== this.mapRows - 1 && this.mapCells[x][y].down) neighbours.push([x, y + 1]);
        return neighbours;
    }

    findPath(start) {
        let wasHere = Array.from({length: this.mapCols}, () => Array(this.mapRows).fill(false));
        let correctPath = Array.from({length: this.mapCols}, () => Array(this.mapRows).fill(false));
        let cameFrom = {};
        let key = (x, y) => x + ',' + y;

        let stack = [[start.indx, start.indy]];
        wasHere[start.indx][start.indy] = true;
        let found = false;

        while (stack.length !== 0) {
            let [cx, cy] = stack.pop();

            if (cx === this.goal.indx && cy === this.goal.indy) {
                found = true;
                break;
            }

            for (let [nx, ny] of this.findNeighbours(cx, cy)) {
                if (!wasHere[nx][ny]) {
                    wasHere[nx][ny] = true;
                    cameFrom[key(nx, ny)] = [cx, cy];
                    stack.push([nx, ny]);
                }
            }
        }

        if (found) {
            let cx = this.goal.indx, cy = this.goal.indy;
            correctPath[cx][cy] = true;
            while (!(cx === start.indx && cy === start.indy)) {
                [cx, cy] = cameFrom[key(cx, cy)];
                correctPath[cx][cy] = true;
            }
        }

        return { pathExists: found, correctPath: correctPath };
    }
}
