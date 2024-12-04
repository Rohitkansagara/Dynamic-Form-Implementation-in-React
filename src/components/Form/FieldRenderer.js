import React from 'react';

function FieldRenderer({ field, value, onChange }) {
  const handleChange = (e) => {
    onChange(field.name, e.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor={field.name}>{field.label}</label>
      {field.type === 'dropdown' ? (
        <select
          id={field.name}
          name={field.name}
          value={value}
          onChange={handleChange}
          required={field.required}
        >
          {field.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          id={field.name}
          name={field.name}
          value={value}
          onChange={handleChange}
          required={field.required}
        />
      )}
    </div>
  );
}

export default FieldRenderer;
