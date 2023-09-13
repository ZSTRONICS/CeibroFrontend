import Typography from "@mui/material/Typography";
import ContactBox from "components/Utills/ContactBox";
import { Contact } from "constants/interfaces";
import React, { useMemo } from "react";
import { VariableSizeList } from "react-window";

interface GroupContactListProps {
  filterData: { [key: string]: any[] };
  filteredUsers?: any[];
  selected: any[];
  handleSelectedList: (contact: Contact, checked: boolean) => void;
}

const GroupContactList: React.FC<GroupContactListProps> = ({
  filterData,
  filteredUsers,
  selected,
  handleSelectedList,
}) => {
  const getItemSize = (index: number): number => {
    const item = contactList[index];
    let size = 60;
    if (React.isValidElement(item) && item.type === Typography) {
      size = 30;
    }
    return size;
  };

  const renderContactList = () => {
    const contactListElements: any[] = [];
    Object.entries(filterData).forEach(([groupLetter, groupOptions]) => {
      contactListElements.push(
        <Typography key={`group-${groupLetter}`}>{groupLetter}</Typography>
      );
      groupOptions.forEach((item) => {
        contactListElements.push(
          <ContactBox
            key={item._id}
            isDisabled={filteredUsers&&filteredUsers.some(
              (user: any) => user._id === item._id
            )}
            contact={item}
            handleSelectedList={handleSelectedList}
            selected={!!selected.find((contact) => contact._id === item._id)}
          />
        );
      });
    });

    return contactListElements;
  };
  const contactList = useMemo(() => renderContactList(), [filterData,selected]);
  console.log(contactList, "contact list");
  const Row = ({ index, style }) => <div style={style}>{contactList[index]}</div>;
  return (
    <VariableSizeList
      height={240} 
      width={"100%"}
      itemCount={contactList.length}
      itemSize={getItemSize}
    >
      {Row}
    </VariableSizeList>
  );
};

export default GroupContactList;
