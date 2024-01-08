export class Grade {
  constructor(points = 0, isAccreditable = false, isAdditionalCourse = false) {
    this.points = points;
    this.isAccreditable = isAccreditable;
    this.isAdditionalCourse = isAdditionalCourse;
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

  getIsAdditionalCourse() {
    return this.isAdditionalCourse;
  }

  setIsAdditionalCourse(isAdditionalCourse) {
    this.isAdditionalCourse = isAdditionalCourse;
  }
}
