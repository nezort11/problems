type Command = {
  $push?: any;
  $set?: any;
  $apply?: (arg: any) => any;
  $merge?: object;
};

const isPlainCommand = (
  command: CommandTree,
  commandKeys: (keyof CommandTree)[]
): command is Command => {
  return commandKeys.length === 1 && commandKeys[0].startsWith("$");
};

// Record does not work
type CommandTree = Command | { [key: string]: CommandTree };

const isObject = (x: unknown): x is object =>
  typeof x === "object" || x !== null;

function update(data: object, command: CommandTree): void {
  const commandKeys = Object.keys(command) as Array<keyof typeof command>;
  // if plain collection operation
  if (isPlainCommand(command, commandKeys)) {
    const plainCommandKey = commandKeys[0];
    const commandValue = command[plainCommandKey];
    switch (plainCommandKey as "$push" | "$merge") {
      case "$push":
        if (!Array.isArray(data)) {
          throw Error("attempted to push on non-array");
        }
        (data as Array<any>).push(...commandValue);
        break;
      case "$merge":
        if (!isObject(data)) {
          throw Error("attempted to merge on non-object");
        }
        Object.assign(data, commandValue);
        break;
    }
  } else {
    commandKeys.forEach((dataKey) => {
      const dataCommand = command[dataKey];
      const dataCommandKeys = Object.keys(dataCommand) as Array<
        keyof typeof dataCommand
      >;
      // if plain item operation
      if (isPlainCommand(dataCommand, dataCommandKeys)) {
        const plainDataCommandKey = dataCommandKeys[0];
        const dataCommandValue = dataCommand[plainDataCommandKey];
        if (["$set", "$apply"].includes(plainDataCommandKey)) {
          switch (plainDataCommandKey as "$set" | "$apply") {
            case "$set":
              data[dataKey] = dataCommandValue;
              break;
            case "$apply":
              data[dataKey] = dataCommandValue(data[dataKey]);
              break;
          }
          return;
        }
      }
      update(data[dataKey], dataCommand);
    });
  }

  // return data;
}

const arr = [1, 2, 3, 4];
update(arr, { $push: [5, 6] });
console.log(arr);

// const arr2 = { a: [1, 2, 3, 4] };
// update(arr2, { a: { $push: [5, 6] } });
console.log(update({ a: [1] }, { a: { $push: [2, 3] } }));
// console.log(arr2);

const myObj2 = { a: 2, b: { c: 7 } };
update(myObj2, { $merge: { e: 12, d: 3 } });
console.log(myObj2);

const myObj = { a: 2, b: { c: 7 } };
update(myObj, { a: { $set: 8 }, b: { c: { $set: 11 } } });
console.log(myObj);

const myObj3 = { a: 2, b: { c: 7 } };
update(myObj3, {
  a: { $apply: (item) => item * 7 },
  b: { c: { $set: 11 } },
});
console.log(myObj3);
