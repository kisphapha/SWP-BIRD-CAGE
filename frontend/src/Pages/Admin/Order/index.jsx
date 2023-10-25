import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userId', headerName: 'User ID', width: 130 },
    { field: 'orderDate', headerName: 'Order Date', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
        field: 'address',
        headerName: 'Address',
        width: 250
    },
    {
        field: 'phone',
        headerName: 'Phone',
        // description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160
        // valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
    },
    { field: 'total', headerName: 'Total', width: 130 },
    { field: 'note', headerName: 'Note', width: 150 },
    { field: 'createAt', headerName: 'Create At', width: 130 },
    { field: 'updateAt', headerName: 'Update At', width: 130 }
]

export default function Order() {
    const rows = [
        {
            id: 11,
            userId: '6',
            orderDate: '2023-09-30',
            status: 'True',
            address: 'New Location 1',
            phone: '0987654326',
            total: '1600000',
            note: 'Additional note 1',
            createAt: '2023-09-30',
            updateAt: '2023-09-30'
        },
        {
            id: 12,
            userId: '7',
            orderDate: '2023-10-01',
            status: 'False',
            address: 'New Location 2',
            phone: '0987654327',
            total: '1700000',
            note: 'Additional note 2',
            createAt: '2023-10-01',
            updateAt: '2023-10-01'
        },
        {
            id: 13,
            userId: '8',
            orderDate: '2023-10-02',
            status: 'True',
            address: 'New Location 3',
            phone: '0987654328',
            total: '1800000',
            note: 'Additional note 3',
            createAt: '2023-10-02',
            updateAt: '2023-10-02'
        },
        {
            id: 14,
            userId: '9',
            orderDate: '2023-10-03',
            status: 'True',
            address: 'New Location 4',
            phone: '0987654329',
            total: '1900000',
            note: 'Additional note 4',
            createAt: '2023-10-03',
            updateAt: '2023-10-03'
        },
        {
            id: 15,
            userId: '10',
            orderDate: '2023-10-04',
            status: 'True',
            address: 'New Location 5',
            phone: '0987654330',
            total: '2000000',
            note: 'Additional note 5',
            createAt: '2023-10-04',
            updateAt: '2023-10-04'
        },
        {
            id: 16,
            userId: '11',
            orderDate: '2023-10-05',
            status: 'True',
            address: 'New Location 6',
            phone: '0987654331',
            total: '2100000',
            note: 'Additional note 6',
            createAt: '2023-10-05',
            updateAt: '2023-10-05'
        },
        {
            id: 17,
            userId: '12',
            orderDate: '2023-10-06',
            status: 'True',
            address: 'New Location 7',
            phone: '0987654332',
            total: '2200000',
            note: 'Additional note 7',
            createAt: '2023-10-06',
            updateAt: '2023-10-06'
        },
        {
            id: 18,
            userId: '13',
            orderDate: '2023-10-07',
            status: 'False',
            address: 'New Location 8',
            phone: '0987654333',
            total: '2300000',
            note: 'Additional note 8',
            createAt: '2023-10-07',
            updateAt: '2023-10-07'
        },
        {
            id: 19,
            userId: '14',
            orderDate: '2023-10-08',
            status: 'True',
            address: 'New Location 9',
            phone: '0987654334',
            total: '2400000',
            note: 'Additional note 9',
            createAt: '2023-10-08',
            updateAt: '2023-10-08'
        },
        {
            id: 20,
            userId: '15',
            orderDate: '2023-10-09',
            status: 'True',
            address: 'New Location 10',
            phone: '0987654335',
            total: '2500000',
            note: 'Additional note 10',
            createAt: '2023-10-09',
            updateAt: '2023-10-09'
        }
    ]
    return (
        <div className=" w-full flex flex-col">
            <div className="m-10 font-bold pl-10">Users </div>
            <div className="mx-10     pb-10 h-screen">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 20 }
                        }
                    }}
                    pageSizeOptions={[10]}
                    checkboxSelection
                />
            </div>
        </div>
    )
}
