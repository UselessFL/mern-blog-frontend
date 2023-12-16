import React from "react";
import {Navigate, useParams} from 'react-router-dom'
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import dateFormat, { masks } from "dateformat"
import {useDispatch, useSelector} from 'react-redux';
import { fetchComments } from "../components/redux/slices/comment";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { logout, selectIsAuth,selectIsModder } from '../../src/components/redux/slices/auth';
import {Link} from 'react-router-dom'
export const FullPost = () => {
  const[data, setData]= React.useState();
  const [comment, SetComment] = React.useState();
  const[isLoading, setLoading]= React.useState(true);
  const [isModderCom,setisModderCom] = React.useState(false)
  const {id} = useParams();
  const dispatch = useDispatch();
  const {comments} = useSelector((state)=>state.comments)
  const isCommLoading = comments.status ==='loading';
 /*  const [raiting, setraiting] = React.useState(''); */
  const isAuth = useSelector(selectIsAuth);
  /* const isModderCom = async()=> {
    await axios.get('/me')(res=>{
      return (res.data.isModder)
    })
  }; */
  const getInfo = async() =>{
  await axios.get('/me').then
    (res=>{ 
    const UserName = res.data.fullName
    /* const isModderCom = res.data.isModder */
    setisModderCom(res.data.isModder)
    window.localStorage.setItem('userName',UserName)
    /* window.localStorage.setItem('isModderCom',isModderCom) */
    
  })
 
}


/* const isModderCom = window.localStorage.getItem('isModderCom')   */
/* console.log(`is modder com? ${isModderCom}`) */
  getInfo();
  
  
React.useEffect(()=> {
  axios.get(`/Games/${id}`).then(res=> {
    setData(res.data)
    setLoading(false)
    const IDD=res.data._id
   
    window.localStorage.setItem('IDD',IDD)
   
  }).catch(err=> {
    console.warn(err);
    alert('ошибка при загрузке игры')
  })
}, [])
/* let abc = [];
const test = isCommLoading?'' : comment.items.map((obj)=>(
 abc += obj.raiting
)) */
let raiting = 0;
if (!isCommLoading){
  let abc = [];
  const aaa = false
  comments.items.map((obj)=>(
    obj.gameId === window.localStorage.getItem('IDD')?
    (abc.push(obj.raiting) ): ''))
    
    let raiting2 = 0;
  let a = 0;
 /*  if(obj.gameId ===window.localStorage.getItem('IDD')){} */
   
  for(let x = 0; x != abc.length; x++){
    if(Number(abc[x])){
      a+=1;
      raiting2 = Math.round((raiting2 + Number(abc[x])))
      /* console.log(`${raiting2}  ${x}  ${Number(abc[x])}`) */
    }
  }
  raiting2 = raiting2/(a)
  console.log(raiting2 + "  " + a)
  raiting = Math.round(raiting2);
}

React.useEffect(()=>{
  dispatch(fetchComments())
},[])

console.log(comments)
console.log(isCommLoading)

/* const  onClickDelete = async(_id) =>{
if(window.confirm('delete?')){
  await axios.delete(`deleteComm/${_id}`)
}
} */
if(isLoading){
  return <Post isLoading={isLoading}/>
}
  return (
    <>
      <Post
        id={data.id}
        title= {data.title}
        logoUrl = {data.logoUrl?`http://localhost:4444${data.logoUrl}`:''}   
        
        isFullPost
      >
              <p>Тип: {data.type}</p>
              <p>Жанр: {data.genre}</p>
              <p>Разработчик: {data.developer}</p>
              <p>Локализация: {data.localization}</p>
              <p>Пользовательский Рейтинг: {raiting}</p>
              <p>Дата выхода: {dateFormat(data.releaseDate, 'yyyy.mm.dd')}</p>
              <p>Издательт: {data.publisher}</p>
              <p>Платформы: {data.devices}</p>
              {data.series?(<p> <Link to={"/Games/"+ data.series} target="_blank"
              
              ><div>Prvius game</div></Link></p>):("")}
              
              <p>Description: {data.description}</p>
      </Post>
   
      <>
      {isAuth?(
        <>
      <Index/>
      <Button
  onClick={() => {
    (window.location.reload())  
  }}
>
  подтвердить?
</Button>

      </>):('')}
         {(
            (isCommLoading ? [...Array(3)]:  comments.items).map((obj, index)=>(
            
              isCommLoading?(
                
              <CommentsBlock key={index} isLoading={true}/>
  
              ):(
            
                obj.gameId ===window.localStorage.getItem('IDD') ? (
                <>
                
                <Box
                sx={{ border: 1,
                  borderRadius: '6px',
                  p:1,
                  borderColor: 'grey.500',
                  background: 'white'
                  }}
                >
                <p>Автор: {obj.authorId}</p>
                <p> {obj.text}</p>
                <p> Оценка: {obj.raiting}</p>
                {isModderCom?(<>
                  <Button
                    color="error"
                      onClick={async() => {
                        if(window.confirm('delete?')){
                          await axios.delete(`deleteComm/${obj._id}`)
                          window.location.reload() 
                      }
                      }}
                    >
                      Удалить
                    </Button>
                  
                    <form action={`/ChangeComm/${obj._id}`}>
                        <Button type="submit"
                        >Редактировать</Button>
                    </form>

                </>):("")}
                    
                </Box>
               < br></br>
                </>
                ) : ('')
              )
              
            ))
          )
        } 
        
        
        
      </>
      
    </>
  );
};
