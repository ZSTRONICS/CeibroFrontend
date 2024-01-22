
import { styled } from '@mui/system';

interface Styles {
    [key: string]: React.CSSProperties;
}

export const LocatoinParent = styled('div')({
    width: '98%',
    // border: 'solid 2px green',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all linear 0.30s',
    marginLeft: '1%', color: 'darkslategray',
    backgroundColor: 'aliceblue',
    padding: 8,
    borderRadius: 4,
});

export const styles: Styles = {
    location_Parent: {
        width: '98%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        transition: 'all linear 0.30s',
        marginLeft: '1%',
        height: '85vh',
    },
    locatoin_main: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    location_task: {
        width: '25%',
        height: '81vh',
        transition: 'all linear 0.30s',
        position: 'relative',
        maxHeight: '88vh',
        ...({ '@media (max-width: 1100px)': { width: '20%', border: 'solid 4px red' } } as React.CSSProperties),
    },
    location_description: {
        width: '25%',
        height: '85vh',
        transition: 'all linear 0.30s',
        position: 'relative',
        maxHeight: '88vh',
        ...({ '@media (max-width: 1100px)': { width: '35%' } } as any),


    },
    location_drawing: {
        width: '50%',
        height: '81vh',
        transition: 'all linear 0.30s',
        position: 'relative',
        marginTop: '15px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        borderRadius: '4px',
        ...({ '@media (max-width: 1100px)': { width: '45%' } } as any),
    },
    location_task_min: {
        width: '7%',
        height: '85vh',
        // border: 'solid 1px black',
        transition: 'all linear 0.30s',
        position: 'relative',
        maxHeight: '88vh',
    },
    location_drawing_max: {
        width: '67%',
        height: '81vh',
        transition: 'all linear 0.30s',
        position: 'relative',
        overflowY: 'scroll',
        overflowX: 'hidden',
        marginTop: '15px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        borderRadius: '4px',
        backgroundColor: '#FFF',
    },
    location_description_max: {
        width: '42%',
        height: '85vh',
        // border: 'solid 1px black',
        transition: 'all linear 0.30s',
        position: 'relative',
    },
    location_btn: {
        height: 'max-content',
        width: 'max-contnet',
        transition: 'all linear 0.15s',
        position: 'absolute',
        top: '50%',
        left: '95%',
        transform: 'rotate(0deg)',
        zIndex: '25',
        border: 'solid 1px black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        paddingLeft: '5px',
        paddingRight: '5px',
        paddingTop: '10px',
        paddingBottom: '10px',

    },
    location_btn_change: {
        height: 'max-content',
        width: 'max-contnet',
        transition: 'all linear 0.15s',
        position: 'absolute',
        top: '50%',
        left: '95%',
        transform: 'rotate(180deg)',
        zIndex: '25',
        // border: 'solid 1px black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        paddingLeft: '5px',
        paddingRight: '5px',
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    location_all_taks: {
        // border: 'solid 2px green',
        width: '95%',
        height: '81vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        marginTop: '15px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        borderRadius: '4px',
        backgroundColor: '#FFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    locatoin_task_header: {
        height: 'max-content',
        width: '100%',
        // border: 'solid 1px green',
    },
    location_task_bottom: {
        height: '80%',
        width: '100%',
        // border: 'solid 5px red'
    },
    location_all_drawings: {
        // border: 'solid 2px green',
        width: '95%',
        height: '85vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
    },
};