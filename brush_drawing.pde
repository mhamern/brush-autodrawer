ArrayList<BrushTip> brushTips;
ArrayList<Color> colors;
int currentColorIndex = 0;
int alpha = 100;
String timestamp;

float radius;
int size;

void settings() {
  fullScreen();
}

void setup() {
  radius = 5;
  size = 2;
  timestamp = year() + nf(month(), 2) + nf(day(), 2) + "-"  + nf(hour(), 2) + nf(minute(), 2) + nf(second(), 2);
  brushTips = new ArrayList();
  colors = new ArrayList();
  colorMode(HSB);
  Color initColor = new Color(random(0, 360), random(0, 360), random(0, 360), alpha);
  colors.add(initColor);
  fill(initColor.h, initColor.s, initColor.v, initColor.a);
  background(255);
}


void draw() {
  if (brushTips.size() > 0) {
     for(BrushTip brushTip : brushTips) {
       brushTip.update(radius, size);
     }
  }
}

void mouseClicked() {
  if (mouseButton == LEFT) {
    BrushTip newBrushTip = new BrushTip(int(random(10, 100)), radius, size);
    newBrushTip.setPosition(mouseX, mouseY);
    brushTips.add(newBrushTip);
  }
  if (mouseButton == RIGHT && brushTips.size() > 0) {
    brushTips.remove(brushTips.size() - 1);
  }
}

void keyPressed() {
  if (key == 's' || key == 'S') {
    saveFrame("IMG-" + timestamp + "-####.png");
  }
  if (keyCode == DELETE) {
    brushTips = new ArrayList();
  }
  if (keyCode == 'C' || keyCode == 'c') {
    moveColoursRight();
  }
  if (keyCode == 'X' || keyCode == 'x') {
    moveColoursLeft();
  }
  if (keyCode == 'R' || keyCode == 'r') {
    redrawBackground();
  }
  if (keyCode == UP) {
    size += 1;
  }
  if (keyCode == DOWN) {
    if (size > 1) size -= 1;
  }
  if (keyCode == RIGHT) {
    radius += 1;
  }
  if (keyCode == LEFT) {
    if (radius > 1) radius -= 1;
  }
  if (keyCode == 'A' || keyCode == 'a') {
    if (alpha < 100) {
      alpha += 5;
      changeAlpha(alpha);
    };  
  }
  if (keyCode == 'Q' || keyCode == 'q') {
    if (alpha > 0) {
      alpha -= 5;
      changeAlpha(alpha);
    };
  }
}

void addNewColor() {
    Color newColor = new Color(random(0, 360), random(0, 360), random(0, 360), alpha);
    colors.add(newColor);
}

void setFill() {
  Color currentColor = colors.get(currentColorIndex);
  fill(currentColor.h, currentColor.s, currentColor.v, currentColor.a);
}

void changeAlpha(int alpha) {
  Color currentColor = colors.get(currentColorIndex);
  fill(currentColor.h, currentColor.s, currentColor.v, alpha);
}

void moveColoursRight() {
   currentColorIndex+= 1;
  if (currentColorIndex >= colors.size()) {
    addNewColor();
  }
  setFill();
}

void moveColoursLeft() {
  currentColorIndex -= 1;
  if (currentColorIndex < 0) {
    currentColorIndex = 0;
  }
  setFill();
}

void redrawBackground() {
  background(255);
}
