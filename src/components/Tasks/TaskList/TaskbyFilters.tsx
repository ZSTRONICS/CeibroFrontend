import { Button } from "@mui/base";
import { Box, ListSubheader, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MUIInputLabel } from "components/CustomTags";
import { ChangeValueType, CreateNewTaskFormType } from "components/Tasks/type";
import { Contact, Topic } from "constants/interfaces";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FilterProjectCard from "./FilterProjectCard";
import FilterTagsCards from "./FilterTagsCards";

interface IProps {
  name: keyof CreateNewTaskFormType;
  label: string;
  contacts: Contact[];
  recentUserContact: Contact[];
  disabled?: boolean;
  options: Project[] | Topic[] | any[];

  createCallback?: (type: string, label: string) => void;
  handleChangeValues: (
    value: ChangeValueType,
    name: keyof CreateNewTaskFormType
  ) => void;
}

function TaskbyFilters(props: IProps) {
  const [isSelfAssign, setIsSelfAssign] = useState(false);
  const { label, options } = props;

  // console.log(options, "options");

  const [selected, setSelected] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [FilterdData, setFilterData] = useState<any[]>(options);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  // const [FilterProjects, setFilterProjects] = useState([]);

  // console.log(FilterdData, "filer...");

  const dispatch = useDispatch();

  const handleClose = () => {
    // e.stopPropagation();
    setOpen(false);
    // setSelectedOptions([]);
    // setFilterProjects([]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newSearchQuery = event.target.value.toLowerCase();
  //   setSearchQuery(newSearchQuery);
  //   if (newSearchQuery === "") {
  //     setFilterData(options);
  //   } else {
  //     const filteredProjects = options?.filter((project: any) => {
  //       for (const property in project) {
  //         if (
  //           project[property] &&
  //           project[property].toString().toLowerCase().includes(newSearchQuery)
  //         ) {
  //           return true;
  //         }
  //       }
  //       return false;
  //     });
  //     setFilterData(filteredProjects);
  //   }
  // };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = event.target.value.toLowerCase();

    setSearchQuery(newSearchQuery);

    if (label === "Projects") {
      if (newSearchQuery === "") {
        setFilterData(options);
      } else {
        const filteredProjects = options?.filter((project: any) => {
          return project.title.toLowerCase().includes(newSearchQuery);
        });
        setFilterData(filteredProjects);
      }
    } else {
      if (newSearchQuery === "") {
        setFilterData(options);
      } else {
        const filteredProjects = options?.filter((project: any) => {
          return project.topic.toLowerCase().includes(newSearchQuery);
        });
        setFilterData(filteredProjects);
      }
    }
  };

  const handleSelect = (option: any) => {
    const isSelected = selectedOptions?.some((items: any) => {
      console.log(items, option, "items");
      // if(label === 'Projects'){
      return option._id === items?._id;
      // }
      // else{

      // }
    });
    if (!isSelected) {
      setSelectedOptions((prevOptions: any) => [...prevOptions, option]);
    } else {
      const filterData = selectedOptions.filter((items: any) => {
        return option._id !== items._id;
      });
      setSelectedOptions(filterData);
    }
  };

  // const handleApply = () => {
  //   dispatch(taskActions.setSelectedProjects(selectedOptions));
  //   setFilterProjects(selectedOptions);
  // };

  const renderValue = () => {
    return (
      <div
        style={{
          display: "flex",
          marginLeft: "12px",
          marginTop: selectedOptions.length > 0 ? "3px" : "0px",
        }}
      >
        {" "}
        <p style={{ color: "#818181", fontSize: "14px", fontWeight: "400" }}>
          {label}
        </p>
        <div
          style={{
            backgroundColor: "#818181",
            color: "white",
            borderRadius: "50%",
            height: "16px",
            width: "16px",
            textAlign: "center",
            fontSize: "11px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "2px",
            marginTop: "2px",
          }}
        >
          {selectedOptions.length}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FormControl
        disabled={props.disabled}
        variant="standard"
        sx={{
          "& .MuiSelect-select": {
            marginTop: "-2px",
          },
          "& .MuiSelect-icon": {
            left: "72%",
          },
          marginTop: "0px",
          width: "100%",
          maxWidth: "110px",
          minWidth: "110px",
          backgroundColor: "#F4F4F4",
          "& .MuiInputBase-root": {
            top: "-12px",
          },
          "& .MuiInputBase-root:before": {
            borderBottom: "none !important",
          },
          "& .MuiInputBase-root:after": {
            borderBottom: "none !important",
          },
          "& .MuiSelect-root:before": {
            // borderBottom: "none",
            borderWidth: "5px",
          },
          "&.MuiFormControl-root": {
            borderRadius: "5px",
            height: "36px",
            marginLeft: "10px",
          },
        }}
      >
        <MUIInputLabel
          shrink={false}
          sx={{
            top: "-10px",
            // left: "15px",
            // fontSize: "14px",
            // fontWeight: "400",
            color: "#818181",
            display: open ? "none" : "block",
          }}
          id="controlled-open-select-label"
        >
          {selectedOptions.length === 0 ? renderValue() : null}
        </MUIInputLabel>
        <Select
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          sx={{
            "& .MuiSelect-root:before": {},
            "& .MuiSelect-icon": {
              right: `${selected.length > 0 ? "40px" : 0}`,
            },

            svg: { color: "#000000" },
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            PaperProps: {
              style: {
                maxHeight: "calc(100vh - 100px)",
              },
            },
          }}
          multiple
          variant="standard"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectedOptions}
          renderValue={renderValue}
        >
          <ListSubheader
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "8px",
              marginBottom: "5px",
            }}
          >
            <TextField
              type="search"
              placeholder="Start typing name"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                "& .MuiSelect-root:before": {
                  borderBottom: "none",
                },
              }}
              style={{
                flex: 1,
                borderBottomWidth: "1px",
                borderColor: "#818181",
                borderStyle: "solid",
                marginRight: "8px",
              }}
              variant="standard"
              inputProps={{
                maxLength: 50,
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
            <Button
              style={{
                padding: "4px",
                backgroundColor: "white",
                color: "#747474",
                border: "1px solid #747474",
                borderRadius: "5px",
              }}
              onClick={handleClose}
            >
              Done
            </Button>
          </ListSubheader>
          <Box sx={{ margin: "0px 16px" }}>
            {label === "Projects" ? (
              <FilterProjectCard
                handleSelect={handleSelect}
                selectedOptions={selectedOptions}
                options={FilterdData}
                // checkedIcon={}
              />
            ) : label === "Tags" ? (
              <FilterTagsCards
                handleSelect={handleSelect}
                selectedOptions={selectedOptions}
                options={FilterdData}
              />
            ) : null}
          </Box>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "solid 1px #818181",
            }}
          >
            <Box
              onClick={() => setSelectedOptions([])}
              sx={{
                fontSize: "12px",
                marginLeft: "12px",
                color: "#0076C8",
                marginTop: "7px",
                cursor: "pointer",
              }}
            >
              Clear All
            </Box>
            <Box
              onClick={handleApply}
              sx={{
                marginRight: "12px",
                backgroundColor: "#0076C8",
                color: "white",
                fontSize: "12px",
                height: "28px",
                width: "60px",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Apply
            </Box>
          </Box> */}
          {/* <MenuItem style={{ display: "none" }}></MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
}

export default TaskbyFilters;
