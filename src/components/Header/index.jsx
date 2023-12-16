import React from 'react';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth,selectIsModder } from '../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
 
  const userData = useSelector(state=>state.auth.data);
  const isModder =  userData?._id==='656dbdab45ff0fd6d35d9721'
/*   console.log(`is modder - ${isModder}`) */
  /* const Modder = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZTdmM2RmOGRlZTZkY2MwYzgzNjUiLCJpYXQiOjE3MDE5NjQyNjgsImV4cCI6MTcwNDU1NjI2OH0.ZkgUXpm-UJvRWlZxs2SEmNwvtni7UFXe6Hj3vucaZYo' */

  const onClickLogout = () => {
    if (window.confirm('logout?')){
      dispatch(logout())
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('userName')
      window.localStorage.removeItem('IDD')
      window.localStorage.removeItem('isModderCom')
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>GAMES</div>
          </Link>
         {/*  <a className={styles.logo} href="/">
            <div>GAMES</div>
          </a> */}
          <div className={styles.buttons}>
            {isAuth ? ( //добавить модерацию 
              <>
               { isModder?(
                <>
               <Link to="/add-game">
                  <Button variant="contained">Создать игру</Button>
                </Link>
               <Link to="/login">
                  <Button variant="contained">добавить Моддератора</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                Выйти
              </Button>
              </>
                ):
                (
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
                )}
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
