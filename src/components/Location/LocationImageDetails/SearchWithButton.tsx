import { Box, Button, TextField } from "@mui/material";

interface SearchWithButtonProps {
  handleSearch: (searchText: string) => void;
  searchText: string;
  handleDone: () => void;
}

const SearchWithButton = ({
  searchText,
  handleSearch,
  handleDone,
}: SearchWithButtonProps) => {
  return (
    <Box sx={{
      padding:"0 16px 14px",
      display:"flex",
      alignItems:"center",
      gap:"12px"
    }}>
      <TextField
        variant="standard"
        placeholder="Start typing name"
        value={searchText}
        onChange={(event) => handleSearch(event.target.value)}
        sx={{
          maxWidth:"calc(100% - 64px)"
        }}
      />
      <Button onClick={handleDone} sx={{
         color: "#818181",
         textAlign: "center",
         fontSize: "12px",
         fontWeight: "700",
         lineHeight: "16px",
         borderRadius: "4px",
         backgroundColor: "#fff",
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         width: "52px",
         height: "28px",
         minHeight: "32px",
         textTransform: "capitalize",
         border: "1px solid #818181",
         padding: "0",
         minWidth: "auto",
         maxWidth: "Auto",
      }}>Done</Button>
    </Box>
  );
};

export default SearchWithButton;
