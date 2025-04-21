/**
 * @param {Element} element
 * @param {string} classNames
 * @return {Array<Element>}
 */
/**
 * Cases:
 *
 * - <el>, "foo bar" => [<el>, <el2>]
 * - <el>, "FOO bAr" => [<el>, <el2>]
 * - <el>, "" => []
 * - <el>, "   " => []
 * - null, "" => []
 * - <el>, "foo     bar" => [<el>, <el2>]
 *
 *
 * Approach:
 *
 * - iterate throught all element children
 *
 * - compute child element class name
 *
 * - compare child element classnames are one of the required class names
 *
 * - if yes => add this element to array
 *
 * - additionally recursive get elements by class name for this child element
 * - push all of results to the result array (HTMLCollection)
 */
export default function getElementsByClassName(element, classNames) {
  if (!element || !element.children || !classNames?.trim()) {
    return [];
  }
  const classes = classNames
    .trim()
    .split(" ")
    .filter((cn) => !!cn);
  // const classesSet = new Set(classes);

  const resultElements = [];
  for (const child of element.children) {
    let hasClassName = true;
    for (const cn of classes) {
      if (child.classList.contains(cn)) {
        // pass
      } else {
        hasClassName = false;
        break;
      }
    }
    if (hasClassName) {
      resultElements.push(child);
    }

    const childResults = getElementsByClassName(child, classNames);
    resultElements.push(...childResults);
  }
  return resultElements;
}
