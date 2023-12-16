import React from 'react';
import styles from './Footer.module.scss';
import Container from '@mui/material/Container';

export const Footer =  ()=>{

return(
    <div className={styles.root}>
       <Container
       maxWidth='lg'
       className={styles.inner}
       >
        <div className={styles.text}>
            Denis Baranovsky CM 2023Y.
        </div>
        </Container> 
    </div>
)
}