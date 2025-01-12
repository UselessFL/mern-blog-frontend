import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import axios from '../axios';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import {useDispatch, useSelector} from 'react-redux';
import { fetchPosts } from '../components/redux/slices/posts';
/* import dateFormat from 'dateformat' */

export const Home = () => {
  const dispatch = useDispatch();
  const {posts, tags} = useSelector(state=>state.posts);
  const userData = useSelector(state=>state.auth.data);

  const isPostLoading = posts.stsus==='loading';

  React.useEffect(()=> {
    dispatch(fetchPosts())
  }, [])

  
console.log(posts)
  return (
    <>
      {/* <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs> */}
      <Grid container spacing={4}>
        <Grid xs={12} item>
          {(isPostLoading? [...Array(5)]: posts.items).map((obj, index) => (
            isPostLoading? (
            <Post key={index} isLoading = {true}/>
            ): (
            <Post
            key= {obj._id}
              _id={obj._id}
              title={obj.title}
              logoUrl = {obj.logoUrl?`http://localhost:4444${obj.logoUrl}`:''} 
                        /*  user={obj.user} */
              createdAt={obj.releaseDate}
             /*  viewsCount={150}
              commentsCount={3} */
              /* tags={['react', 'fun', 'typescript']} */
              genre = {obj.genre}
              isEditable/* ={userData?._id===obj.user._id} */ = {userData?._id==='656dbdab45ff0fd6d35d9721'}
              
            >
              <p>Тип: {obj.type}</p>
              <p>Разработчик: {obj.developer}</p>
              <p>Локализация: {obj.localization}</p>
            {/*   <p>User raiting: {obj.userRating}</p> */}
            </Post>)
          ))}
        </Grid>
        {/* <Grid xs={4} item>
          <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid> */}
      </Grid>
    </>
  );
};
