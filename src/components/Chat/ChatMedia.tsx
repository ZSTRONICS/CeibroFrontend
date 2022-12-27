import { Grid, Typography } from "@material-ui/core";
import Tab, { tabClasses } from '@mui/joy/Tab';
import { CBox } from "components/material-ui";
import React from "react";
import FilePreviewer from "../Utills/ChatChip/FilePreviewer";

import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';

import NameAvatar from "components/Utills/Others/NameAvatar";
import assets from '../../assets/assets'
import useStyles from './ChatMediaStyles';
import { ListViewIcon } from "components/material-ui/icons";
interface chatMInt {
  media: any;
}

const ChatMedia: React.FC<chatMInt> = (props) => {
  const classes = useStyles({})
  const { media } = props;
  const [index, setIndex] = React.useState(0);

  return (
    <CBox>
      <CBox fontSize={22} fontWeight={600} fontFamily='Inter' color='#000000' mb={2.5}>
        Media & Files
      </CBox>
      <Tabs
        aria-label="Pipeline"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
        sx={{ '--Tabs-gap': '0px' }}

      >
        <CBox display='flex' justifyContent='space-between'>
          <CBox flex='2 1 0' maxWidth={'70%'}>
            <TabList
              variant="plain"
              sx={{
                width: '100%',
                maxWidth: 400,
                pl: 0,
                marginBottom: '20px',

                // mx: 'auto',
                // pt: 2,
                // alignSelf: 'flex-start',
                [`& .${tabClasses.root}`]: {
                  boxShadow: 'none',
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  fontSize: '14px',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                  [`&.${tabClasses.selected}`]: {
                    color: '#0076C8',

                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      zIndex: 1,
                      bottom: '-1px',
                      width: '35%',
                      // left: '0px',
                      // right: '65px',
                      height: '2px',
                      borderTopLeftRadius: '3px',
                      borderTopRightRadius: '3px',
                      bgcolor: '#0076C8',
                    },
                  },
                },
              }}

            >
              <Tab>Media </Tab>
              <Tab>Docs</Tab>
              <Tab>Voice note</Tab>
            </TabList>
          </CBox>
          {/* <CBox flex='1 1 0' display='flex' justifyContent='flex-end' className={classes.view}>
            {<assets.GridViewIcon />}
            &nbsp;
            &nbsp;
            <ListViewIcon />
          </CBox> */}
        </CBox>



        <TabPanel value={0}>


          <div className="chat-member-chip">
            {[...Array(5)].map(() => (
              <CBox display='flex' justifyContent='space-between' className={classes.chatList}>
                <CBox flex='2 1 0' display='flex' alignItems='center'>
                  <CBox className={classes.imgBox}>
                    <NameAvatar
                      // styleAvater={}
                      firstName={'ramiz'}
                      surName={''}
                      url={media}
                      variant="small"

                    />
                    <CBox className={classes.playVideo}>
                      {<assets.PlayCircleOutlineIcon />}
                    </CBox>
                  </CBox>
                  <CBox className={classes.memberPreview}>
                    <Typography
                      className={`chat-member-name ${classes.memberName}`}
                    >
                      Andres Kütt
                    </Typography>



                    <CBox display='flex' alignItems='center'>

                      <Typography
                        className={`${classes.memberCompany} chat-member-company`}

                      >
                        Company
                      </Typography>
                      &nbsp;
                      <Typography
                        className={`${classes.memberCompany} chat-member-company`}
                      >
                        &nbsp;
                        &nbsp;
                        &nbsp;

                        fsd
                      </Typography>

                    </CBox>
                    <CBox display='flex' alignItems='center'>

                      <Typography
                        className={`${classes.size} chat-member-company`}

                      >
                        Size:
                      </Typography>
                      &nbsp;
                      <Typography
                        className={`${classes.size} chat-member-company`}
                      >



                        9Mb
                      </Typography>

                    </CBox>

                  </CBox>
                </CBox>


                <CBox display='flex' color='#605C5C' fontSize={12} fontWeight={600} fontFamily='Inter' flexDirection='column' justifyContent='center' alignItems='flex-end' flex='1 1 0'>
                  <CBox>
                    22/08/2020
                  </CBox>
                  <CBox>
                    10:18 AM
                  </CBox>

                </CBox>
              </CBox>
            )

            )}


          </div>





        </TabPanel>
        <TabPanel value={1}>

          {[...Array(5)].map(() => (
            <CBox display='flex' justifyContent='space-between' className={classes.chatList}>
              <CBox flex='2 1 0' display='flex' alignItems='center'>
                <CBox className={classes.imgBox}>
                  <NameAvatar
                    // styleAvater={}
                    firstName={'ramiz'}
                    surName={''}
                    url={media}
                    variant="small"

                  />
                  <CBox className={classes.playVideo}>
                    {<assets.PlayCircleOutlineIcon />}
                  </CBox>
                </CBox>
                <CBox className={classes.memberPreview}>
                  <Typography
                    className={`chat-member-name ${classes.memberName}`}
                  >
                    Andres Kütt
                  </Typography>



                  <CBox display='flex' alignItems='center'>

                    <Typography
                      className={`${classes.memberCompany} chat-member-company`}

                    >
                      Company
                    </Typography>
                    &nbsp;
                    <Typography
                      className={`${classes.memberCompany} chat-member-company`}
                    >
                      &nbsp;
                      &nbsp;
                      &nbsp;

                      fsd
                    </Typography>

                  </CBox>
                  <CBox display='flex' alignItems='center'>

                    <Typography
                      className={`${classes.size} chat-member-company`}

                    >
                      Size:
                    </Typography>
                    &nbsp;
                    <Typography
                      className={`${classes.size} chat-member-company`}
                    >



                      9Mb
                    </Typography>

                  </CBox>

                </CBox>
              </CBox>


              <CBox display='flex' color='#605C5C' fontSize={12} fontWeight={600} fontFamily='Inter' flexDirection='column' justifyContent='center' alignItems='flex-end' flex='1 1 0'>
                <CBox>
                  22/08/2020
                </CBox>
                <CBox>
                  10:18 AM
                </CBox>

              </CBox>
            </CBox>
          )

          )}

        </TabPanel>
        <TabPanel value={2}>
          {[...Array(5)].map(() => (
            <CBox display='flex' justifyContent='space-between' className={classes.chatList}>
              <CBox flex='2 1 0' display='flex' alignItems='center'>
                <CBox className={classes.imgBox}>
                  <NameAvatar
                    // styleAvater={}
                    firstName={'ramiz'}
                    surName={''}
                    url={media}
                    variant="small"

                  />
                  <CBox className={classes.playVideo}>
                    {<assets.PlayCircleOutlineIcon />}
                  </CBox>
                </CBox>
                <CBox className={classes.memberPreview}>
                  <Typography
                    className={`chat-member-name ${classes.memberName}`}
                  >
                    Andres Kütt
                  </Typography>



                  <CBox display='flex' alignItems='center'>

                    <Typography
                      className={`${classes.memberCompany} chat-member-company`}

                    >
                      Company
                    </Typography>
                    &nbsp;
                    <Typography
                      className={`${classes.memberCompany} chat-member-company`}
                    >
                      &nbsp;
                      &nbsp;
                      &nbsp;

                      fsd
                    </Typography>

                  </CBox>
                  <CBox display='flex' alignItems='center'>

                    <Typography
                      className={`${classes.size} chat-member-company`}

                    >
                      Size:
                    </Typography>
                    &nbsp;
                    <Typography
                      className={`${classes.size} chat-member-company`}
                    >



                      9Mb
                    </Typography>

                  </CBox>

                </CBox>
              </CBox>


              <CBox display='flex' color='#605C5C' fontSize={12} fontWeight={600} fontFamily='Inter' flexDirection='column' justifyContent='center' alignItems='flex-end' flex='1 1 0'>
                <CBox>
                  22/08/2020
                </CBox>
                <CBox>
                  10:18 AM
                </CBox>

              </CBox>
            </CBox>
          )

          )}
        </TabPanel>



      </Tabs>

    </CBox>
  );
};

export default ChatMedia;

const styles = {
  wrapper: {
    height: "auto",
    maxHeight: 240,
    overflow: "auto",
  },
};
