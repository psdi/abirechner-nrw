function collect_grades() {
  return {
    lk1: [],
    lk2: [],
    ab3: [],
    ab4: [],
    gk1: [],
    gk2: [],
    gk3: [],
    gk4: [],
    gk5: [],
  };
}

function select_accredited_courses() {
  return {
    lk1: [],
    lk2: [],
    ab3: [],
    ab4: [],
    gk1: [],
    gk2: [],
    gk3: [],
    gk4: [],
    gk5: [],
  };
}

function map_subject_labels() {
  return {};
}

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
    if (!subject.includes('gk')) continue;

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

  let grades = collect_grades();
  // todo: identify "Pflichtkurse"
  // todo: check if there are "0" grades in the "Pflichtkurse"
  console.log(check_for_unattended_courses(grades));

  let accredited_courses = select_accredited_courses();

  let points = 0;
  let nr_of_courses = 0; // 8 (16) LK und mind. 20 und max. 26 GK
  for (let subject in accredited_courses) {
    accredited_courses[subject].forEach((e, i) => {
      if (e && grades.hasOwnProperty(subject) && grades[subject][i] > 0) {
        let weighted_points = grades[subject][i];
        points += subject.includes('lk') ? weighted_points * 2 : weighted_points;
        nr_of_courses++;
      }
    });
  }

  // intensive course grades count double
  let weighted_nr_of_courses = nr_of_courses + 8;

  while (nr_of_courses < 34) {
    let addtl_points;
    let temp_average = points / weighted_nr_of_courses;
    [addtl_points, accredited_courses] = get_highest_grade(grades, accredited_courses);

    if (addtl_points > temp_average) {
      points += addtl_points;
      nr_of_courses++;
      weighted_nr_of_courses++;
    } else {
      break;
    }
  }

  // deutsch, mathematik, fremdsprache (falls noch keine LKs)
  // aufgabenfeld 2 (gesellschaftlich) mind. 2 aufeinanderfolgende semester oder religion
  // aufgabenfeld 3 (naturwissenschaftlich) mind. 2 aufeinanderfolgende semester
  // +4, +4, +4

  check_if_subjects_passed(grades, nr_of_courses);
  let result_one = Math.round((points / weighted_nr_of_courses) * 40);
}

document.querySelector('#form-button').addEventListener('click', calculate);
