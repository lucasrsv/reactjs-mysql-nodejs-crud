import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployees([
        ...employees,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployees(response.data);
    });
  };

  return (
    <div className="App">
      <div className="employeeInformation">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />

        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />

        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />

        <label>Wage (per year):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />

        <button onClick={addEmployee}>Add Employee</button>
        <button onClick={getEmployees}>Show Employees</button>
        {employees.map((val, key) => (
          <div className="employee">
            <h3>Name: {val.name}</h3>
            <h3>Age: {val.age}</h3>
            <h3>Country: {val.country}</h3>
            <h3>position: {val.position}</h3>
            <h3>Wage: {val.wage}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
