import { Grade } from "./classes/Grade.js";
import { Subject } from "./classes/Subject.js";
import { subjects } from "./enums/SubjectEnum.js";

function getSubjectArea(name) {
  let subjectArea = 0;
  for (let area in subjects.bySubjectArea) {
    if (!subjects.bySubjectArea[area].includes(name.toLowerCase()) || subjectArea !== 0) continue;
    const a = area.toLowerCase();
    if (a.includes('one')) {
      subjectArea = 1;
    } else if (a.includes('two')) {
      subjectArea = 2;
    } else if (a.includes('three')) {
      subjectArea = 3;
    } else if (a.includes('no')) {
      subjectArea = 4;
    }
  }
  return subjectArea;
}

function buildCollection() {
  let grades = {};
  const gradeRows = document.querySelector('tbody#table-body-content').getElementsByTagName('tr');
  for (let row of gradeRows) {
    const subjectName = row.querySelector('select.subject-dropdown').value;
    const label = row.dataset.label;
    const isIntensiveCourse = label.includes('lk');
    const isCompulsory = label.includes('1') || label.includes('2') || ['deutsch', 'mathematik'].includes(subjectName);

    let gradePoints = [...row.querySelectorAll('select.grade-dropdown')]
      .map(function (select, i) { 
        return new Grade(
          isNaN(select.value) ? 0 : Number(select.value),
          row.querySelector(`input[name=${label}-${i}]`).checked
        );
      }
    );

    grades[label] = new Subject(
      gradePoints,
      subjectName,
      getSubjectArea(subjectName),
      isIntensiveCourse,
      isCompulsory
    );
  }

  return grades;
}

/**
 * Extracts entered grades in a-level form
 * @return {[object]}      Object with five key-value pairs; value is a maximum of two numbers
 *                         (first is the written grade; second is the oral grade, if available)
 */
function buildResults() {
  let results = {};
  const resultRows = document.querySelector('tbody#results-form-content').getElementsByTagName('tr');
  for (let row of resultRows) {
    const label = row.dataset.label;
    const writtenGrade = row.querySelector('td.written-exam select.grade-dropdown');
    const oralGrade = row.querySelector('td.oral-exam select.grade-dropdown');

    results[label] = [
      writtenGrade !== null && !isNaN(writtenGrade.value) ? Number(writtenGrade.value) : undefined,
      oralGrade !== null && !isNaN(oralGrade.value) ? Number(oralGrade.value) : undefined,
    ];
  }

  return results;
}

export {
  buildCollection,
  buildResults,
}
