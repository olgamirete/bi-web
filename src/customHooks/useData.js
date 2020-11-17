function useData() {

  const fieldsTable1 = ["anio", "nombre", "cantidad"];
  const fieldsTable2 = ["dni", "provincia", "edad"];
  const fieldsTable3 = ["fruta", "calorías"];


  const dataStructure = new Map();
  dataStructure.set("table1", { id: "table1", fields: fieldsTable1 });
  dataStructure.set("table2", { id: "table2", fields: fieldsTable2 });
  dataStructure.set("table3", { id: "table3", fields: fieldsTable3 });

  const data = [
    { x: 0, y: 0 },
    { x: 10, y: 10 },
    { x: 20, y: 15 },
    { x: 30, y: 20 },
    { x: 40, y: 25 },
    { x: 50, y: 30 },
    { x: 60, y: 40 },
    { x: 70, y: 5 },
    { x: 80, y: 20 },
    { x: 90, y: 10 },
    { x: 100, y: 0 },
    { x: 23, y: 0 }
  ];

  return [dataStructure, data];
}

export default useData;