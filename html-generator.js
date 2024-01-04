import {subjects} from "./enums/SubjectEnum.js";

let gradeDropdownHtml = '<select><option selected disabled> - </option>{options}</select>'.replace(
  '{options}',
  (() => {
    let str = '';
    for (let i = 15; i > 0; i--) {
      str += `<option value="${i}">${i}</option>`;
    }
    return str;
  })
);

let subjectDropdownHtml = '<select><option selected disabled>- Fach auswählen -</option>{subjects}</select>'.replace(
  '{subjects}',
  (() => {
    let str = '';
    Object.keys(subjects.bySubjectArea).reduce((r, k) => {
      return r.concat(subjects.bySubjectArea[k]);
    }, []).forEach((s) => {
      str += `<option value="${s}">${toTitleCase(s)}</option>`;
    })
    return str;
  })
);

let html = '';
for (let item in subjects.labels) {
  html += `
    <tr>
      <td>${subjects.labels[item]}</td>
      <td>${subjectDropdownHtml}</td>
      <td>${gradeDropdownHtml}</td>
      <td>${gradeDropdownHtml}</td>
      <td>${gradeDropdownHtml}</td>
      <td>${gradeDropdownHtml}</td>
    </tr>
  `;
}

document.querySelector('form tbody#table-body-content').innerHTML = html;
