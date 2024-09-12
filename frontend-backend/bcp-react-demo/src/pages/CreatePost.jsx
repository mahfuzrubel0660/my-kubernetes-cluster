import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { createPost, getSinglePost } from "../api/api";
import { Navbar } from "../components/common";
import { CustomizedTables } from "../components/MaterialTable";
import { alertContext } from "../hooks/alertContext";

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const { setAlertPopupContext } = useContext(alertContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  const handleSubmit = () => {
    console.log(postTitle, postDescription);
    createPost({ title: postTitle, body: postDescription })
      .then((res) => {
        console.log(res);
        setAlertPopupContext({
          message: "Post added",
          type: "success",
        });
        loadData();
      })
      .catch((err) => {
        setAlertPopupContext({
          message: "Post add failed",
          type: "error",
        });
      });
    clearAllField();
  };

  const loadData = () => {
    const uid = localStorage.getItem("uid");
    getSinglePost(uid).then((res) => {
      console.log(res);
      setData(res.data);
    });
  };

  const clearAllField = () => {
    setPostTitle("");
    setPostDescription("");
  };
  const columnsNames = ["Title", "Description"];

  return (
    <>
      <Navbar />
      <Container component="main">
        <Typography component="h1" variant="h5">
          Create a new post
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Post Title"
          name="title"
          autoComplete="title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value.trimStart())}
          size="small"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="description"
          label="Post Description"
          value={postDescription}
          id="description"
          onChange={(e) => setPostDescription(e.target.value.trimStart())}
          size="small"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!postTitle || !postDescription}
          onClick={handleSubmit}
        >
          Add Post
        </Button>

        {data?.length > 0 && (
          <Box>
            <CustomizedTables columnsNames={columnsNames} data={data} />
          </Box>
        )}
      </Container>
    </>
  );
};

export default CreatePost;
