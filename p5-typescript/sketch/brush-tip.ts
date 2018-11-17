class BrushTip {
    drops: Drop[] = [];
    position: p5.Vector;

    constructor(p: p5, dropsCount: number, dropsRadius: number, dropSize: number) {
        this.position = p.createVector(p.mouseX, p.mouseY);
        for (let i = 0; i < dropsCount; i++) {
            this.drops.push(new Drop(p, this.position, dropsRadius, dropSize));
        }
    }

    setPosition(x: number, y: number) {
        this.position.x = x;
        this.position.y = y;
    }

    update(p: p5, dropRadius: number, dropSize: number) {
        this.drops.forEach(drop => drop.update(p, dropRadius, dropSize));
    }
}