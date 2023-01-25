import { Grid } from '@material-ui/core';
import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import { CBox } from 'components/material-ui';

import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import useStyles from './TaskDrawerStyles';

import Radio from '@mui/material/Radio';

import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import useMediaQuery from '@mui/material/useMediaQuery';
import { theme } from "theme";
//map box
import assets from 'assets/assets';
// import MapBox from '../../mapBox/MapBox';

export const TaskAdvanceOptions = () => {
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyles()
    const [openMap, setOpenMap]: any = React.useState(false);
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 }]

    return (
        <div className={classes.outerWrapper}>

            <Grid item xs={12} md={12}>
                <div className={classes.titleWrapper}>
                    <TextField
                        id="date"
                        label="Due date"
                        type="date"
                        defaultValue="2017-05-24"
                        size="small"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
            </Grid>
            <Grid item xs={12} md={12}>
                <div className={classes.titleWrapper}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        size="small"
                        options={top100Films}
                        renderInput={(params) => <TextField {...params} label='Confirm Needed' placeholder='select member(s)' />}
                    />
                </div>
            </Grid>
            <Grid item xs={12} md={12}>
                <div className={classes.titleWrapper}>
                    <Autocomplete
                    filterSelectedOptions
                        disablePortal
                        id="combo-box-demo"
                        size="small"
                        options={top100Films}
                        renderInput={(params) => <TextField {...params} label='Category' placeholder='select Categories' />}
                    />
                </div>
            </Grid>
            <Grid item xs={12} md={12}>
                <div className={classes.titleWrapper}>
                    <Autocomplete
                    filterSelectedOptions
                        multiple
                        disablePortal
                        id="combo-box-demo"
                        size="small"
                        options={top100Films}
                        renderInput={(params) => <TextField {...params} label='Viewer' placeholder='select View(s)' />}
                    />
                </div>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div className={classes.titleWrapper}>
                        <TextField size="small" fullWidth id="outlined-basic" label="Man Power" placeholder='Enter number' variant="outlined" />
                    </div>
                </Grid>
                <Grid item xs={6} style={{ position: 'relative' }}>
                    <div className={classes.titleWrapper}>
                        <TextField size="small" fullWidth id="outlined-basic" label="Location" placeholder='Select location' variant="outlined" />
                    </div>
                    <CBox onClick={() => setOpenMap(!openMap)} className={classes.mapBox}>
                        <assets.LocationOnOutlinedIcon style={{ fill: '#9f9f9f' }} />

                    </CBox>


                </Grid>
            </Grid>
            <CBox my={2}>
                <Divider />

            </CBox>
            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>

            <CBox display='flex' flexDirection={fullScreen ? 'column' : 'row'} alignItems='center' style={{ gap: 6 }}>

                <CBox mr={3.7} width='100%' flex='1 1 0'>
                    <CBox className={classes.radioGroup}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="normal" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 12,
                                    },
                                    '& .MuiTypography-root': {
                                        fontSize: 12,
                                    },
                                }} />} label="Normal" />
                                <FormControlLabel value="fast" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 12,
                                    },
                                    '& .MuiTypography-root': {
                                        fontSize: 12,
                                    },
                                }} />} label="Fast" />

                            </RadioGroup>
                        </FormControl>
                        {/* <StyledEngineProvider injectFirst>
                        <CssVarsProvider>
                            <SwitchTab />
                        </CssVarsProvider> */}
                        {/* </StyledEngineProvider> */}
                    </CBox>
                    {/* <StyledEngineProvider injectFirst>
                        <CssVarsProvider>
                            <SwitchTab />
                        </CssVarsProvider>
                    </StyledEngineProvider> */}
                </CBox>
                <Divider variant='middle' orientation="vertical" flexItem className={classes.divider} style={{ height: 20, width: '2px', color: '#DBDBE5' }} />
                <CBox display='flex' flex='2 1 0' width='100%'>
                    <CBox>
                        <CBox>

                            {/* <Typography style={{ fontSize: 12, fontWeight: 700, color: '605C5C' }} component="label" endDecorator={<Switch sx={{ ml: 1 }} />}>
                                Additional Work
                            </Typography> */}


                        </CBox>
                    </CBox>
                    <Divider variant='middle' orientation="vertical" style={{ height: 20, width: '2px', color: '#DBDBE5' }} />
                    <CBox>

                        <CBox>
                            {/* <Typography style={{ fontSize: 12, fontWeight: 700, color: '605C5C' }} component="label" endDecorator={<Switch sx={{ ml: 1 }} />}>
                                &nbsp; Time Login
                            </Typography> */}
                        </CBox>
                    </CBox>
                </CBox>
            </CBox>
            {/* {openMap ? <MapBox /> : null} */}


            {/* <ExampleTrackChild /> */}


        </div>
    )
}



