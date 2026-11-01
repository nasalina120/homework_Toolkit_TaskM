import React from 'react';
import { connect } from 'react-redux';

function TaskList ({ tasks }) {
  return (
    <ul>
      {tasks.map(t => {
        return (
          <li key={t.id}>
            <label>
              <input type='checkbox' />
              {JSON.stringify(t)}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

const mapStateToProps = ({ taskList }) => taskList;
export default connect(mapStateToProps)(TaskList);
