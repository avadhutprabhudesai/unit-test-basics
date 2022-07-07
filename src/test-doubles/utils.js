function generateId() {
  return Math.floor(Math.random() * 10);
}

function createEmployee(name) {
  return {
    id: exportVal.generateId(),
    name,
  };
}

const exportVal = { generateId, createEmployee };
export default exportVal;
