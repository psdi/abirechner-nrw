import { buildCollection } from "./factory.js";

function checkForUnattendedCourses(gc) {
  return Object.values(gc).reduce((r, s) => {
    const gl = s.getIsCompulsory() ? s.getGrades().map((g) => g.getPoints()) : [];
    return r.concat(gl);
  }, []).includes(0);
}

function checkIfSubjectsPassed(gc, nrOfCourses) {
  let deficits = 0;
  let intensiveCourseDeficits = 0;

  for (let subject of Object.values(gc)) {
    subject.getGrades().forEach((g) => {
      if (g.getPoints() < 5) {
        deficits++;

        if (subject.getIsIntensiveCourse()) {
          intensiveCourseDeficits++;
        }
      }
    });
  }

  return intensiveCourseDeficits <= 3 && 
    (
      (nrOfCourses >= 28 && nrOfCourses <= 32 && deficits <= 6) ||
      (nrOfCourses >= 33 && nrOfCourses <= 34 && deficits <= 7)
    );
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

  const hasSatisfactoryGrades = checkIfSubjectsPassed(gradesCollection, nrOfCourses);
  const hasUnattendedCourses = checkForUnattendedCourses(gradesCollection);

  const firstResult = Math.round((points / weightedNrOfCourses) * 40);
}

document.querySelector('#form-button').addEventListener('click', calculate);
