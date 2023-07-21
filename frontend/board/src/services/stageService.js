const stages = ["Backlog", "Spint", "To-Do", "Doing", "Done"];

export function getStages() {
  return stages;
}

export function getNextStage(stage) {
  console.log("next stage of", stage);
  const index = stages.indexOf(stage);
  if (index === -1 || index === stages.length - 1) return undefined;
  return stages[index + 1];
}
