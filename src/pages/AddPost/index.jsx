import React from 'react';
import TextField from '@mui/material/TextField';
/* import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'; */
import Paper from '@mui/material/Paper';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import {selectIsAuth } from '../../components/redux/slices/auth'; 
import {useNavigate,Navigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from '../../axios';




export const AddPost = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, SetLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
/*   const [tags, setTags] = React.useState(''); */
  const [logoUrl, SetlogoUrl] = React.useState('');
  const [genre, Setgenre] = React.useState('');
  const [type, Settype] = React.useState('');
  const [releaseDate, SetreleaseDate] = React.useState('');
  const [developer, Setdeveloper] = React.useState('');
  const [publisher, Setpublisher] = React.useState('');
  const [localization, Setlocalization] = React.useState('');
  const [ageRating, SetageRating] = React.useState('');
  const [description, Setdescription] = React.useState('');
  const [devices, Setdevices] = React.useState('');
  const [series, Setseries] = React.useState('');

  const isEdititng = Boolean(id)

  const inputFileRef = React.useRef('Null')

  const handleChangeFile = async(event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0]
      formData.append('image',file)
      const {data} = await axios.post('/upload', formData)
      SetlogoUrl(data.url);
    } catch (error) {
      console.warn(error)
      alert('error on adding an image')
    }
  };

  const onClickRemoveImage = () => {
    SetlogoUrl ('')
  };

  const onChange = React.useCallback((value) => {
    Setdescription(value);
  }, []);
  

const onSubmit = async()=> {
try {
  SetLoading(true);
  const fields ={
    title,
    logoUrl,
    text,
    genre,
    type,
    releaseDate,
    developer,
    publisher,
    localization,
    ageRating,
    description,
    devices,
    series,

  }
  const { data} = isEdititng? await axios.patch(`/Games/${id}`, fields) : await axios.post('/Games', fields)

  const _id = isEdititng? id: data._id
  navigate(`/Games/${_id}`)
} catch (error) {
  console.warn(error)
  alert('error on adding post')
}
}
React.useEffect(()=>{
  if(id){
    axios.get(`/Games/${id}`).then(({data})=>{
      setTitle(data.title)
      SetlogoUrl(data.logoUrl)
      Setgenre(data.genre)
      Settype(data.type)
      SetreleaseDate(data.releaseDate)
      Setdeveloper(data.developer)
      Setpublisher(data.publisher)
      Setlocalization(data.localization)
      SetageRating(data.ageRating)
      Setdescription(data.description)
      Setdevices(data.devices)
      Setseries(data.series)
    })
  }
},[])
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Описание ',
      status: false,
      /* autosave: {
        enabled: true,
        delay: 1000,
      }, */
      toolbar: '',
    }),
    [],
  );
  if(!window.localStorage.getItem('token') && !isAuth){
    return<Navigate to='/'/>
  }
 /*  console.log({title, tags,value}) */
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={()=>inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {logoUrl && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
         <img className={styles.image} src={`http://localhost:4444${logoUrl}`} alt="uploads" />
         </>
      )}
      
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Название игры"
        value = {title}
        onChange={e=> setTitle(e.target.value)}
        fullWidth

      />
      <br/>
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Жанры"
        value = {genre}
        onChange={e=> Setgenre(e.target.value)}
        fullWidth
      />
     <br/>
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тип игры"
        value = {type}
        onChange={e=> Settype(e.target.value)}
        fullWidth
      />
     <br/>
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Разработчик"
        value = {developer}
        onChange={e=> Setdeveloper(e.target.value)}
        fullWidth
      />
     <br/>
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Издатель"
        value = {publisher}
        onChange={e=> Setpublisher(e.target.value)}
        fullWidth
      />
     <br/>
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Локализация"
        value = {localization}
        onChange={e=> Setlocalization(e.target.value)}
        fullWidth
      />
     <br/>
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Возрастной рейтинг"
        value = {ageRating}
        onChange={e=> SetageRating(e.target.value)}
        fullWidth
      />
     <br/>
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Девайсы"
        value = {devices}
        onChange={e=> Setdevices(e.target.value)}
        fullWidth
      />
     <br/>
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Предидущиая игра"
        value = {series}
        onChange={e=> Setseries(e.target.value)}
        fullWidth
      />
      {/* <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Дата создания"
        value = {releaseDate}
        onChange={e=> SetreleaseDate(e.target.value)}
        fullWidth
      /> */}
     <br/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
      selected = {releaseDate}
      onChange = {e=> SetreleaseDate(e)} 
      />
      </LocalizationProvider>
     <br/>

      {/* <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Тэги"  value = {tags}
        onChange={e=> setTags(e.target.value)} fullWidth /> */}

     {/*  <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} /> */}
      <SimpleMDE className={styles.editor} value={description} onChange={onChange} options={options} />

      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEdititng?'Изменить': 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
