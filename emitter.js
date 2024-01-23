const outputSection = document.querySelector('section#result-output');

function constructEquation(points, grade) {
  return `
    <math display="inline">
      <mi>N</mi><mo>&#x3d;</mo>
      <mn>5</mn><mo>&#x2064;</mo>
      <mfrac>
        <mn>2</mn><mn>3</mn>
        </mfrac>
      <mo>&#x2212;</mo>
      <mfrac>
        <mn>${points}</mn><mn>180</mn>
      </mfrac>
      <mo>&#x3d;</mo>
      <mn>${grade}</mn>
    </math>
  `;
}

function emitResults(points1 = 0, courses = 0, points2 = 0, grade = 0, deficits = undefined) {
  let outputHtml = '';

  outputHtml += `
    <p>Erreichte Punktzahl für Ergebnis I: ${points1} von 600</p>
    <p>Anzahl eingebrachter Kurse: ${courses}</p>
    <p>Erreichte Punktzahl für Ergebnis II: ${points2} von 300</p>
    <p>${constructEquation(points1 + points2, grade)}</p>
    <p>Anzahl Defizite: ${deficits}</p>
  `;

  outputSection.innerHTML = outputHtml;
}

function emitError() {
  let outputHtml = '';

  outputSection.innerHTML = outputHtml;
}

export {
  emitResults,
  emitError,
}
