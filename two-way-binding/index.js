function model(state: { value: string }, element: HTMLInputElement) {
  let stateValue = state.value;
  Object.defineProperty(state, "value", {
    get: () => stateValue,
    set: (value) => {
      stateValue = value;
    },
  });
  Object.defineProperty(element, "value", {
    get: () => stateValue,
    set: (value) => {
      stateValue = value;
    },
  });
}
