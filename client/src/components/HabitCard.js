import React, { useState } from 'react';
import {
  format,
  eachDayOfInterval,
  subDays,
} from 'date-fns';
import { Trash2, RotateCcw, Calendar } from 'lucide-react';

function HabitCard({ habit, onComplete, onDelete }) {
  const [displayDays, setDisplayDays] = useState(habit.displayDays || 60);
  const [showDaysInput, setShowDaysInput] = useState(false);
  const today = new Date();

  const getCompletionStatus = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return habit.completions.some(
      (c) => format(new Date(c.date), 'yyyy-MM-dd') === dateStr
    );
  };

  const getColor = () => {
    // Use the custom color from habit data or fall back to default
    return habit.completions.length ? (habit.color || 'bg-blue-500') : 'bg-gray-700';
  };

  const handleComplete = () => {
    onComplete(habit._id, today);
  };

  const handleUndo = () => {
    const lastCompletion = habit.completions
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    if (lastCompletion) {
      onDelete(habit._id, lastCompletion.date);
    }
  };

  const getDays = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (displayDays - 1));
    return eachDayOfInterval({ start, end });
  };

  return (
    <div className="bg-gray-800 text-gray-200 rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-base font-medium text-gray-100">
              {habit.title}
            </h3>
            <p className="text-sm text-gray-400">
              {habit.description || 'No description'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Days Input */}
          {showDaysInput ? (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={displayDays}
                onChange={(e) => setDisplayDays(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-2 py-1 rounded bg-gray-700 text-gray-200 border border-gray-600"
                min="1"
              />
              <button
                onClick={() => setShowDaysInput(false)}
                className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:bg-gray-600"
              >
                Done
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDaysInput(true)}
              className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:bg-gray-600"
              title="Change grid size"
            >
              <Calendar size={18} />
            </button>
          )}
          
          <button
            onClick={handleUndo}
            className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:bg-gray-600"
            title="Undo last completion"
          >
            <RotateCcw size={18} />
          </button>

          <button
            onClick={() => onDelete(habit._id)}
            className="p-2 rounded-lg bg-gray-700 text-red-400 hover:bg-gray-600"
            title="Delete habit"
          >
            <Trash2 size={18} />
          </button>

          <button
            onClick={handleComplete}
            className="p-2 rounded-full border-2 border-gray-600 hover:bg-gray-700 text-gray-400"
            title="Mark as complete"
          >
            <span className="text-xl">+</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-0.5">
        {getDays().map((date) => (
          <div
            key={format(date, 'yyyy-MM-dd')}
            className={`w-4 h-4 rounded-sm ${
              getCompletionStatus(date) ? getColor() : 'bg-gray-700'
            }`}
            title={format(date, 'MMM d, yyyy')}
          />
        ))}
      </div>
    </div>
  );
}

export default HabitCard;