import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { useState } from 'react';
import assets from 'assets/assets';
import { styled } from '@mui/material/styles';

interface Row {
  [key: string]: any;
}

interface TableProps {
  rows: Row[];
  columns: GridColDef[];
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaderMenuIcon': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus-within': {
    outline: 'none',
  },
}));

const GenericTable = ({ rows, columns }: TableProps) => {

  return (
    <div style={{ height: '100%', width: '100%', minHeight: 400 }}>
      <StyledDataGrid rows={rows} columns={columns} rowHeight={80}
      autoHeight={true}
      disableColumnFilter={true}
      disableColumnMenu={true}
      disableColumnSelector={true}
      hideFooterPagination={true}
      />
    </div>
  );
};

interface MenuCellProps {
  value: string;
  onClickEdit: () => void;
}

const MenuCell = ({ value, onClickEdit }: MenuCellProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
const handleViewProfile=()=>{
    onClickEdit()
    handleMenuClose()
}
  return (
    <div>
      <IconButton onClick={handleMenuClick}>
        <assets.MoreVertOutlinedIcon/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewProfile}>View</MenuItem>
      </Menu>
    </div>
  );
};

interface MenuColumnProps {
  field: string;
  headerName: string;
  onClickEdit: (row: Row) => void;
}

const MenuColumn = ({ field, headerName, onClickEdit, }: MenuColumnProps) => {
  const column: GridColDef = {
    field,
    headerName,
    sortable: false,
    filterable: false,
    width: 120,
    renderCell: (params: { row: Row; }) => {
      const row: Row = params.row as Row;
      const handleEdit = () => {
        onClickEdit(row);

      };

      return (
        <MenuCell
          value={row[field]}
          onClickEdit={handleEdit}
        />
      );
    },
  };
  return column;
};

export { GenericTable, MenuColumn };