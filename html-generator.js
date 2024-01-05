import { subjects } from "./enums/SubjectEnum.js";
import { toTitleCase } from "./helper.js";

let gradeDropdownHtml = '<select class="grade-dropdown"><option selected disabled> - </option>{options}</select>'.replace(
  '{options}',
  (() => {
    let str = '';
    for (let i = 15; i > 0; i--) {
      str += `<option value="${i}">${i}</option>`;
    }
    return str;
  })
);

let subjectDropdownHtml = '<select class="subject-dropdown">' +
  '<option selected disabled>- Fach auswählen -</option>{subjects}</select>'.replace(
  '{subjects}',
  (() => {
    let str = '';
    Object.keys(subjects.bySubjectArea).reduce((r, k) => {
      return r.concat(subjects.bySubjectArea[k]);
    }, []).forEach((s) => {
      const fstr = toTitleCase(s);
      str += `<option value="${fstr}">${fstr}</option>`;
    })
    return str;
  })
);

let html = '';
for (let item in subjects.labels) {
  html += `
    <tr data-label="${item}">
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
