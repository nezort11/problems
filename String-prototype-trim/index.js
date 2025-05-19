/**
 * @param {string} str
 * @return {string}
 */
/**
 * Approach:
 * (1) imperative replace start and end whitespaces with ""
 *
 * (2) RegExp replace starting and trailing whitespaces with ""
 *
 */
function trim(str) {
  // return str.replace(/^\s+/, '').replace(/\s+$/, '');
  return str.replace(/^\s*|\s*$/g, "");
}
