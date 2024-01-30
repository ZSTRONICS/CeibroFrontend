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
    <Box>
      <TextField
        variant="standard"
        placeholder="Start typing name"
        value={searchText}
        onChange={(event) => handleSearch(event.target.value)}
      />
      <Button onClick={handleDone}>Done</Button>
    </Box>
  );
};

export default SearchWithButton;
