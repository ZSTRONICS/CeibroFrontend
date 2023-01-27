import { Grid, TextField } from '@mui/material'
import Link from '@mui/material/Link'
import assets from "assets/assets"
import { CBox } from 'components/material-ui'
import Autocomplete from '@mui/material/Autocomplete'
import useStyles from './CreateSubTaskStyles'
import { Button, Divider } from '@material-ui/core'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { EditIcon, PinIcon, RemoveIcon, DeleteIcon } from 'components/material-ui/icons'
import CustomizedSwitch from 'components/Chat/Questioniar/IOSSwitch'
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
export default function CreateSubTaskAdvanceOption() {
    const classes = useStyles();
    const projects = [
        { label: 'Redemption', year: 1994 },
        { label: 'Kristo', year: 1972 },
        { label: 'Electic', year: 1972 },
    ]
    return (
        <CBox width='100%'>
            <Link href="#" underline="none">
                <CBox color='#0076C8' fontSize={14} fontWeight={600} display='flex' alignItems='center' my={1.8}>
                    {/* {open ? */}
                    <>
                        < assets.KeyboardArrowRightIcon />                                                    </>
                    {/* :
                                                    <> */}
                    {/* < assets.KeyboardArrowDownIcon /> */}
                    {/* </> */}
                    {/* } */}
                    Advance Options
                </CBox>
            </Link>
            <Grid item xs={12} md={12}>
                <div className={classes.titleWrapper}>
                    <TextField
                        id="date"
                        name="startDate"
                        label="Start date"
                        type="date"
                        defaultValue="2017-05-24"
                        size="small"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    // onChange={(e) => {
                    //     props.setFieldValue('dueDate', e.target.value);
                    // }}
                    />
                </div>

            </Grid>
            <Grid item xs={12} md={12}>
                <div className={classes.titleWrapper}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        size="small"
                        options={projects}
            getOptionLabel={(option:any)=> option.label}

                        // onChange={(e, value) => {
                        //     props.setFieldValue('projects', value !== null ? value : top100Films);
                        // }}
                        renderInput={(params) => <TextField {...params} name='confirmationNeeded' label='Confirmation Needed' placeholder='select members' />}
                    />
                    {/* <SelectDropdown
                        title="Project"
                    /> */}
                </div>
            </Grid>
            <Grid item xs={12} md={12}>
                <div className={classes.titleWrapper}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        size="small"
                        options={projects}
            getOptionLabel={(option:any)=> option.label}

                        // onChange={(e, value) => {
                        //     props.setFieldValue('projects', value !== null ? value : top100Films);
                        // }}
                        renderInput={(params) => <TextField {...params} name='category' label='Category' placeholder='select categories' />}
                    />
                    {/* <SelectDropdown
                        title="Project"
                    /> */}
                </div>
            </Grid>
            <Grid item xs={12} md={12}>
                <div className={classes.titleWrapper}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        size="small"
                        options={projects}
            getOptionLabel={(option:any)=> option.label}

                        // onChange={(e, value) => {
                        //     props.setFieldValue('projects', value !== null ? value : top100Films);
                        // }}
                        renderInput={(params) => <TextField {...params} name='subTask' label='Viewer' placeholder='select categories' />}
                    />
                    {/* <SelectDropdown
                        title="Project"
                    /> */}
                </div>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <div className={classes.titleWrapper}>
                        <TextField size="small" fullWidth id="outlined-basic" label="Man Power" placeholder='Enter number' variant="outlined" />
                    </div>
                </Grid>
                <Grid item xs={8} style={{ position: 'relative' }}>
                    <div className={classes.titleWrapper}>
                        <TextField size="small" fullWidth id="outlined-basic" label="Location" placeholder='Select location' variant="outlined" />
                    </div>
                    <CBox className={classes.mapBox}>
                        <assets.LocationOnOutlinedIcon style={{ fill: '#9f9f9f' }} />

                    </CBox>
                </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
                <CBox border='1px solid #DBDBE5' borderRadius='4px'>
                    <CBox display='flex' justifyContent='flex-end' width='100%'>
                        <Button startIcon={<assets.AddIcon />} color='secondary'>
                            Add New Item
                        </Button>
                    </CBox>
                    <CBox display='flex' flexDirection='column' px={1} alignItems='center' width='100%'>
                        {[...Array(10)].map(() => (
                            <CBox display='flex' justifyContent='space-between' alignItems='center' width='100%'>
                                <CBox display='flex'>
                                    <FormControlLabel control={<Checkbox />} label="V Test" />
                                </CBox>
                                <CBox display='flex' alignItems='center'>
                                    <EditIcon />
                                    &nbsp;
                                    &nbsp;
                                    <DeleteIcon />
                                </CBox>
                            </CBox>
                        )

                        )}

                    </CBox>
                </CBox>
                <CBox>
                    <CBox className={classes.switch} display='flex' alignItems='center' marginTop={2} height='20px'>
                        <label style={{ color: '#605C5C' }}>Additional Work</label>
                        <CustomizedSwitch
                            // label='Additional Work'
                            edge='end'
                        />
                        &nbsp;
                        &nbsp;
                        <Divider flexItem orientation='vertical' />
                        &nbsp;
                        &nbsp;
                        <label style={{ color: '#605C5C' }}>Time logging</label>
                        <CustomizedSwitch
                            edge='start'
                        />
                        &nbsp;
                        &nbsp;
                        <Divider flexItem orientation='vertical' />
                        &nbsp;
                        &nbsp;
                        <label style={{ color: '#605C5C' }}>Priority</label>
                        <FormControlLabel value="female" control={<Radio size="small" sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 14,
                            },

                        }}
                        />} label="Normal" />
                        <FormControlLabel value="male" control={<Radio size="small" sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 14,
                            },

                        }} />} label="Fast" />




                    </CBox>
                </CBox>
            </Grid>

        </CBox>
    )
}
