export default class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    push(item, pri) {
        try {
            if(typeof(pri) !== "number") throw "Invalid Priority!";
            if(this.queue.length === 0) {
                this.queue[0] = {first : item, second : pri};
            } else {
                this.queue.push({first : item, second : pri});
                this.queue.sort((a,b) => {b.second - a.second});
            }
        } catch(err) {
            console.log("Error : " + err);
        }
    }

    pop() {
        try {
            if(this.queue.size === 0) throw "Empty Queue!";
            var ret = this.queue.pop();
            return ret.first; 
        } catch(err) {
            console.log("Error : " + err);
        }
    }

    size() {
        return this.queue.size();
    }

    isEmpty() {
        return this.queue.isEmpty();
    }
}