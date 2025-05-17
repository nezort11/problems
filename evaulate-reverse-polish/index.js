/**
 * @param {string[]} tokens
 * @return {number}
 */
/**
Approach:
?- O(N)
?- O(N^2)

(1) Splice = inplace replace (array change size). = O(N) + x?

["10","6",  "9","3","+",  "-11","*","/","*","17","+","5","+"]
                     ^

["10","6",  "11",  "-11","*","/","*","17","+","5","+"]
             ^

["10","6",  "11","-11","*"  ,"/","*","17","+","5","+"]
                        ^

["10","6",  "-121"  ,"/","*","17","+","5","+"]
               ^

(2) Without changing array size (recreation) = O(N)

HOW TO DO IT IN O(N)?

["10","6",  "9","3","+",  "-11","*","/","*","17","+","5","+"]
                     ^

["10","6", "11", null, null, "-11","*","/","*","17","+","5","+"]
             ^

["10","6", "11", null, null, "-11","*","/","*","17","+","5","+"]
                                     ^

["10","6", "-121", null, null, null, null,"/","*","17","+","5","+"]
                                           ^

["10","-726", null, null, null, null, null,null,"*","17","+","5","+"]
                                                 ^

["10","-726", null, null, null, null, null, null,"*","17","+","5","+"]
                                                  ^

["-7260",null, null, null, null, null, null, null,null,"17","+","5","+"]
                                                             ^
Problem:

[.... value, value, null, null, value, value, null, null]

(3) Without chaning the array using hash map? = Time: O(N), Space: O(N)
- additinal array?
- additional hash map?
- stack?

2 poiters?

["10","6",  "9","3","+",  "-11","*","/","*","17","+","5","+"]
                     ^

{
    [4]: 11,
}

["10","6",  "9","3","+",  "-11","*","/","*","17","+","5","+"]
                                 ^

{
    [4]: 11,
    [6]: -11 * [4] = -121
}

["10","6",  "9","3","+",  "-11","*","/","*","17","+","5","+"]
                                     ^

(4) Backwards recursion? = call stack for calculating inner calculations

= Recursion with memoization = DYNAMIC PROGRAMMING!

["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
                                                      ^
= eval(-2) + 5

["10","6","9","3","+","-11","*","/","*","17","+"]

["10","6","9","3","+","-11","*","/","*"]

["10","6","9","3","+","-11","*","/"]

Some case:
["4",  "13","5","/",  "+"]

(4 + (13 / 5)) = 6
 */

const isOperation = (token) => {
  return token === "+" || token === "-" || token === "*" || token === "/";
};

const round = (num) => {
  return num > 0 ? Math.floor(num) : Math.ceil(num);
};

// var evalRPN = function(tokens) {
//     const memo = {}; // {[ptr]: value}
//     const calc = (ptr) => {
//         if (ptr in memo) {
//             console.ptr('ptr in memo', memo[ptr])
//             // return memoized result if available
//             return memo[ptr];
//         }

//         const token = tokens[ptr];
//         if (!isOperation(token)) {
//             return [+token, ptr];
//         }

//         const [right, rightStartPtr] = calc(ptr - 1);
//         let left, leftStartPtr;
//         if (isOperation(tokens[ptr - 1])) {
//             // if right is operation, then need to first search the start ptr
//             [left, leftStartPtr] = calc(rightStartPtr - 1);
//         } else {
//             // if right is primitive then just calc left
//             [left, leftStartPtr] = calc(ptr - 2);
//         }

//         let result;
//         switch(token) {
//             case "+":
//                 result = left + right;
//                 break;
//             case "-":
//                 result = left - right;
//                 break;
//             case "*":
//                 result = left * right;
//                 break;
//             case "/":
//                 result = round(left / right);
//                 break;
//         }
//         memo[ptr] = [result, leftStartPtr];
//         return [result, leftStartPtr];
//     }

//     // calc recursive result for last operation
//     return calc(tokens.length - 1)[0];
// };

// var evalRPN = function(tokens) {
//     const calc = (ptr) => {
//         const token = tokens[ptr];
//         if (!isOperation(token)) {
//             return [+token, ptr];
//         }

//         const [right, rightStartPtr] = calc(ptr - 1);
//         let left, leftStartPtr;
//         if (isOperation(tokens[ptr - 1])) {
//             // if right is operation, then need to first search the start ptr
//             [left, leftStartPtr] = calc(rightStartPtr - 1);
//         } else {
//             // if right is primitive then just calc left
//             [left, leftStartPtr] = calc(ptr - 2);
//         }

//         let result;
//         switch(token) {
//             case "+":
//                 result = left + right;
//                 break;
//             case "-":
//                 result = left - right;
//                 break;
//             case "*":
//                 result = left * right;
//                 break;
//             case "/":
//                 result = round(left / right);
//                 break;
//         }
//         return [result, leftStartPtr];
//     }

//     // calc recursive result for last operation
//     return calc(tokens.length - 1)[0];
// };

var evalRPN = function (tokens) {
  const stack = [];
  for (const token of tokens) {
    if (!isOperation(token)) {
      stack.push(+token);
    } else {
      const right = stack.pop();
      const left = stack.pop();
      let result;
      switch (token) {
        case "+":
          result = left + right;
          break;
        case "-":
          result = left - right;
          break;
        case "*":
          result = left * right;
          break;
        case "/":
          result = round(left / right);
          break;
      }
      stack.push(result);
    }
  }
  return stack.pop();
};
