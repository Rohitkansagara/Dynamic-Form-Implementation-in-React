import React from 'react';
import DynamicForm from './components/Form/DynamicForm';
import DataTable from './components/Table/DataTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

function App() {
  const [submittedData, setSubmittedData] = React.useState([]);

  const handleFormSubmit = (formData) => {
    setSubmittedData((prev) => [...prev, formData]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynamic Form Application</h1>
      </header>
      <DynamicForm onSubmit={handleFormSubmit} />
      {submittedData.length > 0 && <DataTable data={submittedData} />}
      <ToastContainer position="top-right" autoClose={3000} />
      <footer className="App-footer">
        <p>&copy; 2024 Dynamic Form App</p>
      </footer>
    </div>
  );
}

export default App;
