class BrushTip {
  ArrayList<Drop> drops;
  PVector position;
  
  BrushTip(int dropsCount, float dropsRadius, int dropSize) {
    position = new PVector(mouseX, mouseY);
    drops = new ArrayList<Drop>();
    for (int i = 0; i < dropsCount; i++) {
      Drop drop = new Drop(position, dropsRadius, dropSize);
      drops.add(drop);
    } 
  }
  
  void setPosition(float x, float y) {
    position.x = x;
    position.y = y;
  }
  
  void update(float dropsRadius, int dropSize) {
    for (Drop drop : drops) {
      drop.update(dropsRadius, dropSize);
    }
  }
}
