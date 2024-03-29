import { buildCollection, buildResults } from "./factory.js";
import { emitResults, emitError } from "./emitter.js";

function checkForUnattendedCourses(gc) {
  return Object.values(gc).reduce((r, s) => {
    const gl = s.getIsCompulsory() ? s.getGrades().map((g) => g.getPoints()) : [];
    return r.concat(gl);
  }, []).includes(0);
}

function getNumberOfDeficits(gc) {
  let deficits = 0;
  let intensiveCourseDeficits = 0;

  for (let subject of Object.values(gc)) {
    subject.getGrades().forEach((g) => {
      if (g.getIsAccreditable() && g.getPoints() < 5) {
        deficits++;
        intensiveCourseDeficits += subject.getIsIntensiveCourse() ? 1 : 0;
      }
    })
  }

  return {
    total: deficits,
    intensive: intensiveCourseDeficits,
  };
}

function getHighestGrade(grades) {
  let highestGrade = 0;
  let gradeSubject, gradeIndex;

  for (let label in grades) {
    const subject = grades[label];
    if (subject.getIsCompulsory()) continue;

    subject.getGrades().forEach(function(g, i) {
      if (!g.getIsAccreditable() && !g.getIsAdditionalCourse() && g.getPoints() > highestGrade) {
        highestGrade = g.getPoints();
        gradeSubject = label;
        gradeIndex = i;
      }
    });
  }
  if (gradeSubject) {
    grades[gradeSubject].getGrades()[gradeIndex].setIsAdditionalCourse(true);
  }

  return highestGrade;
}

function calculate(e) {
  e.preventDefault();

  // --- Ergebnis 1 ---
  let gradesCollection = buildCollection();

  let points = 0;
  let nrOfCourses = 0; // 8 (16) LK und mind. 20 und max. 26 GK
  let weightedNrOfCourses = 0; // intensive course grades count double
  for (let subject of Object.values(gradesCollection)) {
    subject.getGrades().forEach(function (g) {
      let p = g.getPoints();
      if (g.getIsAccreditable() && g.getPoints() > 0) {
        points += subject.getIsIntensiveCourse() ? p * 2 : p;
        nrOfCourses++;
        weightedNrOfCourses += subject.getIsIntensiveCourse() ? 2 : 1;
      }
    });
  }

  while (nrOfCourses < 34) {
    let tempAverage = points / weightedNrOfCourses;
    let addtlPoints = getHighestGrade(gradesCollection);
  
    if (addtlPoints > tempAverage) {
      points += addtlPoints;
      nrOfCourses++;
      weightedNrOfCourses++;
    } else {
      break;
    }
  }

  const deficits = getNumberOfDeficits(gradesCollection);
  const hasSatisfactoryGrades = deficits.intensive <= 3 && 
    (
      (nrOfCourses >= 28 && nrOfCourses <= 32 && deficits.total <= 6) ||
      (nrOfCourses >= 33 && nrOfCourses <= 34 && deficits.total <= 7)
    );
  const hasUnattendedCourses = checkForUnattendedCourses(gradesCollection);

  const firstResult = Math.round((points / weightedNrOfCourses) * 40);

  // --- Ergebnis 2 ---
  let results = buildResults();
  const multiplicator = results.hasOwnProperty('ab5') && results['ab5'][1] !== undefined ? 4 : 5;
  let groupTwoPoints = 0;
  for (const label in results) {
    const exams = results[label];
    let examPoints = 0;

    if (exams[0] !== undefined && exams[1] !== undefined) {
      examPoints = (exams[0] * 2 + exams[1]) / 3;
    } else if (exams[0] !== undefined) {
      examPoints = exams[0];
    } else if (exams[1] !== undefined) {
      examPoints = exams[1];
    }

    groupTwoPoints += examPoints;
  }

  const secondResult = Math.round(groupTwoPoints * multiplicator);
  const grade = (17 / 3) - ((firstResult + secondResult) / 180);
  emitResults(firstResult, nrOfCourses, secondResult, grade, deficits.total);
}

document.querySelector('#form-button').addEventListener('click', calculate);
