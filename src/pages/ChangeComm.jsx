import React from 'react';
import TextField from '@mui/material/TextField';
/* import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'; */
import Paper from '@mui/material/Paper';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import {selectIsAuth } from '../components/redux/slices/auth'; 
import {useNavigate,Navigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
/* import styles from '../AddComment.module.scss'; */
import axios from '../axios';

export const ChangeComm = () => {
    const {id} = useParams();
    const [text, setText] = React.useState('');

    const navigate = useNavigate();
    const onSubmit = async()=> {
        try {
          /* SetLoading(true); */
          const fields ={
            text
          }
          const {data} = await axios.patch(`/updateComm/${id}`, fields) 
        
          const _id = id
          navigate(`/`)
        } catch (error) {
          console.warn(error)
          alert('error on adding post')
        }
        }



    return(
        <>
        <Paper>
            <TextField
            variant="standard"
            placeholder="Text"
            value={text}
            onChange={e=> setText(e.target.value)}
            fullWidth
            >
                
                
            </TextField>
            <div>
        <Button onClick={onSubmit} size="large" variant="contained">
          'Изменить'
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
        </Paper>
        </>
    )
   
}