import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import UserContext from "../../../context/UserContext/UserContext";
import { getCommentsById, addComment, editComment, deleteComment } from "../../../api";
import { Divider, Avatar, Grid, Paper, TextField, Button, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

const imgLink = "https://source.unsplash.com/random";

function CommentBox(props) {
  const recipeId = props.id;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await getCommentsById(recipeId);
      setComments(response.data);
    }

    fetchComments();
  }, [recipeId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.username === "") {
      alert("Please login to comment");
      return;
    }
    if (comment.trim() !== "") {
      const commentObject = {
        recipeId: recipeId,
        username: userInfo.username,
        content: comment,
        date: new Date()
      };
      const response = await addComment(JSON.stringify(commentObject));
      if (response.success) {
        setComments([...comments, response.data]);
        setComment("");
      } else {
        alert("Failed to add comment");
      }
    }
  };

  const formatTime = (timestamp) => {
    const currentTime = moment();
    const postTime = moment(timestamp);
    const diffMinutes = currentTime.diff(postTime, "minutes");

    if (diffMinutes < 1) {
      return "just now";
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffMinutes < 1440) {
      const diffHours = Math.floor(diffMinutes / 60);
      return `${diffHours} hours ago`;
    } else {
      const diffDays = Math.floor(diffMinutes / 1440);
      return `${diffDays} days ago`;
    }
  };

  const handleEditComment = async (index) => {
    const updatedComments = [...comments];
    const editedContent = window.prompt("Edit the comment", comments[index].content);
    if (editedContent !== null) {
      const response = await editComment(comments[index]._id, JSON.stringify({ content: editedContent }));
      if (response.success) {
        updatedComments[index].content = editedContent;
        setComments(updatedComments);
      } else {
        alert("Failed to edit this comment.");
      }
    }
  };

  const handleDeleteComment = async (index) => {
    const updatedComments = [...comments];
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (confirmDelete) {
      const response = await deleteComment(comments[index]._id);
      if (response.success) {
        updatedComments.splice(index, 1);
        setComments(updatedComments);
      } else {
        alert("Failed to delete this comment.");
      }
    }
  };

  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} className="comment">
      <h1 className="text-4xl text-copy-primary text-center font-bold py-2">
        Comments{" "}
        <span role="img" aria-label="icon">
          📝
        </span>
      </h1>
      <Paper style={{ padding: "40px 20px", width: "80%" }}>
        <form onSubmit={handleCommentSubmit}>
          <TextField
            label="Add a comment"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 10 }}
            disabled={comment.length === 0}
          >
            Submit
          </Button>
        </form>

        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        {
          comments.map((comment, index) => (
            <Grid container wrap="nowrap" spacing={3} key={index}>
              <Grid item>
                <Avatar alt="img" style={{ marginTop: "20px" }} src={imgLink} />
              </Grid>
              <Grid justifycontent="left" item xs zeroMinWidth>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h4 style={{ margin: 0, textAlign: "left" }}>{comment.username}</h4>
                  {comment.username === userInfo.username && (
                    <div>
                      <IconButton onClick={() => handleEditComment(index)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteComment(index)}>
                        <Delete />
                      </IconButton>
                    </div>
                  )}
                </div>
                <p style={{ textAlign: "left" }}>{comment.content}</p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted {formatTime(comment.date)}
                </p>
              </Grid>
            </Grid>
          ))
        }
      </Paper>
    </div>
  );
}

export default CommentBox;