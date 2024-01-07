import { toTitleCase } from "../helper.js";

export class Subject {
  constructor(grades, name, subjectArea, isIntensiveCourse = false, isCompulsory = false, isHalfCompulsory = false) {
    this.grades = grades;
    this.name = name;
    this.subjectArea = subjectArea;
    this.isIntensiveCourse = isIntensiveCourse; // "Leistungskurs"
    this.isCompulsory = isCompulsory; // "Pflichtfach"
    this.isHalfCompulsory = isHalfCompulsory; // Aufgabenfeld 2, 3, Religion
  }

  getGrades() {
    return this.grades;
  }

  setGrades(grades) {
    this.grades = grades;
  }

  getPointAverage() {
    let coursesTaken = this.grades.slice(0).filter(g => g.getPoints() !== 0);
    return coursesTaken.reduce((total, g) => total + g.getPoints(), 0) / coursesTaken.length;
  }

  getName() {
    return this.name;
  }

  getNameAsTitle() {
    return toTitleCase(this.name);
  }

  setName(name) {
    this.name = name;
  }

  getSubjectArea() {
    return this.subjectArea;
  }

  setSubjectArea(subjectArea) {
    this.subjectArea = subjectArea;
  }

  getIsIntensiveCourse() {
    return this.isIntensiveCourse;
  }

  setIsIntensiveCourse(isIntensiveCourse) {
    this.isIntensiveCourse = isIntensiveCourse;
  }

  getIsCompulsory() {
    return Boolean(this.isCompulsory);
  }

  setIsCompulsory(isCompulsory) {
    this.isCompulsory = isCompulsory;
  }

  getIsHalfCompulsory() {
    return this.isHalfCompulsory;
  }

  setIsHalfCompulsory(isHalfCompulsory) {
    this.isHalfCompulsory = isHalfCompulsory;
  }
}
