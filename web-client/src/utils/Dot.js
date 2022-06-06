class Dot {
  constructor(x, y, hovered=false, neighbors) {
    this.x = x;
    this.y = y;
    this.hovered = hovered;
    this.neighbors = neighbors;
  }
}

export default Dot;