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

function calculate(e) {
  e.preventDefault();

  let grades = collect_grades();
  // todo: check if there are "0" grades

  // calculate intensive course (LK) grades
  let points = 2 * grades.lk1.concat(grades.lk2).reduce((a, b) => {
    return a + b;
  }, 0);
  points = grades.ab3.concat(grades.ab4).reduce((a, b) => {
    return a + b;
  }, 0);
  let nr_of_courses = 24; // 16 LK und mind. 20 und max. 26 GK
  
  // deutsch, mathematik, fremdsprache (falls noch keine LKs)
  // aufgabenfeld 2 (gesellschaftlich) mind. 2 aufeinanderfolgende semester oder religion
  // aufgabenfeld 3 (naturwissenschaftlich) mind. 2 aufeinanderfolgende semester
}

document.querySelector('#form-button').addEventListener('click', calculate);
