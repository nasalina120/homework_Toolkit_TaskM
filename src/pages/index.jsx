import React from 'react';
import TaskList from '../component/TaskList/taskList';
import TaskForm from '../component/TaskForm/taskForm';
import styles from './taskPage.module.sass';
import HeaderUser from '../component/HeaderUser/headerUser';

export default function TaskPage () {
  return (
    <>
      <header>
        <HeaderUser />
      </header>
      <main>
        <article className={styles.container}>
          <h2 className={styles.title}>Мої завдання</h2>
          <TaskForm />
          <TaskList />
        </article>
      </main>
    </>
  );
}
