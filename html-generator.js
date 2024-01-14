import { subjects } from "./enums/SubjectEnum.js";
import { toTitleCase } from "./helper.js";

let gradeDropdownHtml = '<select class="grade-dropdown"><option selected disabled> - </option>{options}</select>'.replace(
  '{options}',
  (() => {
    let str = '';
    for (let i = 15; i >= 0; i--) {
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
      str += `<option value="${s}">${toTitleCase(s)}</option>`;
    })
    return str;
  })
);

let html = '';
for (let item in subjects.labels) {
  const checked = item.includes('1') || item.includes('2');

  html += `
    <tr data-label="${item}">
      <td>${subjects.labels[item]}</td>
      <td>${subjectDropdownHtml}</td>
  `;

  for (let i = 0; i < 4; i++) {
    html += `
      <td>
        ${gradeDropdownHtml}
        <input type="checkbox" name="${item}-${i}" ${(() => checked ? 'checked' : '')()} />
      </td>
    `;
  }

  html += '</tr>'
}

let resultsHtml = '';
for (let i = 1; i <= 5; i++) {
  resultsHtml += `
    <tr data-label="ab${i}">
      <td class="written-exam">${(() => i < 4 ? gradeDropdownHtml : (i < 5 ? '&nbsp;' : 'BLL'))()}</td>
      <td class="oral-exam">${gradeDropdownHtml}</td>
    </tr>
  `;
}

document.querySelector('form tbody#table-body-content').innerHTML = html;
document.querySelector('form tbody#results-form-content').innerHTML = resultsHtml;
