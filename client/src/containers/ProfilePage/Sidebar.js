import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, TextField } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';
import UserContext from "../../context/UserContext/UserContext";
import { updateUser } from "../../api";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "20px"
  },
  content: {
    justifyContent: "center",
    textAlign: "center"
  },
  details: {
    marginTop: "0px",
    marginBottom: "50px"
  },
  chip: {
    padding: "0 5px",
    margin: "2px 5px"
  },
  about: {
    marginTop: "2rem",
    alignItems: "left",
    textAlign: "left"
  }
}));

export default function ProfilePage() {
  const { userInfo, updateUserInPage } = useContext(UserContext);
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const updateUserInfo = async () => {
    const result = await updateUser(userInfo.id, username, email, password);
    if (result.success) {
      alert("Update Successfully!")
      updateUserInPage(result.data.user);
    } else {
      alert("Fail to Update")
    }

    handleClose();
  }

  return (
    <React.Fragment>
      <div container>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            className={classes.profileImage}
            alt="profileImg"
            src="https://source.unsplash.com/random"
          />
        </div>
        <div className={classes.content}>
          <Typography component="h1" variant="h4"> {userInfo.username || "Unknown"} </Typography>
          <Button variant="outlined" color="primary" fullWidth style={{ marginBottom: "20px" }} onClick={handleClickOpen}>
            Update Information
          </Button>

          <Dialog open={open} onClose={handleClose} style={{ padding: "30px" }}>
            <DialogTitle>Modify User Information</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Update your username, email, and password.
              </DialogContentText>
              <TextField autoFocus margin="dense" id="username" label="Username" type="text" fullWidth
                value={username} onChange={handleUsernameChange}
              />
              <TextField margin="dense" id="email" label="Email" type="email" fullWidth
                value={email} onChange={handleEmailChange}
              />
              <TextField margin="dense" id="password" label="Password" type="password" fullWidth
                value={password} onChange={handlePasswordChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={updateUserInfo} color="primary" autoFocus>
                Save
              </Button>
            </DialogActions>
          </Dialog>

          <Grid container justify="space-between">
            <Grid item> <p>Username</p> </Grid>
            <Grid item> <p>{userInfo.username || "No data"}</p></Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item> <p> Email </p> </Grid>
            <Grid item> <p> {userInfo.email || "No data"} </p> </Grid>
          </Grid>
          <Grid container justify="space-between" className={classes.details}>
            <Grid item> <p> Address </p> </Grid>
            <Grid item> <p> Waterford, Ireland </p> </Grid>
          </Grid>

          <div>
            <div className={classes.about}>
              <Typography component="h3" variant="h6">
                Recipes:
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "20px", padding: "0 30px" }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 20px' }}>
                  <FavoriteIcon style={{ fontSize: '24px' }} />
                  <span style={{ fontSize: '20px' }}>{userInfo.likes.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 20px' }}>
                  <PublishIcon style={{ fontSize: '24px' }} />
                  <span style={{ fontSize: '20px' }}>{userInfo.publish.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 20px' }}>
                  <DeleteIcon style={{ fontSize: '24px' }} />
                  <span style={{ fontSize: '20px' }}>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
