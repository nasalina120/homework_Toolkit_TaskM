import React from 'react';
import { connect } from 'react-redux';
import { deleteTask, toggleTaskStatus } from '../../store/slice/taskSlice';
import styles from './taskList.module.sass';
import classNames from 'classnames';

function TaskList ({ tasks, deleteTaskDyId, toggleTask }) {
  return (
    <ul>
      {tasks.map(t => {
        const pClassNames = classNames(styles.taskText, {
          [styles.completedText]: t.isDone,
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

              <p className={pClassNames}>{t.text}</p>
              <p className={styles.taskDeadline}>{t.deadline}</p>
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
