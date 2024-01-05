import { Grade } from "./classes/Grade.js";
import { Subject } from "./classes/Subject.js";

function buildCollection() {
  let grades = {};
  const gradeRows = document.querySelector('tbody').getElementsByTagName('tr');
  for (let row of gradeRows) {
    const subjectName = row.querySelector('select.subject-dropdown').value;

    let gradePoints = [...row.querySelectorAll('select.grade-dropdown')]
      .map(select => isNaN(select.value) ? 0 : Number(select.value));
    gradePoints = gradePoints.map((points) => new Grade(points));

    grades[row.dataset.label] = new Subject(gradePoints, subjectName);
  }

  return grades;
}

export {
  buildCollection,
}
