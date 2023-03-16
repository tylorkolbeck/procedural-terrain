function getFuturePosVec(location, velocity) {
  const futurePos = createVector(location.x, location.y);
  futurePos.add(velocity);
  futurePos.sub(location);
  
  return futurePos;
}