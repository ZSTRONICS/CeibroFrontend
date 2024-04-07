import { Button } from "@mui/base";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Box, Checkbox, TextField } from "@mui/material";
import Autocomplete, {
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { Topic } from "constants/interfaces";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "redux/action";
import { RootState } from "redux/reducers";

interface TopicTagsFilterProps {
  options: Topic[];
  TaskMain?: boolean;
  disabled?: boolean;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const TopicTagsFilter = ({
  options,
  TaskMain,
  disabled,
}: TopicTagsFilterProps) => {
  const tagRef = useRef(null);
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const { selectedTopicTags } = useSelector((state: RootState) => state.task);
  const [localSelectedTags, setLocalSelectedTags] = useState<Topic[]>(
    selectedTopicTags ?? []
  );
  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    //@ts-ignore
    if (tagRef.current && !tagRef.current.contains(target)) {
      setIsShow(false);
      setLocalSelectedTags(selectedTopicTags);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: Topic[],
    reason: AutocompleteChangeReason
  ) => {
    event.stopPropagation();
    switch (reason) {
      case "selectOption":
        setLocalSelectedTags(value);
        break;
      case "removeOption":
      case "clear":
        setLocalSelectedTags(value);
        dispatch(taskActions.setSelectedTopicTags([]));
        break;
    }
  };

  const handleApply = () => {
    dispatch(taskActions.setSelectedTopicTags(localSelectedTags));
    setIsShow(false);
  };

  const handleClear = () => {
    setLocalSelectedTags([]);
    dispatch(taskActions.setSelectedTopicTags([]));
    setIsShow(false);
  };

  console.log(options, "option...");

  return (
    <Autocomplete
      // disabled={disabled}
      disableClearable={true}
      ref={tagRef}
      open={isShow}
      onOpen={(e) => {
        e.stopPropagation();
        setIsShow(true);
      }}
      onClose={(event, reason) => {
        event.stopPropagation();
        setIsShow(false);
      }}
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          border: "0px solid",
        },
        maxWidth: "110px",
        minWidth: "110px",
        maxHeight: "40px",
        position: "relative",
        marginLeft: "10px",
        backgroundColor: "#FFFFFF",
        "& .MuiAutocomplete-inputRoot": {
          height: "36px",
        },
      }}
      limitTags={0}
      multiple
      id="checkboxes-tags"
      options={options}
      // value={data?.length > 0 ? data : null}
      size="small"
      disableCloseOnSelect
      onChange={handleChange}
      getOptionLabel={(option: Topic) => option.topic}
      // renderOption={(props, option, { selected }) => (
      //   <li
      //     style={{
      //       minHeight: "30px",
      //       maxHeight: "max-content",
      //       display: "flex",
      //       alignItems: "flex-start",
      //       padding: "0px",
      //       paddingTop: "5px",
      //     }}
      //     {...props}
      //   >
      //     <Checkbox
      //       icon={icon}
      //       checkedIcon={checkedIcon}
      //       style={{ marginRight: 8 }}
      //       checked={selected}
      //       sx={{ marginTop: "-10px", marginLeft: "5px" }}
      //     />
      //     <p
      //       style={{
      //         fontSize: "14px",
      //         // marginTop: "8px",
      //         overflowWrap: "break-word",
      //         width: "160px",
      //       }}
      //     >
      //       {option.topic}
      //     </p>
      //   </li>
      // )}
      renderOption={(props, option, { selected }) => {
        const isSelected = localSelectedTags.some(
          (tag: any) => tag.topic === option.topic
        );
        return (
          <li
            style={{
              minHeight: "30px",
              maxHeight: "max-content",
              display: "flex",
              alignItems: "flex-start",
              padding: "0px",
              paddingTop: "5px",
            }}
            {...props}
          >
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={isSelected}
              sx={{ marginTop: "-10px", marginLeft: "5px" }}
            />
            <p
              style={{
                fontSize: "14px",
                overflowWrap: "break-word",
                width: "160px",
              }}
            >
              {option.topic}
            </p>
          </li>
        );
      }}
      style={{ width: 500 }}
      renderTags={() => {
        return TaskMain ? (
          <div style={{ display: "flex", marginTop: "4px" }}>
            {" "}
            <p
              style={{
                color: "#818181",
                fontSize: "14px",
                fontWeight: "500",
                marginLeft: "8px",
                marginTop: "-2px",
              }}
            >
              Tags
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
                marginLeft: "4px",
                marginTop: "2px",
              }}
            >
              {localSelectedTags.length}
            </div>
          </div>
        ) : null;
      }}
      renderInput={(params) => (
        <TextField
          sx={{
            "& .MuiAutocomplete-input": {
              display: "none",
            },
            "& .MuiFormLabel-root": {
              fontSize: "14px",
              fontWeight: "500",
            },
            zIndex: "10",
            minWidth: "110px",
            maxWidth: "110px",
            backgroundColor: !TaskMain ? "white" : "#F4F4F4",
            borderRadius: "5px",
            fontSize: "12px",
          }}
          {...params}
          label={localSelectedTags?.length < 1 && "Tags"}
        />
      )}
      PaperComponent={({ children }) => (
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            minWidth: "275px",
            boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              placeholder="Start searching"
              style={{
                marginTop: "15px",
                border: "none",
                paddingBottom: "10px",
                borderBottom: "1px solid #818181",
                marginLeft: "15px",
                width: "65%",
                paddingTop: "5px",
              }}
            />{" "}
            <Button
              style={{
                borderRadius: "4px",
                height: "28px",
                width: "50px",
                color: "#818181",
                backgroundColor: "transparent",
                border: "1px solid #818181",
                marginRight: "15px",
                cursor: "pointer",
              }}
            >
              Done
            </Button>{" "}
          </Box>
          {children}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #818181",
              height: "56px",
            }}
            p={2}
            bgcolor="background.paper"
          >
            <Button
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "#0076C8",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            >
              Clear all
            </Button>
            <Button
              style={{
                backgroundColor: "#0076C8",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
                height: "28px",
                width: "55px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleApply();
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      )}
    />
  );
};

export default TopicTagsFilter;
