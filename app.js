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

function calculate(e) {
  e.preventDefault();

  let grades = collect_grades();
  // todo: check if there are "0" grades

  let accredited_courses = select_accredited_courses();

  // calculate point total
  let points = 0;
  let nr_of_courses = 0; // 8 (16) LK und mind. 20 und max. 26 GK
  for (let subject in accredited_courses) {
    accredited_courses[subject].forEach((e, i) => {
      if (e && grades.hasOwnProperty(subject)) {
        let weighted_points = grades[subject][i];
        points += subject.includes('lk') ? weighted_points * 2 : weighted_points;
        nr_of_courses++;
      }
    });
  }

  while (nr_of_courses < 34) {
    break;
  }
  console.log(points, nr_of_courses);

  // deutsch, mathematik, fremdsprache (falls noch keine LKs)
  // aufgabenfeld 2 (gesellschaftlich) mind. 2 aufeinanderfolgende semester oder religion
  // aufgabenfeld 3 (naturwissenschaftlich) mind. 2 aufeinanderfolgende semester
  // +4, +4, +4


  //nr_of_courses += 8; // intensive course grades are multiplied by two

  let result_one = points / nr_of_courses;
}

document.querySelector('#form-button').addEventListener('click', calculate);
