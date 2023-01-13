import { createStyles, makeStyles } from '@material-ui/core'
import { theme } from 'theme';
import colors from '../../../assets/colors'

export const useStyles = makeStyles(() =>
    createStyles({
        outerWrapper: {
            marginBottom: '10px',
            // padding: "10px 20px",
            background: colors.white,
            '& .MuiGrid-root': {
                marginTop: 10,
            },
            '& .MuiGrid-grid-xs-6': {
                marginTop: '0px !important'
            }
        },
        titleWrapper: {
            '& .MuiFormLabel-root': {
                fontSize: 12,
                color: '#605C5C',
                fontFamily: 'Inter',
                fontWeight: 600,
            },
            // maxHeight: '41px !important',
            '&:hover': {
                // borderColor: '#0a95ff !important',
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0a95ff !important',
                    borderWidth: '1px',
                }
            }
            // '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
            //     padding: '10.5px 10.5px !important'

            // },
            // '& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {

            // },


            // paddingLeft: '10px',
            // '& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root': {
            //     position: 'relative !important',
            //     left: '5px !important',
            //     right: '0px !important',
            // },
            // '& .css-1a1fmpi-MuiInputBase-root-MuiInput-root:after': {
            //     borderBottom: 'none !important',
            // },
            // '& .css-1a1fmpi-MuiInputBase-root-MuiInput-root:before': {
            //     borderBottom: 'none !important'
            // }
            // padding: "15px 20px"
        },
        selectOption: {
            paddingLeft: '10px',

            '& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root': {
                position: 'relative !important',
                left: '5px !important',
                right: '0px !important',
            },
            '& .css-1a1fmpi-MuiInputBase-root-MuiInput-root:before': {
                borderBottom: 'none !important'
            },
            '& .css-1a1fmpi-MuiInputBase-root-MuiInput-root:after': {
                borderBottom: 'none !important',
            },
            // padding: "15px 20px"
        },
        label: {
            // borderRight: '1px solid #DBDBE5',
            padding: '0px 5px',
            fontSize: 12,
            color: '#605C5C',
            fontFamily: 'Inter',
            fontWeight: 600,
            position: 'relative',
            borderRight: '1px solid #DBDBE5',
            '&:after': {
                display: 'inline-block',
                content: '""',
                // borderRight: '1px solid #DBDBE5',
                height: '20px',
                position: 'absolute',
                left: 88,
                bottom: 0,
                // width: '4rem',
                // margin: '0 1rem',
                transform: 'translateX(-1rem)',
            }
        },
        inputWrapper: {

            paddingTop: 20,
            // paddingLeft: 10,
            ['@media (max-width:600px)']: {
                paddingLeft: 0
            }
        },
        projectWrapper: {
            display: 'flex',
            alignItems: 'center',
            padding: '5px 10px',
            // paddingTop: "20px",
            border: '1px solid #DBDBE5',
            // marginTop: 20,
            borderRadius: '4px',
            '&:hover': {
                borderColor: '#0a95ff',
                borderWidth: '1px',
            }
        },
        dateWrapper: {
            paddingTop: 20,
            // paddingLeft: 10,
            ['@media (max-width:600px)']: {
                paddingLeft: 0
            }
        },
        createSubTask: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        advanceOptions: {
            // padding: "10px 20px",
            background: colors.white,
            // '& .MuiGrid-root': {
            //     marginTop: 10,
            // }
        },
        radioGroup: {
            '& .MuiTypography-root': {
                paddingLeft: '0px !important'
            }
        },
        divider: {
            height: 20, width: '2px', color: '#DBDBE5',
            [theme.breakpoints.down('md')]: {
                display: 'none'
            }
        },
        mapBox: {
            position: 'absolute',
            right: 19,
            top: 15,
        },
        textAreaBox:{
                border:'1px solid #DBDBE5',
                borderRadius:5,
        },
        textArea:{
            width: '100%', padding: 15, border: 'none', borderRadius: 5,
        '& textarea:focus' :{ 
            outline: 'none !important',
            borderColor: 'none',
            // boxShadow: '0 0 10px #719ECE',
        }
    },
    switch:{
        '& label':{
            fontSize:12,
            color:'#000',
            fontWeight:600
        },
        '& .MuiTypography-root':{
            fontSize:12,
            color:'#000'
        },
        '& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase':{
                top:'2px !important',
                left:'3px !important'
        },
        '& .css-z4pv70-MuiSwitch-root':{
            width:'37px !important',
            height:'18px !important',
            '& .MuiSwitch-thumb':{
                width: '10px !important',
                height: '10px !important',
            }
        }
    }
        
    }),
);
export default useStyles;