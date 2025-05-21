/*
Дана древовидная структура следующего формата:

const tree = {
  type: 'nested',
  children: [
    { type: 'added', value: 42 },
    {
      type: 'nested',
      children: [
        { type: 'added', value: 43 },
      ],
    },
    { type: 'added', value: 44 },
    ...
  ]
}

Необходимо написать функцию `getNodes(tree, type)`, которая возвращает все ноды в порядке следования, соответствующие переданному типу.

Глубина вложенности любая.


Пример:

const addedItems = getNodes(tree, 'added');

// Результат:
[
  { type: 'added', value: 42 },
  { type: 'added', value: 43 },
  { type: 'added', value: 44 },
  ...
]

Время: O(n) - посещаем все ноды
Память: O(n) - recursive callstack для каждого ноды
*/

// function getNodes(tree, type) {
//   const nodes = [];

//   const findNodes = (root) => {
//     if (root.type === type) {
//       nodes.push(root);
//       return;
//     }

//     if (root.children) {
//       for (const child of root.children) {
//         findNodes(child);
//       }
//     }
//   };
//   findNodes(tree);

//   return nodes;
// }

function getNodes(tree, type) {
  const nodeStack = [tree];
  const nodes = [];
  while (nodeStack.length > 0) {
    const node = nodeStack.pop();

    if ("value" in node) {
      nodes.push(node);
    }
    if ("children" in node) {
      // iterate in backwards order, or reverse all nodes in the end
      for (let i = node.children.length - 1; i >= 0; i--) {
        nodeStack.push(node.children[i]);
      }
    }
  }

  return nodes;
}

const tree = {
  type: "nested",
  children: [
    { type: "added", value: 42 }, // 1
    {
      type: "nested",
      children: [
        { type: "added", value: 43 }, // 2
        {
          type: "nested",
          children: [
            { type: "added", value: 44 }, // 3
          ],
        },
      ],
    },
    { type: "added", value: 45 }, // 4
  ],
};

const addedItems = getNodes(tree, "added");

console.log("addedItems", addedItems); // [42, 43, 42]
// [
//   { type: 'added', value: 42 },
//   { type: 'added', value: 43 },
//   { type: 'added', value: 44 },
//   ...
// ]
