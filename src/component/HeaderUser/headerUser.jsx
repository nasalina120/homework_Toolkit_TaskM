import React, { useEffect } from 'react';
import { getUserThunk } from '../../store/slice/userSlice';
import { connect } from 'react-redux';
import styles from './headerUser.module.sass';

function HeaderUser ({ users, isFetching, error, getUser }) {
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={styles.header}>
      <h1 className={styles.logo}>Todo App</h1>
      <div className={styles.widgetZone}>
        {isFetching && <div className={styles.loader}>Loading ...</div>}
        {error && <div className={styles.error}>!!!error!!!</div>}

        {!isFetching &&
          !error &&
          users &&
          users.picture &&
          (() => {
            const { name, picture } = users;
            return (
              <div className={styles.userContainer}>
                <img
                  src={picture.thumbnail}
                  alt='avatar'
                  className={styles.avatar}
                />
                <p className={styles.name}>
                  {name.first} {name.last}
                </p>
              </div>
            );
          })()}
      </div>
    </div>
  );
}

const mapStateToProps = ({ userList }) => ({ ...userList });
const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUserThunk()),
});
export default connect(mapStateToProps, mapDispatchToProps)(HeaderUser);
