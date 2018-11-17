class Drop {
    position: p5.Vector;
    radius: number;
    size: number;

    constructor(p: p5, pos: p5.Vector, radius: number, size: number) {
        this.position = pos;
        this.size = size;
        this.radius = radius;
        p.noStroke();
    }

    update(p: p5, dropRadius: number, dropSize: number) {
        this.size = dropSize;
        this.radius = dropRadius;
        this.position.x = this.calculateXPosition(p, this.position.x);
        this.position.y = this.calculateYPosition(p, this.position.y);

        p.push();
        p.translate(this.position.x, this.position.y);
        let scale = p.random(0, this.size);
        p.scale(scale);
        p.ellipse(0, 0, 1, 1);
        p.pop();
    }

    calculateXPosition(p: p5, currentXPosition: number): number {
        currentXPosition += p.random(-this.radius, this.radius);
        if (currentXPosition >= p.width) {
            return currentXPosition - p.width;
        }
        if (currentXPosition <= 0) {
            return currentXPosition + p.width;
        }
        return currentXPosition;
    }

    calculateYPosition(p: p5, currentYPosition: number): number {
        currentYPosition += p.random(-this.radius, this.radius);
        if (currentYPosition >= p.height) {
            return currentYPosition - p.height;
        }
        if (currentYPosition <= 0) {
            return currentYPosition + p.height;
        }
        return currentYPosition;
    }
}