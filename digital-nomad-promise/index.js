function isEmpty(obj) {
  for (const key in obj) {
    return false;
  }
  return true;
}

module.exports = async function (input) {
  const result = [];
  const processFile = (file) => {
    if (typeof file === "string" && file !== "file") {
      result.push(file);
    }
    if (typeof file === "object" && file !== null && !isEmpty(file)) {
      return new Promise((resolve) => {
        file.size((size) => {
          const promises = new Array(size);
          for (let i = 0; i < size; i++) {
            promises[i] = new Promise((res) => {
              file.read(i, (folderFile) => {
                res(processFile(folderFile));
              });
            });
          }

          resolve(Promise.all(promises));
        });
      });
    }
    return Promise.resolve();
  };

  return new Promise((resolve, reject) => {
    processFile(input).then(() => {
      // after all files are async processed - sort result array and return
      result.sort();
      resolve(result);
    });
  });
};
