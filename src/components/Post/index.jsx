import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import {useDispatch} from 'react-redux'
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from '../redux/slices/posts';
import {useNavigate,Navigate} from 'react-router-dom'
export const Post = ({
  _id,
  title,
  createdAt,
  logoUrl,
  user,
 /*  viewsCount, */
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
  genre,
}) => {
  const dispatch = useDispatch()
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if(window.confirm('delete?')){
      dispatch(fetchRemovePost(_id))};
      /* return<Navigate to='/'/> */
      window.location.reload()
    }
    

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/Games/${_id}/edit`}> {/*  /Games/:id */}
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
       {logoUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={logoUrl}
          alt={title}
        />
      )} 
      <div className={styles.wrapper}>
       {/*  <UserInfo {...user} additionalText={createdAt} /> */}
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/Games/${_id}`}>{title}</Link>}
          </h2>
          {/* <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul> */}
          {/* <ul className={styles.tags}>
            {genre.map((name) => (
              <li key={name}>
                <Link to={`/genre/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul> */}
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            {/* <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li> */}
           {/*  <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};
