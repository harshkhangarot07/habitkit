import React, { useState } from 'react';

function NewHabitForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    color: 'bg-blue-500',
    displayDays: 60
  });

  const colorOptions = [
    { name: 'Blue', value: 'bg-blue-500' },
    { name: 'Green', value: 'bg-green-500' },
    { name: 'Purple', value: 'bg-purple-500' },
    { name: 'Rose', value: 'bg-rose-500' },
    { name: 'Yellow', value: 'bg-yellow-500' },
    { name: 'Indigo', value: 'bg-indigo-500' },
    { name: 'Teal', value: 'bg-teal-500' },
    { name: 'Orange', value: 'bg-orange-500' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 rounded bg-gray-700 text-gray-200 border border-gray-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Description
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 rounded bg-gray-700 text-gray-200 border border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Display Days
        </label>
        <input
          type="number"
          value={formData.displayDays}
          onChange={(e) => setFormData({ ...formData, displayDays: parseInt(e.target.value) || 60 })}
          className="w-full px-3 py-2 rounded bg-gray-700 text-gray-200 border border-gray-600"
          min="1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Color
        </label>
        <div className="grid grid-cols-4 gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => setFormData({ ...formData, color: color.value })}
              className={`w-full h-8 rounded-md ${color.value} ${
                formData.color === color.value ? 'ring-2 ring-white' : ''
              }`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-400"
        >
          Create Habit
        </button>
      </div>
    </form>
  );
}

export default NewHabitForm;