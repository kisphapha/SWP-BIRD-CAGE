/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import {
    Button,
    ButtonBase,
    FormControl,
    FormControlLabel,
    FormLabel,
    Paper,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Axios from 'axios'
import Popup from 'reactjs-popup'
// import EditProductForm from '../EditProductForm/index'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
import EditComponentForm from '../EditComponentForm'

export default function Components() {
    const [Components, setComponents] = useState([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [pageList, setPageList] = useState([])

    const [cate, setCate] = useState([])
    const [cageCate, setCageCate] = useState([])
    const [selectedCageCate, setSelectedCageCate] = useState('All')

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [upperPrice, setUpperPrice] = useState('')
    const [lowerPrice, setLowerPrice] = useState('')
    const [upperStock, setUpperStock] = useState('')
    const [lowerStock, setLowerStock] = useState('')
    const [prostatus, setProStatus] = useState('')
    const handleIdChange = (event) => {
        setId(event.target.value)
    }
    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }
    const handleCageCate = (event) => {
        setSelectedCageCate(event.target.value)
    }

    const handleUpperPriceChange = (event) => {
        setUpperPrice(event.target.value)
    }

    const handleLowerPriceChange = (event) => {
        setLowerPrice(event.target.value)
    }

    const handleUpperStockChange = (event) => {
        setUpperStock(event.target.value)
    }

    const handleLowerStockChange = (event) => {
        setLowerStock(event.target.value)
    }

    const handleStatusChange = (event) => {
        setProStatus(event.target.value)
    }
    const handleSwitchPage = (page) => {
        console.log(page)
        setPage(page)
    }
    async function handleDelete(id) {
        await axios.delete(`http://localhost:3000/Components/` + id)
        alert('Component deleted')
        handleFilter()
    }

    const handleFilter = async () => {
        const json = {
            id: id,
            name: name,
            category: category,
            upper_price: upperPrice,
            lower_price: lowerPrice,
            upper_stock: upperStock,
            lower_stock: lowerStock,
            status: prostatus,
            application : selectedCageCate,
            page: page
        }
        Axios.post('http://localhost:3000/component/filterComponent',json)
            .then((response) => {
                setComponents(response.data.data)
                setMaxPage(Math.ceil(response.data.lines.COUNT / 10))
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
    async function fetchCates() {
        setCate([
            "Móc","Nắp","Đáy","Nan","Bình nước","Khung","Cửa"
        ])
    }
    async function fetchCageCates() {
        const response = await axios.get('http://localhost:3000/category/')
        setCageCate(response.data)
    }

    useEffect(() => {
        setPageList(Array.from({ length: maxPage }))
    }, [maxPage])

    useEffect(() => {
        handleFilter()
        fetchCates()
        fetchCageCates()
    }, [page])
    const status = [
        {
            value: 'All',
            label: 'All'
        },
        {
            value: 'Enable',
            label: 'Enable'
        },
        {
            value: 'Disable',
            label: 'Disable'
        }
    ]

    return (
        <div className="px-2 py-2 w-full  mb-96">
            <div className="flex-col">
                <div className="my-5">Component</div>
                {/* <Button onClick={() => '/admin/NewComponent'}>New Component</Button> */}
            </div>
            <div>Áp dung cho</div>
            <div>
                <TextField className="w-64" select label="Loại" variant="filled" onChange={handleCageCate}>
                    <MenuItem value={'All'}>All</MenuItem>
                    {cageCate.map((cate) => (
                        cate.Allow_customize == 1 && (
                            <MenuItem key={cate.id} value={cate.id}>
                                {cate.name}
                            </MenuItem>
                        )
                    ))}
                </TextField>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <div className="flex-row">
                                    {/* <div>Mã SP</div> */}
                                    <div>
                                        <TextField className="w-16" id="outlined-basic" label="Mã SP" variant="standard" onChange={handleIdChange} />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <div>Image</div>
                                    {/* <div>Hình ảnh</div> */}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <div>Name</div>
                                    <div>
                                        <TextField
                                            className="w-64"
                                            id="outlined-basic"
                                            label="Tên sản phẩm"
                                            variant="standard"
                                            onChange={handleNameChange}
                                        />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <div>Giá</div>
                                    <div className="flex">
                                        <div className="w-16">
                                            <TextField
                                                className="w-12"
                                                id="outlined-basic"
                                                label="From"
                                                variant="standard"
                                                onChange={handleLowerPriceChange}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                className="w-12"
                                                id="outlined-basic"
                                                label="To"
                                                variant="standard"
                                                onChange={handleUpperPriceChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <div>Số lượng</div>
                                    <div className="flex">
                                        <div className="w-16">
                                            <TextField
                                                className="w-12"
                                                id="outlined-basic"
                                                label="From"
                                                variant="standard"
                                                onChange={handleLowerStockChange}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                className="w-12"
                                                id="outlined-basic"
                                                label="To"
                                                variant="standard"
                                                onChange={handleUpperStockChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <div>Phân loại</div>
                                    <div>
                                        <TextField className="w-64" select label="Loại" variant="filled" onChange={handleCategoryChange}>
                                            <MenuItem value={'All'}>All</MenuItem>
                                            {cate.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <div> Trạng thái</div>
                                    <div>
                                        <TextField className="w-32 text-left" select label="Status" variant="filled" onChange={handleStatusChange}>
                                            {status.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <div><Button variant="contained" onClick={handleFilter}>FILTER</Button></div>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Components.map((Component) => (
                            <TableRow>
                                <TableCell>{Component.ID}</TableCell>
                                <TableCell>
                                    <img className="w-16 h-16   " src={Component.Picture} />
                                </TableCell>
                                <TableCell>{Component.Name}</TableCell>
                                <TableCell>{Component.Price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</TableCell>
                                <TableCell>{Component.Stock}</TableCell>
                                <TableCell>{Component.Type}</TableCell>
                                <TableCell>{Component.Status}</TableCell>
                                <TableCell>
                                    {' '}
                                    <div className="flex justify-end">
                                        <Popup
                                            trigger={
                                                <button className="">
                                                    <ModeEditIcon fontSize="medium" />
                                                </button>
                                            }
                                            position="right center"
                                            modal
                                            closeOnDocumentClick={false}
                                            closeOnEscape={false}
                                        >
                                            {(close) => (
                                                <div>
                                                    <div className="flex place-content-between ">
                                                        <div className="m-4 font-bold text-lg">Chỉnh sửa sản phẩm </div>
                                                        <div>
                                                            <Button variant="outlined" className="" onClick={close}>
                                                                X
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <EditComponentForm ComponentId={Component.Id} close={close} handleFilter={handleFilter} />
                                                </div>
                                            )}
                                        </Popup>
                                        <button onClick={() => handleDelete(Component.Id)}>
                                            <DeleteIcon fontSize="medium" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="flex justify-center my-4">
                {pageList.map((pg, index) => (
                    <td key={index}>
                        <div className="items-center">
                            <Button variant={index + 1 === page ? 'contained' : 'outlined'} onClick={() => handleSwitchPage(index + 1)}>
                                {index + 1}
                            </Button>
                        </div>
                    </td>
                ))}
            </div>
        </div>
    )
}
