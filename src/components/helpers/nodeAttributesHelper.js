function getInitialAttributes(type) {
  // Base attributes applicable to all nodes
  let attributes = [
    {
      text: "Тип",
      name: "type",
      value: type,
    },
    {
      text: "Назва",
      name: "name",
      value: type,
    },
  ];

  // Additional attributes for specific node types
  const hasSalaryAndCoefficient = [
    "developer",
    "techLead",
    "teamLead",
    "tester",
    "projectManager",
    "productOwner",
  ];
  const hasMonthlyCost = ["tool"];

  if (hasSalaryAndCoefficient.includes(type)) {
    attributes.push(
      {
        text: "Ставка",
        name: "salaryRate",
        value: 0,
      },
      {
        text: "Коефіцієнт зайнятості",
        name: "coefficientWork",
        value: 1.0,
      }
    );
  }

  if (hasMonthlyCost.includes(type)) {
    attributes.push({
      text: "Щомісячна вартість",
      name: "monthlyCost",
      value: 0,
    });
  }

  return attributes;
}

export default getInitialAttributes;
