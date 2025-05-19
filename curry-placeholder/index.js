const hasPlaceholders = (args, length) => {
  for (let i = 0; i < length; i++) {
    if (args[i] === curry.placeholder) {
      return true;
    }
  }
  return false;
};

const mergeArgs = (args, args2) => {
  args = [...args];
  args2 = [...args2];

  for (let i = 0; i < args.length; i++) {
    if (args2.length === 0) {
      break;
    }
    if (args[i] === curry.placeholder) {
      args[i] = args2.shift();
    }
  }
  if (args2.length > 0) {
    args.push(...args2);
  }

  return args;
};

// This is a JavaScript coding problem from BFE.dev

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
  const curried = (...args) => {
    // if enough args passed and enough non-blank args
    if (args.length >= fn.length && !hasPlaceholders(args, fn.length)) {
      return fn(...args);
    }
    return (...args2) => curried(...mergeArgs(args, args2));
  };
  return curried;
}

curry.placeholder = Symbol();
