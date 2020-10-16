function useData() {

    const fieldsTable1 = ["anio", "nombre", "cantidad"];
    const fieldsTable2 = ["dni", "provincia", "edad"];
    const fieldsTable3 = ["fruta", "calorías"];


    const dataStructure = new Map();
    dataStructure.set("table1", {id: "table1", fields: fieldsTable1});
    dataStructure.set("table2", {id: "table2", fields: fieldsTable2});
    dataStructure.set("table3", {id: "table3", fields: fieldsTable3});

    const data = null;

    return [dataStructure, data];
}

export default useData;