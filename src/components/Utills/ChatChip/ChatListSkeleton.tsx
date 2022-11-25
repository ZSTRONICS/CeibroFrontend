import { Grid } from '@material-ui/core'
import { CBox, CSkeleton } from 'components/material-ui';
import React from 'react'
import useStyles from './ChatListStyles'

export const ChatListSkeleton = () => {
    const classes = useStyles();

    return (
        <div>
            <Grid
                className={classes.chatListWrapper}
                container

            >
                <Grid container>
                    {/* <Grid item xs={1} className={classes.bookMarkWrapper}>
          {unreadCount && unreadCount > 0 && <div className={classes.dot}></div>}
        </Grid> */}
                    <Grid item xs={2} className={classes.avatarWrapper}>
                        <CBox>

                            <CSkeleton variant="circular" height={40} width={40} />
                        </CBox>
                    </Grid>

                    <Grid item xs={6} className={classes.messageDetailWrapper}>
                        dasd
                    </Grid>

                    <Grid item xs={2} className={classes.timeOuterWrapper}>
                        <div>
                            da
                        </div>
                        <div className={classes.timeWrapper}>
                            d
                            {/* {unreadCount && unreadCount > 0 && (
                                <Badge
                                    overlap="circular"
                                    badgeContent={unreadCount}
                                    color="error"
                                ></Badge>
                            )}
                            <Typography className={classes.time}>{lastMessageTime}</Typography> */}
                        </div>
                    </Grid>

                    <Grid item xs={1} className={classes.timeWrapper}>
                        d
                        {/* <ChatListMenu room={chat} /> */}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={6} style={{ paddingLeft: 6 }}>
                        dsa
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
