import { toTitleCase } from "../helper.js";

export class Subject {
  constructor(grades, name, isCompulsory = false, isHalfCompulsory = false) {
    this.grades = grades;
    this.name = name.toLowerCase(); // for consistency
    this.isCompulsory = isCompulsory; // "Pflichtfach"
    this.isHalfCompulsory = isHalfCompulsory; // Aufgabenfeld 2, 3, Religion
  }

  get grades() {
    return this.grades;
  }

  set grades(grades) {
    this.grades = grades;
  }

  get name() {
    return toTitleCase(this.name);
  }

  set name(name) {
    this.name = name;
  }

  get isCompulsory() {
    return Boolean(this.isCompulsory);
  }

  set isCompulsory(isCompulsory) {
    this.isCompulsory = isCompulsory;
  }

  get isHalfCompulsory() {
    return this.isHalfCompulsory;
  }

  set isHalfCompulsory(isHalfCompulsory) {
    this.isHalfCompulsory = isHalfCompulsory;
  }
}
