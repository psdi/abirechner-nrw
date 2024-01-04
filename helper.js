function toTitleCase(str) {
  return str.toLowerCase().replace(/(^|\/|-)(\S)/g, c => c.toUpperCase());
}
