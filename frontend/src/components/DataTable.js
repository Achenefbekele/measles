import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/measles-data")
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="card p-4 mt-4">
      <h3>Measles Data Table</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Period</th>
            <th>New Cases</th>
            <th>Follow-up Cases</th>
            <th>Referrals</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.period}</td>
              <td>{row.newCases}</td>
              <td>{row.followUp}</td>
              <td>{row.referrals}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
