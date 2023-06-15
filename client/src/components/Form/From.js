import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { CreatePostAsync, UpdatePostAsync } from "../../slices/postsSlice";

export default function From({ currentId, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(currentId);
    if(currentId){
      console.log(postData);
      dispatch(UpdatePostAsync({id: currentId, post: postData}));
    } else {
      dispatch(CreatePostAsync(postData));
    }
    clear();
  };

  useEffect(() => {
    if (currentId) {
      const post = posts.posts.find((post) => post._id === currentId);
      setPostData(post);
    } else {
      setPostData({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
      });
    }
  }, [currentId, posts.posts]);

  const clear = () => {
    setCurrentId(0);
  };
  
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a memory</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
}
