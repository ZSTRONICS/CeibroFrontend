import { Box, Checkbox } from "@mui/material";

interface ProjectFilterProps {
  options: Project[];
  handleSelect: any;
  selectedOptions: any;
  // checkedIcon: any;
}

const FilterProjectCard = ({
  options,
  handleSelect,
  selectedOptions,
}: // checkedIcon,
ProjectFilterProps) => {
  const CardRender = options?.map((option) => {
    return (
      <li
        onClick={() => handleSelect(option)}
        style={{
          display: "flex",
          alignItems: "flex-start",
          padding: "0px",
          cursor: "pointer",
          paddingRight: "2px",
        }}
      >
        <Checkbox
          // icon={checkedIcon}
          // checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selectedOptions.some(
            (projects: any) => projects._id === option._id
          )}
          sx={{ marginLeft: "5px" }}
        />
        <Box sx={{ marginTop: "8px" }}>
          <p
            style={{
              fontSize: "14px",
              color: "#131516",
              overflowWrap: "break-word",
              width: "160px",
              fontWeight: 700,
              minHeight: "max-content",
              paddingBottom: "0px",
            }}
          >
            {option.title}
          </p>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <p
                style={{
                  fontSize: "12px",
                  color: "#131516",
                  fontWeight: 500,
                }}
              >
                {option.creator.firstName}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  marginLeft: "5px",
                  color: "#131516",
                  fontWeight: 500,
                }}
              >
                {option.creator.surName}
              </p>
            </Box>
            <p
              style={{
                fontSize: "12px",
                color: "#605C5C",
                fontWeight: 500,
              }}
            >
              {option.creator.companyName}
            </p>
          </Box>
        </Box>
      </li>
    );
  });

  return (
    <>
      <Box sx={{ height: "300px", overflow: "auto" }}>{CardRender}</Box>
    </>
  );
};

export default FilterProjectCard;
