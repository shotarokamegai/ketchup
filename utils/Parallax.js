export default class Parallax {
  constructor(elm, easing, offsetY = 0, offsetX = 0) {
    this.elm = elm;
    this.nextY = 0;
    this.nextX = 0;
    this.curY = 0;
    this.curX = 0;
    this.offsetY = elm.offsetTop + offsetY;
    this.offsetX = elm.offsetLeft + offsetX;
    this.easing = easing;
    this.height = 0;
  }

  setValue(nextY = 0, nextX = 0) {
    this.nextX = nextX;
    this.nextY = nextY;
  }

  move() {
    this.curY += (this.nextY - this.curY) * this.easing;
    this.curX += (this.nextX - this.curX) * this.easing;
    this.elm.setAttribute('style', 'transform: translate3d(' + parseFloat(this.curX) + 'px,' + parseFloat(this.curY) + 'px, 0); height:  ' + (document.documentElement.scrollHeight * 1.5) + 'px');
  }

  map(value, start1, end1, start2, end2) {
    return start2 + (end2 - start2) * ((value - start1) / (end1 - start1));
  }
}