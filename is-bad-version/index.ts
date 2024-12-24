// This is a JavaScript coding problem from BFE.dev

type IsBad = (version: number) => boolean;

function firstBadVersion(isBad: IsBad) {
  // firstBadVersion receive a check function isBad
  // and should return a closure which accepts a version number(integer)
  return (version: number): number => {
    // write your code to return the first bad version
    // if none found, return -1

    let startVersion = 0;
    let endVersion = version;
    while (true) {
      console.log(startVersion, endVersion);
      const middleVersion =
        startVersion + Math.floor((endVersion - startVersion) / 2);
      if (isBad(middleVersion)) {
        if (!isBad(middleVersion - 1)) {
          return middleVersion;
        }
        endVersion = middleVersion;
      } else {
        if (isBad(middleVersion + 1)) {
          return middleVersion + 1;
        }
        startVersion = middleVersion;
      }
    }
  };
}

console.log(firstBadVersion((n) => n >= 84)(100));
