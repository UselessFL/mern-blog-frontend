import React from "react";

import styles from "./AddComment.module.scss";
import {useParams} from 'react-router-dom'
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from '../../axios';
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

export const Index = () => {
  const [text, setText] = React.useState('');
  const [raiting, setraiting] = React.useState('');
  const [authorId, setauthorId] = React.useState('');
  const [gameId, setgameId] = React.useState('');
  const {id} = useParams();
  
  const onSubmit = async(res)=>{
    try{
  const fields = {
    text,
    raiting,
    authorId,
    gameId
  }

  /* const {register, handleSubmit, setError, formState:{errors,isValid}} = useForm({
    defaultValues: {
      text: '',
      raiting: '',
    },
    mode: 'onChange',
  }) */
 /*  
  setauthorId(window.localStorage.getItem('userName'))
   setgameId(window.localStorage.getItem('IDD')) */

   await axios.get('/me').then(res=>{ 
    setauthorId(res.data.fullName)}).then(await axios.get(`/Games/${id}`).then(res=> {
      setgameId(res.data._id)})).then( await axios.post('/comments', fields))

   
      window.location.reload()
  
/*  console.log(fields) */
} catch(error){
  console.warn(error)
 
  
}
}

const options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
]
/* const onInputChange = (
  ()=>{setraiting(raiting)}
  
) */
const handleChange = (selectedOption)=>{
  setraiting(selectedOption.value)
  /* console.log(selectedOption.value) */
}
  return (
    <>
    {}
      <div className={styles.root}>
       {/*  <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        /> */}
        <div className={styles.form}>
          <TextField
          className={styles.textt}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            value={text}
            onChange={e=>setText(e.target.value) }
            multiline
            fullWidth
          />
          <br />
         {/*  <TextField
          
            label="оценка"
            variant="outlined"
            maxRows={1}
            value={raiting}
            onChange={e=> setraiting(e.target.value)  }
            multiline
            fullWidth = {false}
            type="number"
           
          /> */}
          <Select  options={options} 
          label='оценка'
          /* value={raiting} */
          onChange={handleChange}
          defaultValue={options[0]}
          /* onInputChange={onInputChange } */
         
          />
          <br />
          <Button onClick={onSubmit}  variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
