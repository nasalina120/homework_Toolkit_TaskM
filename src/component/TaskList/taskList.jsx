import React from 'react';
import { connect } from 'react-redux';
import { deleteTask } from '../../store/slice/taskSlice';

function TaskList ({ tasks, deleteTaskDyId }) {
  return (
    <ul>
      {tasks.map(t => {
        return (
          <li key={t.id}>
            <label>
              <input type='checkbox' />
              {JSON.stringify(t)}
            </label>
            <button onClick={() => deleteTaskDyId(t.id)}>Видалити</button>
          </li>
        );
      })}
    </ul>
  );
}

const mapDispatchToProps = dispatch => ({
  deleteTaskDyId: id => dispatch(deleteTask(id)),
});

const mapStateToProps = ({ taskList }) => taskList;

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
