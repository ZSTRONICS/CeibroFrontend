import { Divider, Grid, makeStyles } from '@material-ui/core'
import { Box, IconButton, TextField, Typography } from '@mui/material'
import CButton from 'components/Button/Button'
import { CBox } from 'components/material-ui'
import { AttachmentIcon, SendIcon } from 'components/material-ui/icons'
import { Fragment, useState } from 'react'
import RecentCommentsList from './RecentCommentsList'

export default function RecentComments(props: any) {
    const [userNewComment, setUserNewComment] = useState<string>();
    const classes = useStyles()
    
    const recentComments = [
        {
            firstName: 'ali', lastName: 'Haider', description: 'hay', createdAt: '27-12-2022', time: '10:26 PM'
        },
        {
            firstName: 'ali ', lastName: 'akbar', description: 'hay ali', createdAt: '27-1202-2022', time: '10:26 PM'
        },
        {
            firstName: 'mubeen', lastName: 'talha', description: 'hay how  are you', createdAt: '273-02-2022', time: '10:26 PM'
        },
        {
            firstName: 'talha', lastName: 'mubeen', description: 'hay i am fine', createdAt: '27-024-2022', time: '10:26 PM'
        },
        {
            firstName: 'khan', lastName: 'mubeen', description: 'hay good', createdAt: '27-02-20224', time: '10:26 PM'
        },

    ]
    return (
        <>
            <Box>
                <Typography className= 'recentComment' sx={{}}>
                Recent Comments
                </Typography>
            </Box>

            {/* {!isEmpty && recentComments.map((comment: any) => (<RecentCommentsList comment={comment} />))} */}
            {recentComments.map((comment: any) => (<Fragment key={comment.createdAt}><RecentCommentsList comment={comment} /></Fragment>))}
            <CBox display='flex'>
                <Grid item xs={12} md={12} className={classes.textAreaBox}>
                    <TextField
                        id="standard-multiline-flexible"
                        // label="Multiline"
                        placeholder="Enter new comment..."
                        onChange={(e) => {
                            setUserNewComment(e.target.value)
                        }}
                        value={userNewComment}
                        multiline
                        maxRows={5}
                        minRows={5}
                        style={{ padding: '10px 10px' }}
                        variant="standard"
                        className={classes.textArea}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <CBox display='flex' alignItems='center' justifyContent='flex-end' width='100%' borderTop='1px solid #DBDBE5' px={1.8} py={1.25}>

                        <CBox display='flex' alignItems='center' className={classes.chatButtonWrapper}>
                            <IconButton>
                                <AttachmentIcon />
                            </IconButton>
                            <Divider orientation='vertical' flexItem variant='fullWidth' style={{ height: 15, width: 1.5, margin: 'auto 8px' }} />
                            &nbsp;
                            <CButton
                                startIcon={<SendIcon />}
                                //handle click to send newMessage here
                                type={"submit"}
                                style={{ maxWidth: 45 }}
                                variant='contained'
                            />
                        </CBox>
                    </CBox>
                </Grid>


                {/* </CBox> */}
                {/* <CBox display='flex'>
                    <Typography className={classes.description} >Magnis dis parturient montes, nascetur Aenean eu leo quam. Pellentesque ornare </Typography>
                    <Divider />
                </CBox> */}


            </CBox>
        </>
    )
}
const useStyles = makeStyles({
    wrapper: {
        padding: '25px 20px',
        backgroundColor: '#F5F7F8'
    },
    heading: {
        fontSize: "12px",
        fontWeight: 600,
        color: '#7D7E80'
    },
    description: {
        fontSize: "12px", fontWeight: 600, color: '#000000', marginBottom: 5
    },

    status: {
        fontSize: 10,
        color: '#fff !important',
        backgroundColor: '#F1B740',
        borderRadius: '3px !important',
        width: '100%',
        maxWidth: '49px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 19,
        marginRight: '5px !important',

    },
    titleLabel: {
        position: 'absolute',
        top: '-10px',
        backgroundColor: '#f5f7f8',
        left: 11,
        color: '#605C5C',
        fontSize: 12,
        fontFamily: 'Inter',
        fontWeight: 600,
    },
    textArea: {
        width: '100%', padding: 15, border: 'none', borderRadius: 5,
        '& textarea:focus': {
            outline: 'none !important',
            borderColor: 'none',
            // boxShadow: '0 0 10px #719ECE',
        }
    },
    textAreaBox: {
        border: '1px solid #DBDBE5',
        borderRadius: 2,
        marginTop: 20,
        position: 'relative',
        '&:hover': {
            borderColor: '#0a95ff',
            borderWidth: '1px',
        },
        '& .css-8q2m5j-MuiInputBase-root-MuiInput-root': {
            '&:before': {
                borderBottom: 'none !important'
            },
            '&:after': {
                borderBottom: 'none !important'
            }
        }

    },
    chatButtonWrapper: {
        '& .css-1d6wzja-MuiButton-startIcon': {
            marginLeft: '8px !important',
            marginRight: '8px !important'
        }
    }


})