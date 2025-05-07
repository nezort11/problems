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

function getNodes(tree, type) {
  const nodes = [];

  const findNodes = (root) => {
    if (root.type === type) {
      nodes.push(root);
      return;
    }

    if (root.children) {
      for (const child of root.children) {
        findNodes(child);
      }
    }
  };
  findNodes(tree);

  return nodes;
}

const tree = {
  type: "nested",
  children: [
    { type: "added", value: 42 },
    {
      type: "nested",
      children: [{ type: "added", value: 43 }],
    },
    { type: "added", value: 44 },
  ],
};

const addedItems = getNodes(tree, "added");

console.log("addedItems", addedItems);
