import { Container, Grid, Grow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from '../Form/From';
import { postsAsync } from '../../slices/postsSlice';
import Posts from '../Posts/Posts';
import useStyles from "./styles";

export default function Home() {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    
    useEffect(() => {
      console.log("hello");
      dispatch(postsAsync());
    }, [dispatch]);

  return (
    <Grow in>
        <Container>
          <Grid
            className={classes.gridContainer}
            container
            spacing={3}
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Grid item sm={12} md={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item sm={12} md={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}
