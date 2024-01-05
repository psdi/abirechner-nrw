export class Grade {
  constructor(points = 0, isAccreditable = false) {
    this.points = points;
    this.isAccreditable = isAccreditable;
  }

  getPoints() {
    return this.points;
  }

  setPoints(points) {
    this.points = points;
  }

  getIsAccreditable() {
    return this.isAccreditable;
  }

  setIsAccreditable(isAccreditable) {
    this.isAccreditable = isAccreditable;
  }
}
