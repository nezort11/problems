/** getElementsByStyle
 *
 * 1. Get all descendent elements
 *
 * - children? (JS DOM API)
 * - traverse all dom elements recursively
 *
 * 2. Check which of them have particual style
 *
 * - getComputedStyle - inline style + stylesheet
 */

export default function getElementsByStyle(
  element: Element,
  property: string,
  value: string
): Array<Element> {
  // element.children
  // if (!(Symbol.iterator in element.children)) {
  //   return [];
  // }

  // console.log("element", element);
  const matchedElements = [];
  for (const e of Array.from(element.children)) {
    const eStyle = window.getComputedStyle(e);
    // console.log("eStyle", eStyle);
    if (eStyle.getPropertyValue(property) === value) {
      matchedElements.push(e);
    }

    const eMatchedElements = getElementsByStyle(e, property, value);
    matchedElements.push(...eMatchedElements);
  }

  return matchedElements;
}
