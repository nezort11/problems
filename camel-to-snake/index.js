// Необходимо написать функцию, которая преобразует строку
// из CamelCase в snake_case.

function isUppercaseLetter(char) {
  // return char.match(/^[A-Z]*$/);
  return char.match(/\p{Lu}/u); // ES2018+
}

function camelToSnake(text) {
  let snakeText = "";
  let isFirstLetter = true;
  for (const char of text) {
    if (isFirstLetter) {
      snakeText += char.toLowerCase();
      isFirstLetter = false;
      continue;
    }

    if (isUppercaseLetter(char)) {
      snakeText += "_";
    }
    snakeText += char.toLowerCase();
  }
  return snakeText;
}

console.log(camelToSnake("updatedAt")); // updated_at
console.log(camelToSnake("XmlHTTPRequest")); // xml_h_t_t_p_request
console.log(camelToSnake("XmlHttpRequestI")); // "xml_http_request_i"
