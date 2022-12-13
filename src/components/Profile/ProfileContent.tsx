import { Grid, Typography } from "@material-ui/core";
import NameAvatar from "components/Utills/Others/NameAvatar";
import React from "react";
import useStyles from "./profileStyles";
import {Box} from '@mui/material'

export default function ProfileContent(props:any) {
    const classes = useStyles()
    const {getUser} = props
  return (
    <>
      <Box component='div' width={50}>
        <NameAvatar
           firstName={getUser?.firstName}
           surName={getUser?.surName}
           url={getUser?.profilePic || ''}
           variant="large"
        />
      </Box>
      <Grid container>
      <Grid item xs={12} className={classes.detailRow}>
              <div>
                <Typography className={classes.title}>Name</Typography>
                <Typography className={classes.value}>{getUser?.firstName}</Typography>
              </div>
              <div>
                <Typography className={classes.title}>Surname</Typography>
                <Typography className={classes.value}>{getUser?.surName}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.detailRow}>
              <div>
                <Typography className={classes.title}>Email</Typography>
                <Typography className={classes.value}>
                  <a className={classes.email} href="#">
                    {getUser?.email}
                  </a>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.detailRow}>
              <div>
                <Typography className={classes.title}>Contact</Typography>
                <Typography className={classes.value}>{getUser?.phone}</Typography>
              </div>
            </Grid>
      </Grid>
    </>
  );
}
