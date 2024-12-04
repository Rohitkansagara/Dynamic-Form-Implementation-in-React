import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '../../styles/Table.css';

function DataTable({ data }) {
  const [tableData, setTableData] = useState([]);

  // Update tableData if the prop 'data' changes
  useEffect(() => {
    if (Array.isArray(data)) {
      setTableData(data);
    }
  }, [data]);

  const handleDelete = (index) => {
    // Ensure data is valid and handle deletion
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData); // Updating the tableData state after deletion
    toast.success('Entry deleted successfully!');
  };

  const handleEdit = (index) => {
    const rowToEdit = tableData[index];
    const editedValues = {};

    // Prompt user for each field in the row
    Object.keys(rowToEdit).forEach((key) => {
      const newValue = prompt(`Edit ${key}:`, rowToEdit[key]);
      if (newValue !== null && newValue !== '') {
        editedValues[key] = newValue;
      }
    });

    if (Object.keys(editedValues).length > 0) {
      // Merge edited values with existing row
      const updatedData = [...tableData];
      updatedData[index] = { ...rowToEdit, ...editedValues };
      setTableData(updatedData);
      toast.success('Changes saved successfully!');
    } else {
      toast.error('No changes made or invalid input.');
    }
  };

  return (
    <div className="data-table">
      <h2>Submitted Data</h2>
      {tableData.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(tableData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default DataTable;
