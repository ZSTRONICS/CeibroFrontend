import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import ContactBox from "components/Utills/ContactBox";
import { Contact } from "constants/interfaces";
import React, { useMemo } from "react";
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
  const getItemSize = (index: number): number => {
    const item = contactList[index];
    let size = 60;
    if (React.isValidElement(item) && item.type === Typography) {
      size = 30;
    }else if(React.isValidElement(item) && item.type === Divider){
size = 45;
    }
    return size;
  };

  const createElementList = (data: { [key: string]: any[] }) => {
    let createdElementedList: any[] = [];
    Object.entries(data).forEach(([groupLetter, groupOptions]) => {
      createdElementedList.push(
        <Typography key={`group-${groupLetter}`}>{groupLetter}</Typography>
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

  const renderContactList = () => {
    let contactListElements: any[] = [];
    const divider = <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
    contactListElements = [...createElementList(recentData),divider,...createElementList(filterData)]
    return contactListElements;
  };

  const contactList = useMemo(
    () => renderContactList(),
    [filterData, selected, recentData]
  );

  const Row = ({ index, style }: any) => (
    <div style={style}>{contactList[index]}</div>
  );

  return (
    <VariableSizeList
      className="contacts-scrollbar"
      height={420}
      width={"100%"}
      itemCount={contactList.length}
      itemSize={getItemSize}
      overscanCount={10}
    >
      {Row}
    </VariableSizeList>
  );
};

export default GroupContactList;
