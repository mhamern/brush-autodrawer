var sketch = (p: p5) => {

    let brushTips: BrushTip[] = [];
    let colors: p5.Color[] = [];
    let currentColorIndex = 0;
    let alpha = 100;
    let radius = 5;
    let size = 2;

    p.preload = () => {
        p.fullscreen();
    };
    
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB);
        p.background(255);
        let initColor = p.color(p.random(0, 360), p.random(0, 360), p.random(0, 360), 100);
        colors.push(initColor);
        p.fill(initColor);
    };
    
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    
    p.draw = () => {
        if (brushTips.length > 0) {
            brushTips.forEach(brushTip => brushTip.update(p, radius, size));
        }
    };

    p.keyPressed = () => {
        // +
        if (p.keyCode === 107) {
            let newBrushTip = new BrushTip(p, p.random(10, 100), radius, size);
            newBrushTip.setPosition(p.mouseX, p.mouseY);
            brushTips.push(newBrushTip);
        }
        // -
        if (p.keyCode === 109 && brushTips.length > 0) {
            brushTips.splice(brushTips.length - 1, 1);
        }
        // DELETE KEY
        if (p.keyCode === 46) {
            brushTips = [];
        }
        // C KEY
        if (p.keyCode === 67) {
            moveColorsRight();
        }
        // X KEY
        if (p.keyCode === 88) {
            moveColorsLeft();
        }
        // R KEY
        if (p.keyCode === 82) {
            redrawBackground();
        }
        // UP
        if (p.keyCode === 38) {
            size += 1;
        }
        // DOWN
        if (p.keyCode === 40) {
            if (size > 1) size -= 1;
        }
        // RIGHT
        if (p.keyCode === 39) {
            radius += 1;
        }
        // LEFT
        if (p.keyCode === 37) {
            if (radius > 1) radius -= 1;
        }
        // A KEY
        if (p.keyCode === 65) {
            if (alpha < 100) {
                alpha += 5;
                changeAlpha(alpha);
            }
        }
        // Q KEY
        if (p.keyCode === 81) {
            if (alpha > 0) {
                alpha -= 5;
                changeAlpha(alpha);
            }
        }
    };

    function changeAlpha(alpha: number) {
        let currentColor = colors[currentColorIndex];
        currentColor.setAlpha(alpha);
        p.fill(currentColor);
    }

    function addNewColor() {
        colors.push(p.color(p.random(0, 360), p.random(0, 360), p.random(0, 360), alpha));
    }

    function setFill() {
        p.fill(colors[currentColorIndex]);
    }

    function moveColorsRight() {
        currentColorIndex++;
        if (currentColorIndex >= colors.length) {
            addNewColor();
        }
        setFill();
    }

    function moveColorsLeft() {
        currentColorIndex--;
        if (currentColorIndex < 0) {
            currentColorIndex = 0;
        }
        setFill();
    }

    function redrawBackground() {
        p.background(255);
    }
};

var sketchP = new p5(sketch);