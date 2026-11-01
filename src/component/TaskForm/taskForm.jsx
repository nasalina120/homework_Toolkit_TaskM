import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { TASK_VALIDATION_SCHEME } from '../../utils/validSch';
import { createTask } from '../../store/slice/taskSlice';
import styles from './taskForm.module.sass';

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
      {({ errors, touched }) => {
        const textInputClasses = classNames(styles.inputBase, {
          [styles.inputError]: touched.text && errors.text,
          [styles.inputSuccess]: touched.text && !errors.text,
        });

        const deadlineInputClasses = classNames(styles.inputBase, {
          [styles.inputError]: touched.deadline && errors.deadline,
          [styles.inputSuccess]: touched.deadline && !errors.deadline,
        });

        return (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <Field
                name='text'
                type='text'
                placeholder='Що треба зробити?'
                className={textInputClasses}
                autoFocus
              />
              <ErrorMessage
                name='text'
                component='div'
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Field
                type='date'
                name='deadline'
                className={deadlineInputClasses}
              />
              <ErrorMessage
                name='deadline'
                component='div'
                className={styles.errorMessage}
              />
            </div>

            <button type='submit' className={styles.submitBtn}>
              Додати завдання
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

const mapDispatchToProps = dispatch => ({
  createNewTask: data => dispatch(createTask(data)),
});

export default connect(null, mapDispatchToProps)(TaskForm);
