import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import HabitCard from '../components/HabitCard';
import NewHabitForm from '../components/NewHabitForm';
import { useAuth } from '../contexts/AuthContext';
import { PlusCircle, LogOut } from 'lucide-react';

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [showNewHabitForm, setShowNewHabitForm] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await api.get('/habits');
      setHabits(response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const handleCreateHabit = async (habitData) => {
    try {
      await api.post('/habits', habitData);
      fetchHabits();
      setShowNewHabitForm(false);
    } catch (error) {
      console.error('Error creating habit:', error);
    }
  };

  const handleCompleteHabit = async (habitId) => {
    try {
      await api.post(`/habits/${habitId}/complete`, {
        date: new Date().toISOString(),
      });
      fetchHabits();
    } catch (error) {
      console.error('Error completing habit:', error);
    }
  };

  const handleDeleteHabit = async (habitId) => {
    try {
      await api.delete(`/habits/${habitId}`);
      fetchHabits();
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-100">HabitKit</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNewHabitForm(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
              >
                <PlusCircle size={20} />
                <span>New Habit</span>
              </button>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* New Habit Form Modal */}
        {showNewHabitForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-medium text-gray-100 mb-4">Create New Habit</h2>
              <NewHabitForm 
                onSubmit={handleCreateHabit} 
                onCancel={() => setShowNewHabitForm(false)} 
              />
            </div>
          </div>
        )}

        {/* Habits Grid */}
        <div className="grid gap-4">
          {habits.map(habit => (
            <HabitCard
              key={habit._id}
              habit={habit}
              onComplete={handleCompleteHabit}
              onDelete={handleDeleteHabit}
            />
          ))}
        </div>

        {/* Empty State */}
        {habits.length === 0 && !showNewHabitForm && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No habits tracked yet</p>
            <button
              onClick={() => setShowNewHabitForm(true)}
              className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
            >
              Create your first habit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;