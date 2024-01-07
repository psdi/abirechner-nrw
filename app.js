import { buildCollection } from "./factory.js";

function check_for_unattended_courses(grades) {
  return Object.keys(grades).reduce((r, k) => {
    return r.concat(grades[k]);
  }, []).includes(0);
}

function check_if_subjects_passed(grades, nr_of_courses) {
  let deficits = 0;
  let intensive_course_deficits = 0;

  for (let subject in grades) {
    grades[subject].forEach((e) => {
      if (e < 5) {
        deficits++;

        if (subject.includes('lk')) {
          intensive_course_deficits++;
        }
      }
    });
  }

  return intensive_course_deficits <= 3 && 
    (
      (nr_of_courses >= 28 && nr_of_courses <= 32 && deficits <= 6) ||
      (nr_of_courses >= 33 && nr_of_courses <= 34 && deficits <= 7)
    );
}

function get_highest_grade(grades, accredited_courses) {
  let highest_grade = 0;
  let grade_subject, grade_index;

  for (let subject in grades) {
    if (subject.includes('1') || subject.includes('2')) continue;

    accredited_courses[subject].forEach((e, i) => {
      if (!e && grades[subject][i] > highest_grade) {
        highest_grade = grades[subject][i];
        grade_subject = subject;
        grade_index = i;
      }
    })
  }

  accredited_courses[grade_subject][grade_index] = 1;
  return [highest_grade, accredited_courses];
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

  const firstResult = Math.round((points / weightedNrOfCourses) * 40);
}

document.querySelector('#form-button').addEventListener('click', calculate);
