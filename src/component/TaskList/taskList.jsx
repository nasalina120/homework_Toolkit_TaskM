import React from 'react';
import { connect } from 'react-redux';
import { deleteTask, toggleTaskStatus } from '../../store/slice/taskSlice';
import styles from './taskList.module.sass';
import classNames from 'classnames';

const checkIsExpired = task => {
  if (task.isDone) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDeadline = new Date(task.deadline);
  taskDeadline.setHours(0, 0, 0, 0);

  return taskDeadline < today;
};

function TaskList ({ tasks, deleteTaskDyId, toggleTask }) {
  return (
    <ul className={styles.taskList}>
      {tasks.map(t => {
        const isExpired = checkIsExpired(t);

        const taskContentClassNames = classNames(styles.taskText, {
          [styles.completedText]: t.isDone,
          [styles.expiredText]: isExpired,
        });

        return (
          <li key={t.id} className={styles.taskLi}>
            <label className={styles.taskLabel}>
              <input
                type='checkbox'
                className={styles.taskCheckbox}
                checked={t.isDone}
                onChange={() => toggleTask(t.id)}
              />

              <p className={taskContentClassNames}>{t.text}</p>
              <p className={taskContentClassNames}>{t.deadline}</p>
            </label>
            <button
              className={styles.deleteBtn}
              onClick={() => deleteTaskDyId(t.id)}
            >
              Видалити
            </button>
          </li>
        );
      })}
    </ul>
  );
}

const mapDispatchToProps = dispatch => ({
  deleteTaskDyId: id => dispatch(deleteTask(id)),
  toggleTask: id => dispatch(toggleTaskStatus(id)),
});

const mapStateToProps = ({ taskList }) => taskList;

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
