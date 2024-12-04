import React, { useState } from 'react';
import FieldRenderer from './FieldRenderer';
import ProgressBar from './ProgressBar';
import { toast } from 'react-toastify';
import '../../styles/Form.css';  // Ensure this file exists and contains necessary styles

function DynamicForm({ onSubmit }) {
  const [fields, setFields] = useState([]);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch the fields when the dropdown selection changes
  const handleDropdownChange = async (event) => {
    setLoading(true);
    const selection = event.target.value;

    // Simulated API call
    try {
      const response = await import('../../utils/apiResponses'); // Make sure apiResponses exists
      const selectedForm = response[selection];
      if (selectedForm) {
        setFields(selectedForm.fields);
        setFormData({});
        setProgress(0);
        toast.success(`Loaded ${selection} form successfully!`);
      } else {
        toast.error('Invalid selection!');
      }
    } catch (error) {
      toast.error('Failed to load form structure!');
    } finally {
      setLoading(false);
    }
  };

  // Handle input field change
  const handleChange = (fieldName, value) => {
    const updatedFormData = { ...formData, [fieldName]: value };
    setFormData(updatedFormData);

    const requiredFields = fields.filter((field) => field.required);
    const completedFields = requiredFields.filter(
      (field) => updatedFormData[field.name]
    );
    setProgress((completedFields.length / requiredFields.length) * 100);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const missingFields = fields
      .filter((field) => field.required && !formData[field.name])
      .map((field) => field.label);

    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(', ')}`);
      return;
    }

    onSubmit(formData);
    toast.success('Form submitted successfully!');
    setFormData({});
    setFields([]);
    setProgress(0);
  };

  return (
    <div className="dynamic-form">
      <h2>Dynamic Form</h2>
      <div className="form-group">
        <label>Select Form Type:</label>
        <select onChange={handleDropdownChange} disabled={loading}>
          <option value="">-- Select --</option>
          <option value="userInfo">User Information</option>
          <option value="addressInfo">Address Information</option>
          <option value="paymentInfo">Payment Information</option>
        </select>
      </div>

      {fields.length > 0 && (
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <FieldRenderer
              key={field.name}
              field={field}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          ))}
          <ProgressBar progress={progress} />
          <button type="submit" disabled={loading}>Submit</button>
        </form>
      )}
    </div>
  );
}

export default DynamicForm;
