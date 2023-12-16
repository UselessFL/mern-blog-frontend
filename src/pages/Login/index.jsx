import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from 'react-hook-form'
import styles from "./Login.module.scss";
import {fetchAuth, selectIsAuth, fetchUsers} from '../../components/redux/slices/auth'
import {Navigate} from 'react-router-dom'
import axios from '../../axios'
import Box from '@mui/material/Box';

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [id, setid] = React.useState('');
  const users = useSelector(state=>state.auth)
  const {register, handleSubmit, setError, formState:{errors,isValid}} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

const isUsersLoading = users.status === 'loading';
console.log(`avc ${isUsersLoading}`)
React.useEffect(()=>{
  dispatch(fetchUsers())
},[])
 

  const userData = useSelector(state=>state.auth.data);
  const isModder =  userData?._id==='656dbdab45ff0fd6d35d9721'
  const onSubmit = async(values) => {
   const data = await dispatch(fetchAuth(values));  
   if(!data.payload){
    return alert('не удалось авторизоваться')
   }

   if('token' in data.payload){
    window.localStorage.setItem('token', data.payload.token)
   }
  }
  
  const onSubmitM = async() => { 
   await axios.patch(`/modder/${id}`)
   window.location.reload()
   /* console.log(id) */
   }
  /* React.useEffect */
  

  /* console.log('isAuth', isAuth); */
  if(!isModder){
    if(isAuth ){
    return<Navigate to='/'/>
  }}
  
  /* if (){
    return
  } */
  console.log(users)
  return (
    <>
    <Paper classes={{ root: styles.root }}>
      
      {isModder? (
        <>
        {(isUsersLoading?[...Array(5)]:users.items).map((obj, index)=>(
          isUsersLoading?(<p>Загругка</p>):(
            <>
           
            <Box
            
            sx={{ border: 1,
              borderRadius: '6px',
              p:1,
              borderColor: 'grey.500'
              }}>
            <p>User:{obj._id}</p>
          
            <p>Name:{obj.fullName}</p>
              <p>Modder?:{obj.isModder? "true": "false"}</p>
            </Box>
           
            </>
          )
        ))}
        
        <Typography classes={{ root: styles.title }} variant="h5">
        Добавление моддератора
      </Typography>
      
      <TextField
      className={styles.field}
      label="ID"
        type = 'string'
        fullWidth
        value={id}
        onChange={e=> setid(e.target.value) }
      />
      <Button  onClick={onSubmitM} size="large" variant="contained" fullWidth>
        Зарегистрировать 
        </Button>
       
        </>
       ): (
        <>
        <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={styles.field}
        label="E-Mail"
        type = 'email'
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', {required: 'Укажите почту'})}
        fullWidth
      />
      <TextField className={styles.field} 
      label="Пароль" 
      error={Boolean(errors.password?.message)}
      helperText={errors.password?.message}
     
      {...register('password', {required: 'Укажите пароль'})}
      fullWidth />
      <Button disabled={!isValid}  type='submit' size="large" variant="contained" fullWidth>
        Войти
      </Button>
      </form>
     
      </>
      )}
      
    </Paper>
     <div className={styles.box}>
asdf
     </div>
     </>
  );
};
