import React from 'react';
import TaskList from '../component/TaskList/taskList';
import TaskForm from '../component/TaskForm/taskForm';

export default function TaskPage () {
  return (
    <main>
      <h2>Мої завдання</h2>
      <TaskForm />
      <TaskList />
    </main>
  );
}
