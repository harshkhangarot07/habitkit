const Habit = require('../models/Habit');

const habitController = {
  async create(req, res) {
    try {
      const habit = await Habit.create({
        ...req.body,
        userId: req.user.id,
      });
      res.status(201).json(habit);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const habits = await Habit.find({ userId: req.user.id });
      res.json(habits);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const habit = await Habit.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true }
      );
      if (!habit) {
        return res.status(404).json({ message: 'Habit not found' });
      }
      res.json(habit);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const habit = await Habit.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });
      if (!habit) {
        return res.status(404).json({ message: 'Habit not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async toggleComplete(req, res) {
    try {
      const habit = await Habit.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });

      if (!habit) {
        return res.status(404).json({ message: 'Habit not found' });
      }

      const date = new Date(req.body.date);
      const existingCompletion = habit.completions.find(
        c => c.date.toDateString() === date.toDateString()
      );

      if (existingCompletion) {
        // Remove completion if it exists
        habit.completions = habit.completions.filter(
          c => c.date.toDateString() !== date.toDateString()
        );
      } else {
        // Add completion if it doesn't exist
        habit.completions.push({ date });
      }

      await habit.save();
      res.json(habit);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = habitController;