import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  deleteTask,
  getTasksThunk,
  toggleTaskStatus,
} from '../../store/slice/taskSlice';
import styles from './taskList.module.sass';
import classNames from 'classnames';

const checkIsExpired = task => {
  if (task.completed) return false;
  if (!task.deadline) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDeadline = new Date(task.deadline);
  taskDeadline.setHours(0, 0, 0, 0);

  return taskDeadline < today;
};

function TaskList ({
  tasks,
  isFetching,
  error,
  deleteTaskById,
  toggleTask,
  getTasks,
}) {
  useEffect(() => {
    getTasks();
  }, []);

  const mapTasks = t => {
    const isExpired = checkIsExpired(t);

    const taskContentClassNames = classNames(styles.taskText, {
      [styles.completedText]: t.completed,
      [styles.expiredText]: isExpired,
    });

    return (
      <li key={t.id} className={styles.taskLi}>
        <label className={styles.taskLabel}>
          <input
            type='checkbox'
            className={styles.taskCheckbox}
            checked={t.completed}
            onChange={() => toggleTask(t.id)}
          />

          <p className={taskContentClassNames}>{t.title}</p>
          <p className={taskContentClassNames}>{t.deadline}</p>
        </label>
        <button
          className={styles.deleteBtn}
          onClick={() => deleteTaskById(t.id)}
        >
          Видалити
        </button>
      </li>
    );
  };

  return (
    <>
      {isFetching && <div> Loading ...</div>}
      {error && <div> !!!error!!! </div>}
      {!isFetching && !error && (
        <ul className={styles.taskList}>{tasks.map(mapTasks)}</ul>
      )}
    </>
  );
}

const mapStateToProps = ({ taskList }) => ({
  ...taskList,
});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(getTasksThunk()),
  deleteTaskById: id => dispatch(deleteTask(id)),
  toggleTask: id => dispatch(toggleTaskStatus(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
