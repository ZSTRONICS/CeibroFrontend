import { Button, Grid, Input } from "@mui/material";
import React from "react";

interface IProps {
  searchBtnLabel?: string;
  placeholder?: string;
}

export default function SearchBox(props: IProps) {
  const { searchBtnLabel = "Search", placeholder = "Searching...." } = props;
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <Input
          sx={{
            borderBottom: "1px solid #000",
          }}
          placeholder={placeholder}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <Button fullWidth>{searchBtnLabel}</Button>
      </Grid>
    </Grid>
  );
}
