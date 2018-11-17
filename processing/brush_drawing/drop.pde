class Drop {
  PShape myDrop;
  PVector position;
  float radius;
  int size;
  long originalSeed;
 
  Drop(PVector p, float r, int s ) {
    position = p;
    size = s;
    radius = r;
    noStroke();

  }
  
  void update (float dropRadius, int dropSize) {
    size = dropSize;
    radius = dropRadius;
    pushMatrix();
    position.x = calculateXPosition(position.x);
    position.y = calculateYPosition(position.y);
    translate(position.x, position.y);
    scale(random(0,size));
    ellipse(0,0,5,5);
    popMatrix();  
  }
  
  float calculateXPosition(float currentXPosition) {
    currentXPosition += random(-radius, radius);     
    if (currentXPosition >= width) {
      return currentXPosition - width;
    }
    if (currentXPosition <= 0) {
      return currentXPosition + width;
    }
    return currentXPosition;
  }
  
  float calculateYPosition(float currentYPosition) {
    currentYPosition += random(-radius, radius);     
    if (currentYPosition >= height) {
      return currentYPosition - height;
    }
    if (currentYPosition <= 0) {
      return currentYPosition + height;
    }
    return currentYPosition;
  }   
}
