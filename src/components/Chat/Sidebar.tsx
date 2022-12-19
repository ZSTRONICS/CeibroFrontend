import React from 'react'
import { makeStyles } from "@material-ui/styles";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { CBox } from 'components/material-ui';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <CBox sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </CBox>
            )}
        </div>
    );
}
function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
export const Sidebar = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>
            <div className={classes.mediaSidebarWrapper}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                    <Tab label="Item Four" {...a11yProps(3)} />
                    <Tab label="Item Five" {...a11yProps(4)} />
                    <Tab label="Item Six" {...a11yProps(5)} />
                    <Tab label="Item Seven" {...a11yProps(6)} />
                </Tabs>

            </div>
            <CBox className={classes.tabs}>
                <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Item Four
                </TabPanel>
                <TabPanel value={value} index={4}>
                    Item Five
                </TabPanel>
                <TabPanel value={value} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel value={value} index={6}>
                    Item Seven
                </TabPanel>
            </CBox>

        </>
    )
}
const useStyles = makeStyles({
    mediaSidebarWrapper: {
        position: "absolute",
        right: 18,
        zIndex: 10,
        background: "white",
        height: "calc(100vh - 85px)",
        display: "flex",
        flexDirection: "column",
    },
    tabs: {
        position: 'absolute',
        right: 118,
        zIndex: 111,
        width: 466,
        backgroundColor: '#E5F0F8',
        maxHeight: 465,
        borderRadius: 4,
        height: '100%',
    }
});
