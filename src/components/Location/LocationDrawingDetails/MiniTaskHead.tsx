import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box, TextField } from "@mui/material";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { HeadStyles, tabStyles } from "./MiniCardTaskStyle";

const MiniTaskImageNavi = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <Box style={HeadStyles.head_container}>
        <Box style={HeadStyles.head_navigation}>
          <Box>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box style={tabStyles.head_navi_btn}>
                  <TabList
                    TabIndicatorProps={{
                      children: <span className="MuiTabs-indicatorSpan" />,
                    }}
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab sx={{ ...tabStyles }} label="Task" value="1" />
                    <Tab sx={{ ...tabStyles }} label="Image" value="2" />
                  </TabList>
                </Box>
                {/* //// */}
                <Box style={HeadStyles.head_filterization}></Box>
                {/* //// */}
                <Box style={HeadStyles.head_search}>
                  <Box sx={{ width: "88%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        width: "100%",
                        marginLeft: "16px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 22 23"
                        fill="none"
                      >
                        <path
                          d="M8.70833 2.85156C10.2886 2.85156 11.8041 3.47931 12.9215 4.59672C14.0389 5.71412 14.6667 7.22965 14.6667 8.8099C14.6667 10.2857 14.1258 11.6424 13.2367 12.6874L13.4842 12.9349H14.2083L18.7917 17.5182L17.4167 18.8932L12.8333 14.3099V13.5857L12.5858 13.3382C11.5408 14.2274 10.1842 14.7682 8.70833 14.7682C7.12808 14.7682 5.61256 14.1405 4.49516 13.0231C3.37775 11.9057 2.75 10.3901 2.75 8.8099C2.75 7.22965 3.37775 5.71412 4.49516 4.59672C5.61256 3.47931 7.12808 2.85156 8.70833 2.85156ZM8.70833 4.6849C6.41667 4.6849 4.58333 6.51823 4.58333 8.8099C4.58333 11.1016 6.41667 12.9349 8.70833 12.9349C11 12.9349 12.8333 11.1016 12.8333 8.8099C12.8333 6.51823 11 4.6849 8.70833 4.6849Z"
                          fill="black"
                        />
                      </svg>
                      <TextField
                        id="input-with-sx"
                        label="Start typing for search"
                        variant="standard"
                        sx={{ width: "85%" }}
                      />
                    </Box>
                  </Box>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M14.9993 17.5L11.666 14.1667H14.166V5.83333H11.666L14.9993 2.5L18.3327 5.83333H15.8327V14.1667H18.3327M1.66602 15.8333V14.1667H9.99935V15.8333M1.66602 10.8333V9.16667H7.49935V10.8333M1.66602 5.83333V4.16667H4.99935V5.83333H1.66602Z"
                      fill="#0076C8"
                    />
                  </svg>
                </Box>
                {/* //// */}
                {/* <TabPanel value="1">Item One</TabPanel>
                                <TabPanel value="2">Item Two</TabPanel> */}
              </TabContext>
            </Box>
          </Box>
        </Box>
        {/* <Box style={HeadStyles.head_filterization} sx={{ border: 'solid 1px red' }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M12.4998 16.6682C12.5331 16.9182 12.4498 17.1849 12.2581 17.3599C11.9331 17.6849 11.4081 17.6849 11.0831 17.3599L7.74147 14.0182C7.5498 13.8266 7.46647 13.5682 7.4998 13.3266V9.0599L3.50813 3.95156C3.2248 3.59323 3.29147 3.06823 3.6498 2.7849C3.80813 2.66823 3.98313 2.60156 4.16647 2.60156H15.8331C16.0165 2.60156 16.1915 2.66823 16.3498 2.7849C16.7081 3.06823 16.7748 3.59323 16.4915 3.95156L12.4998 9.0599V16.6682ZM5.86647 4.26823L9.16647 8.4849V13.0849L10.8331 14.7516V8.47656L14.1331 4.26823H5.86647Z" fill="#0076C8" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M10.0007 13.1003L5.83398 8.93359H14.1673L10.0007 13.1003Z" fill="#0076C8" />
                    </svg>
                </Box>
                <Box style={HeadStyles.head_search} >
                    <Box sx={{ width: '92%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', marginLeft: '16px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 22 23" fill="none">
                                <path d="M8.70833 2.85156C10.2886 2.85156 11.8041 3.47931 12.9215 4.59672C14.0389 5.71412 14.6667 7.22965 14.6667 8.8099C14.6667 10.2857 14.1258 11.6424 13.2367 12.6874L13.4842 12.9349H14.2083L18.7917 17.5182L17.4167 18.8932L12.8333 14.3099V13.5857L12.5858 13.3382C11.5408 14.2274 10.1842 14.7682 8.70833 14.7682C7.12808 14.7682 5.61256 14.1405 4.49516 13.0231C3.37775 11.9057 2.75 10.3901 2.75 8.8099C2.75 7.22965 3.37775 5.71412 4.49516 4.59672C5.61256 3.47931 7.12808 2.85156 8.70833 2.85156ZM8.70833 4.6849C6.41667 4.6849 4.58333 6.51823 4.58333 8.8099C4.58333 11.1016 6.41667 12.9349 8.70833 12.9349C11 12.9349 12.8333 11.1016 12.8333 8.8099C12.8333 6.51823 11 4.6849 8.70833 4.6849Z" fill="black" />
                            </svg>
                            <TextField id="input-with-sx" label="Start typing for search" variant="standard" sx={{ width: '85%', }} />
                        </Box>

                    </Box>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                        <path d="M8.70833 2.85156C10.2886 2.85156 11.8041 3.47931 12.9215 4.59672C14.0389 5.71412 14.6667 7.22965 14.6667 8.8099C14.6667 10.2857 14.1258 11.6424 13.2367 12.6874L13.4842 12.9349H14.2083L18.7917 17.5182L17.4167 18.8932L12.8333 14.3099V13.5857L12.5858 13.3382C11.5408 14.2274 10.1842 14.7682 8.70833 14.7682C7.12808 14.7682 5.61256 14.1405 4.49516 13.0231C3.37775 11.9057 2.75 10.3901 2.75 8.8099C2.75 7.22965 3.37775 5.71412 4.49516 4.59672C5.61256 3.47931 7.12808 2.85156 8.70833 2.85156ZM8.70833 4.6849C6.41667 4.6849 4.58333 6.51823 4.58333 8.8099C4.58333 11.1016 6.41667 12.9349 8.70833 12.9349C11 12.9349 12.8333 11.1016 12.8333 8.8099C12.8333 6.51823 11 4.6849 8.70833 4.6849Z" fill="black" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M14.9993 17.6016L11.666 14.2682H14.166V5.9349H11.666L14.9993 2.60156L18.3327 5.9349H15.8327V14.2682H18.3327M1.66602 15.9349V14.2682H9.99935V15.9349M1.66602 10.9349V9.26823H7.49935V10.9349M1.66602 5.9349V4.26823H4.99935V5.9349H1.66602Z" fill="#0076C8" />
                    </svg>
                </Box> */}
      </Box>
    </>
  );
};

{
  /* <InputSearch /> */
}
export default MiniTaskImageNavi;
