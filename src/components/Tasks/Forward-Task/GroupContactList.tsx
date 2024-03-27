import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import ContactBox from "components/Utills/ContactBox";
import { Contact } from "constants/interfaces";
import React, { useEffect, useState } from "react";
import { VariableSizeList } from "react-window";

interface GroupContactListProps {
  filterData: { [key: string]: any[] };
  recentData?: { [key: string]: any[] };
  filteredUsers?: any[];
  selected: any[];
  handleSelectedList: (contact: Contact, checked: boolean) => void;
}

const GroupContactList: React.FC<GroupContactListProps> = ({
  filterData,
  recentData = {},
  filteredUsers,
  selected,
  handleSelectedList,
}) => {
  const [contactListElement, setContactListElement] = useState<any[]>([]);
  const [itemSizes, setItemSizes] = useState<number[]>([]);

  const createElementList = (data: { [key: string]: any[] }) => {
    let createdElementedList: any[] = [];
    Object.entries(data).forEach(([groupLetter, groupOptions]) => {
      const isSuggestedLabel = groupLetter === "Suggested Users";
      createdElementedList.push(
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "14px",
            fontWeight: isSuggestedLabel ? 500 : 700,
            color: isSuggestedLabel ? "605b5c" : "black",
            pl: 1.4,
            pt: 1,
            lineHeight: "20px",
          }}
          key={`group-${groupLetter}`}
        >
          {groupLetter}
        </Typography>
      );
      groupOptions.forEach((item) => {
        createdElementedList.push(
          <ContactBox
            key={item._id}
            isDisabled={
              filteredUsers &&
              filteredUsers.some((user: any) => user._id === item._id)
            }
            contact={item}
            handleSelectedList={handleSelectedList}
            selected={!!selected.find((contact) => contact._id === item._id)}
          />
        );
      });
    });
    return createdElementedList;
  };

  const getItemSize = (renderContactListEle: any[]) => {
    let newItemsize = [];
    for (let i = 0; i < renderContactListEle.length; i++) {
      const item = renderContactListEle[i];
      let size = 54;
      if (React.isValidElement(item) && item.type === Typography) {
        size = 30;
      } else if (React.isValidElement(item) && item.type === Divider) {
        size = 45;
      }
      newItemsize.push(size);
    }
    return newItemsize;
  };

  const renderContactList = () => {
    let contactListElements: any[] = [];
    const divider = (
      <Divider
        key={"divider"}
        sx={{ marginTop: "20px", marginBottom: "20px" }}
      />
    );
    if (recentData) {
      contactListElements = [
        ...createElementList(recentData),
        // divider,
        ...createElementList(filterData),
      ];
    } else {
      contactListElements = [...createElementList(filterData)];
    }
    return contactListElements;
  };

  useEffect(() => {
    let renderContactListEle = renderContactList();
    setItemSizes(getItemSize(renderContactListEle));
    setContactListElement(renderContactListEle);
  }, [filterData, selected, recentData]);

  const Row = ({ index, style }: any) => (
    <div style={style}>{contactListElement[index]}</div>
  );

  return (
    <VariableSizeList
      key={itemSizes.length}
      className="contacts-scrollbar"
      height={350}
      width={"100%"}
      itemCount={contactListElement.length}
      itemSize={(index) => itemSizes[index]}
      overscanCount={10}
    >
      {Row}
    </VariableSizeList>
  );
};

export default GroupContactList;
