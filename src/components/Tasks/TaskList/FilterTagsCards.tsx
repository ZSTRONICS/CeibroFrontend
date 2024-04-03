import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Box, Checkbox } from "@mui/material";
import { Topic } from "constants/interfaces";

interface TagsFilterProps {
  options: Topic[];
  handleSelect: any;
  selectedOptions: any;
  //   checkedIcon: any;
}

const FilterTagsCards = ({
  options,
  handleSelect,
  selectedOptions,
}: //   checkedIcon,
TagsFilterProps) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

  const TagsRender = options?.map((Tags) => {
    return (
      <>
        <li
          onClick={() => handleSelect(Tags)}
          style={{
            minHeight: "30px",
            maxHeight: "max-content",
            display: "flex",
            alignItems: "flex-start",
            padding: "0px",
            paddingTop: "5px",
            cursor: "pointer",
          }}
        >
          <Checkbox
            // icon={checkedIcon}
            // checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selectedOptions.some(
              (projects: any) => projects._id === Tags._id
            )}
            sx={{ marginLeft: "5px" }}
          />
          <p
            style={{
              fontSize: "14px",
              overflowWrap: "break-word",
              width: "160px",
            }}
          >
            {Tags.topic}
          </p>
        </li>
      </>
    );
  });

  return (
    <>
      <Box sx={{ maxHeight: "300px", overflow: "auto" }}>{TagsRender}</Box>
    </>
  );
};

export default FilterTagsCards;
