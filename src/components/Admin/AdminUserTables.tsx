import { Avatar } from '@mui/material';
import React from 'react'
import { GenericTable, MenuColumn } from './MuiTable/CTable';

function AdminUserTables(props:any) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 100,  },
        {
            field: 'profilePic',
            headerName: 'Avatar',
            width: 120,
            renderCell: (params:any) => (
              <Avatar alt={params.row.name} src={`https://i.pravatar.cc/150?u=${params.row.id}`} />
            ),
          },
        { field: 'detail', headerName: 'Personal Details ', width: 320, renderCell: (params:any) => (
            <div >
              <div>{params.value}</div>
              <div>{params.row.email}</div>
              <div>{params.row.phone}</div>
            </div>
          )
        },
        { field: 'work', headerName: 'Work Details ', width: 320, renderCell: (params:any) => (
            <div >
              <div>{params.value}</div>
              <div>{params.row.email}</div>
              <div>{params.row.phone}</div>
            </div>
          )
        },
        { field: 'regDate', headerName: 'Reg Date', width: 150,  },
        MenuColumn({
          field: 'action',
          headerName: 'Action',
          onClickEdit: (row) => console.log(`Edit row ${row.id}`),
          onClickDelete: (row) => console.log(`Delete row ${row.id}`),
        }),
      ];
console.log('props',props);

      const rows = [
        { id: 1,regDate:'22.04.2021', detail: 'John Smith', email: 'john@example.com', phone:'0230439482098', work:'zatronics', profilePic:"pic" },
        { id: 2, regDate:'22.04.2021',detail: 'Jane Doe', email: 'jane@example.com',phone:'0230439482098', work:'zatronics',profilePic:"pic"  },
        { id: 3, regDate:'22.04.2021',detail: 'Bob Johnson', email: 'ali@example.com',phone:'0230439482098', work:'zatronics',profilePic:"pic"  },
      ];
  return (
    <GenericTable rows={rows} columns={columns} />
  )
}

export default AdminUserTables