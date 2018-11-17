var BrushTip = (function () {
    function BrushTip(p, dropsCount, dropsRadius, dropSize) {
        this.drops = [];
        this.position = p.createVector(p.mouseX, p.mouseY);
        for (var i = 0; i < dropsCount; i++) {
            this.drops.push(new Drop(p, this.position, dropsRadius, dropSize));
        }
    }
    BrushTip.prototype.setPosition = function (x, y) {
        this.position.x = x;
        this.position.y = y;
    };
    BrushTip.prototype.update = function (p, dropRadius, dropSize) {
        this.drops.forEach(function (drop) { return drop.update(p, dropRadius, dropSize); });
    };
    return BrushTip;
}());
var Drop = (function () {
    function Drop(p, pos, radius, size) {
        this.position = pos;
        this.size = size;
        this.radius = radius;
        p.noStroke();
    }
    Drop.prototype.update = function (p, dropRadius, dropSize) {
        this.size = dropSize;
        this.radius = dropRadius;
        this.position.x = this.calculateXPosition(p, this.position.x);
        this.position.y = this.calculateYPosition(p, this.position.y);
        p.push();
        p.translate(this.position.x, this.position.y);
        var scale = p.random(0, this.size);
        p.scale(scale);
        p.ellipse(0, 0, 1, 1);
        p.pop();
    };
    Drop.prototype.calculateXPosition = function (p, currentXPosition) {
        currentXPosition += p.random(-this.radius, this.radius);
        if (currentXPosition >= p.width) {
            return currentXPosition - p.width;
        }
        if (currentXPosition <= 0) {
            return currentXPosition + p.width;
        }
        return currentXPosition;
    };
    Drop.prototype.calculateYPosition = function (p, currentYPosition) {
        currentYPosition += p.random(-this.radius, this.radius);
        if (currentYPosition >= p.height) {
            return currentYPosition - p.height;
        }
        if (currentYPosition <= 0) {
            return currentYPosition + p.height;
        }
        return currentYPosition;
    };
    return Drop;
}());
var Shapes = (function () {
    function Shapes() {
    }
    Shapes.circle = function (p, size) {
        var points = new Array();
        for (var angle = 0; angle < 360; angle += 9) {
            var v = p5.Vector.fromAngle(p.radians(angle - 135));
            v.mult(size);
            points.push(v);
        }
        return points;
    };
    Shapes.square = function (p, size) {
        var points = new Array();
        for (var x = -size; x < size; x += 10) {
            points.push(new p5.Vector(x, -size));
        }
        for (var y = -size; y < size; y += 10) {
            points.push(new p5.Vector(size, y));
        }
        for (var x = size; x > -size; x -= 10) {
            points.push(new p5.Vector(x, size));
        }
        for (var y = size; y > -size; y -= 10) {
            points.push(new p5.Vector(-size, y));
        }
        return points;
    };
    Shapes.star = function (p, x, y, radius1, radius2, npoints) {
        var angle = p.TWO_PI / npoints;
        var halfAngle = angle / 2.0;
        var points = new Array();
        for (var a = 0; a < p.TWO_PI; a += angle) {
            var sx = x + p.cos(a) * radius2;
            var sy = y + p.sin(a) * radius2;
            points.push(new p5.Vector(sx, sy));
            sx = x + p.cos(a + halfAngle) * radius1;
            sy = y + p.sin(a + halfAngle) * radius1;
            points.push(new p5.Vector(sx, sy));
        }
        return points;
    };
    return Shapes;
}());
var sketch = function (p) {
    var brushTips = [];
    var colors = [];
    var currentColorIndex = 0;
    var alpha = 100;
    var radius = 5;
    var size = 2;
    p.preload = function () {
        p.fullscreen();
    };
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB);
        p.background(255);
        var initColor = p.color(p.random(0, 360), p.random(0, 360), p.random(0, 360), 100);
        colors.push(initColor);
        p.fill(initColor);
    };
    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = function () {
        if (brushTips.length > 0) {
            brushTips.forEach(function (brushTip) { return brushTip.update(p, radius, size); });
        }
    };
    p.keyPressed = function () {
        if (p.keyCode === 107) {
            var newBrushTip = new BrushTip(p, p.random(10, 100), radius, size);
            newBrushTip.setPosition(p.mouseX, p.mouseY);
            brushTips.push(newBrushTip);
        }
        if (p.keyCode === 109 && brushTips.length > 0) {
            brushTips.splice(brushTips.length - 1, 1);
        }
        if (p.keyCode === 46) {
            brushTips = [];
        }
        if (p.keyCode === 67) {
            moveColorsRight();
        }
        if (p.keyCode === 88) {
            moveColorsLeft();
        }
        if (p.keyCode === 82) {
            redrawBackground();
        }
        if (p.keyCode === 38) {
            size += 1;
        }
        if (p.keyCode === 40) {
            if (size > 1)
                size -= 1;
        }
        if (p.keyCode === 39) {
            radius += 1;
        }
        if (p.keyCode === 37) {
            if (radius > 1)
                radius -= 1;
        }
        if (p.keyCode === 65) {
            if (alpha < 100) {
                alpha += 5;
                changeAlpha(alpha);
            }
        }
        if (p.keyCode === 81) {
            if (alpha > 0) {
                alpha -= 5;
                changeAlpha(alpha);
            }
        }
    };
    function changeAlpha(alpha) {
        var currentColor = colors[currentColorIndex];
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
//# sourceMappingURL=build.js.map