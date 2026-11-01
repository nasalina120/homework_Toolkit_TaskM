import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import { TASK_VALIDATION_SCHEME } from '../../utils/validSch';
import { connect } from 'react-redux';
import { createTask } from '../../store/slice/taskSlice';

function TaskForm ({ createNewTask }) {
  const initialValues = {
    text: '',
    deadline: '',
  };

  const submitHandler = (values, { resetForm }) => {
    createNewTask(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      validationSchema={TASK_VALIDATION_SCHEME}
    >
      <Form>
        <Field
          name='text'
          type='text'
          placeholder='Що треба зробити?'
          autoFocus
        />
        <ErrorMessage name='text' component='div' />
        <Field type='date' name='deadline' />
        <ErrorMessage name='deadline' component='div' />
        <button type='submit'>Додати завдання</button>
      </Form>
    </Formik>
  );
}

const mapDispatchToProps = dispatch => ({
  createNewTask: data => dispatch(createTask(data)),
});

export default connect(null, mapDispatchToProps)(TaskForm);
