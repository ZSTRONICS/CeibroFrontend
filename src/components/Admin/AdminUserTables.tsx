import { ConfirmDescriptionTag, DocumentNameTag } from "components/CustomTags";
import CustomModal from "components/Modal";
import ProfileViewGlobal from "components/Profile/ProfileViewGlobal";
import { momentdeDateFormat } from "components/Utills/Globals/Common";
import NameAvatar from "components/Utills/Others/NameAvatar";
import React from "react";
import { GenericTable, MenuColumn } from "./MuiTable/CTable";

function AdminUserTables(props: any) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [userDataLocal, setUserData] = React.useState<{} | any>({});

  const handleToggle = (rowData: any) => {
    setOpen((prev: boolean) => !prev);
    rowData.firstName = String(rowData.name).split(" ")[0];
    rowData.surName = String(rowData.name).split(" ")[1];
    setUserData(rowData);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      sortable: false,
      filterable: false,
      width: 100,
    },
    {
      field: "profilePic",
      headerName: "",
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params: any) => {
        // return  <Avatar alt={params.row.id} src={`${params.value}`} />
        return (
          <NameAvatar
            firstname={String(params.row.name).split(" ")[0]}
            surname={String(params.row.name).split(" ")[1]}
            url={params.value}
            variant="circular"
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Personal Details ",
      sortable: false,
      filterable: false,
      width: 380,
      renderCell: (params: any) => (
        <div>
          <DocumentNameTag>{params.value}</DocumentNameTag>
          <ConfirmDescriptionTag sx={{ color: "#0075D0" }}>
            {params.row.email}
          </ConfirmDescriptionTag>
          <ConfirmDescriptionTag sx={{ color: "#000000" }}>
            {params.row.phone}
          </ConfirmDescriptionTag>
        </div>
      ),
    },
    {
      field: "work",
      headerName: "Work Details ",
      sortable: false,
      filterable: false,
      width: 380,
      renderCell: (params: any) => (
        <div>
          <DocumentNameTag>{params.value}</DocumentNameTag>
          <ConfirmDescriptionTag sx={{ color: "#0075D0" }}>
            {params.row.workEmail}
          </ConfirmDescriptionTag>
          <ConfirmDescriptionTag sx={{ color: "#000000" }}>
            {params.row.companyPhone}
          </ConfirmDescriptionTag>
        </div>
      ),
    },
    {
      field: "regDate",
      headerName: "Reg Date",
      sortable: false,
      filterable: false,
      width: 150,
      renderCell: (params: any) => (
        <div>
          <DocumentNameTag>{params.value}</DocumentNameTag>
        </div>
      ),
    },
    MenuColumn({
      field: "action",
      headerName: "Action",
      onClickEdit: (row) => handleToggle(row),
    }),
  ];
  const rows =
    props.users &&
    props.users.map((item: any, index: any) => {
      const localDate = momentdeDateFormat(item.createdAt);
      return {
        id: index + 1,
        name: `${item.firstName} ${item.surName}`,
        email: item.email,
        regDate: localDate,
        profilePic: item.profilePic,
        phone: item.phone === "" ? "N/A" : item.phone,
        work: item.companyName === "" ? "N/A" : item.companyName,
        workEmail: item.workEmail === "" ? "N/A" : item.workEmail,
        companyPhone: item.companyPhone === "" ? "N/A" : item.companyPhone,
      };
    });

  return (
    <>
      <GenericTable rows={rows} columns={columns} />
      {open === true && (
        <CustomModal
          // maxWidth="450px"
          showFullWidth={false}
          showDivider={true}
          showCloseBtn={true}
          title={"Personal Details"}
          isOpen={open}
          handleClose={() => setOpen((prev: boolean) => !prev)}
          children={<ProfileViewGlobal userData={userDataLocal} />}
        />
      )}
    </>
  );
}

export default AdminUserTables;
