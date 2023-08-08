// @ts-nocheck
import React from "react";
import SelectedContactBox from "../SelectedContactBox";
import ContactBox from "../ContactBox";
import { Box } from "@mui/material";
import SearchBox from "../SearchBox";

const SelectedContactList = () => {
  return (
    <>
      {["asdas", "asdas"].map((contact) => {
        return <SelectedContactBox />;
      })}
    </>
  );
};

function groupByFirstLetter(arr: any) {
  // Sort the array alphabetically based on the name property
  const sortedArr = arr.slice().sort((a, b) => a.name.localeCompare(b.name));
  const groupedObj: any = {};

  sortedArr.forEach((item: any) => {
    const firstLetter = item.name[0].toUpperCase();
    if (groupedObj[firstLetter]) {
      groupedObj[firstLetter].push(item);
    } else {
      groupedObj[firstLetter] = [item];
    }
  });

  return groupedObj;
}

export default function ContactList() {
  return (
    <Box>
      <SearchBox />
      {/* <SelectedContactList /> */}
      <ContactBox
        profilePic={""}
        firstName={""}
        surName={""}
        contactFullName={""}
        companyName={""}
      />

      <ContactBox
        profilePic={""}
        firstName={""}
        surName={""}
        contactFullName={""}
        companyName={""}
      />
    </Box>
  );
}
