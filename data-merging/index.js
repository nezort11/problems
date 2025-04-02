/* Merge (aggregate) data rows

based on `user` - user ID

for numbers (duration) - use SUM

for arrays (equipment) - use JOIN + DEDUPLICATE (UNIQUE) + ORDER BY ASC


Algorithm:

- Iterate over all rows

- Create a new result array with merged rows

- Create a mapping from user id to index of row in result array

- Join the duration and equipment immidiatly

- After iterating finished do postprocessing - deduplicate and sort equipment
(using Set + sort)
*/

/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @return {Array}
 */
function mergeData(sessions) {
  const resultSessions = [];
  const userIdToRowIndex = {};
  for (
    let sessionIndex = 0;
    sessionIndex < sessions.length;
    sessionIndex += 1
  ) {
    const session = sessions[sessionIndex];

    console.log("session", session);
    console.log("userIdToRowIndex", userIdToRowIndex);
    const userIdRowIndex = userIdToRowIndex[session.user];
    if (userIdRowIndex !== undefined) {
      const userRow = resultSessions[userIdRowIndex];

      // merge
      userRow.duration += session.duration;
      userRow.equipment.push(...session.equipment);
    } else {
      userIdToRowIndex[session.user] = resultSessions.length;
      resultSessions.push(
        // deep copy session
        {
          user: session.user,
          duration: session.duration,
          equipment: [...session.equipment],
        }
      );
    }
  }

  for (
    let resultSessionIndex = 0;
    resultSessionIndex < resultSessions.length;
    resultSessionIndex += 1
  ) {
    const resultSession = resultSessions[resultSessionIndex];

    const equipmentSet = new Set(resultSession.equipment);
    resultSession.equipment = Array.from(equipmentSet).sort();
  }

  return resultSessions;
}

console.log(
  mergeData([
    { user: 1, duration: 10, equipment: ["barbell"] },
    { user: 1, duration: 30, equipment: [] },
  ])
);
