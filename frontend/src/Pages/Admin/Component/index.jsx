/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { Button, ButtonBase, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Axios from 'axios'
import Popup from 'reactjs-popup'
import EditProductForm from '../EditProductForm/index'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'

export default function Components() {
    const [Components, setComponents] = useState([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [pageList, setPageList] = useState([])

    const [cate, setCate] = useState([])
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
        alert('Product deleted')
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
            page: page
        }
        Axios.post('http://localhost:3000/Components/filter/', json)
            .then((response) => {
                setComponents(response.data.data)
                setMaxPage(Math.ceil(response.data.lines.Count / 10))
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
    async function fetchCates() {
        Axios.get('http://localhost:3000/category')
            .then((response) => {
                setCate(response.data)
            })
            .catch((error) => {
                console.error('Error fetching category data:', error)
            })
    }

    useEffect(() => {
        setPageList(Array.from({ length: maxPage }))
    }, [maxPage])

    useEffect(() => {
        handleFilter()
        fetchCates()
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
                <div className="my-5">Product</div>
                {/* <Button onClick={() => '/admin/NewProduct'}>New Product</Button> */}
            </div>

            <table className="bg-white w-full m-4 m-2">
                <thead>
                    <tr className="items-center flex h-10 w-full">
                        <th className="w-1/12 text-left pl-2">Mã SP</th>
                        <th className="w-1/6 text-left">Tên sản phẩm</th>
                        <th className="w-1/12 text-left"></th>
                        <th className="w-1/6 text-left ml-12">Giá</th>
                        <th className="w-1/6 text-left">Số lượng</th>
                        <th className="w-1/6 text-left">Phân loại</th>
                        <th className="w-1/6 text-left">Status</th>
                        {/* <th className="w-1/12 text-left"></th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr className="items-center flex w-full  space-x-4　">
                        <td className="w-1/12 pl-2">
                            <TextField className="w-16" id="outlined-basic" label="Mã SP" variant="standard" onChange={handleIdChange} />
                        </td>
                        <td className="w-1/6">
                            <TextField className="w-64" id="outlined-basic" label="Tên sản phẩm" variant="standard" onChange={handleNameChange} />
                        </td>
                        <td className="w-1/6 flex gap-4 ml-24 pl-8">
                            <TextField className="w-16" id="outlined-basic" label="From" variant="standard" onChange={handleLowerPriceChange} />
                            <TextField className="w-16" id="outlined-basic" label="To" variant="standard" onChange={handleUpperPriceChange} />
                        </td>
                        <td className="w-1/6 flex gap-4 pl-8 ">
                            <TextField className="w-12" id="outlined-basic" label="From" variant="standard" onChange={handleLowerStockChange} />
                            <TextField className="w-12" id="outlined-basic" label="To" variant="standard" onChange={handleUpperStockChange} />
                        </td>
                        <td className="w-1/5">
                            <TextField className="w-64" select label="Loại" variant="filled" onChange={handleCategoryChange}>
                                <MenuItem value={'All'}>All</MenuItem>
                                {cate.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </td>
                        <td className="w-1/12">
                            <TextField className="w-32 text-left" select label="Status" variant="filled" onChange={handleStatusChange}>
                                {status.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </td>
                        <td className="w-1/12 text-end pr-2">
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setPage(1)
                                    handleFilter()
                                }}
                            >
                                Filter
                            </Button>
                        </td>
                    </tr>
                    {Components.map((product) => (
                        <div>
                            <hr className="my-2" />
                            <tr className="items-center flex  w-full">
                                <td className="w-8 mx-2 text-center">{product.Id}</td>
                                <td className="w-16 ">
                                    <img className="w-16 h-16   " src={product.Url} />
                                </td>
                                <td className="w-1/4 mx-2">{product.Name}</td>
                                <td className="w-1/12 ml-12 pr-8 text-right">
                                    {product.Price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                </td>
                                <td className="w-1/6 text-center">{product.Stock}</td>
                                <td className="w-1/6 ml-20">{product.Shape}</td>
                                <td className="w-1/12 text-end ">{product.Status}</td>
                                <td className="w-32 ml-4   ">
                                    {/* Use 'flex' and 'justify-end' to move buttons to the right */}
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
                                                    <EditProductForm productId={product.Id} close={close} handleFilter={handleFilter} />
                                                </div>
                                            )}
                                        </Popup>
                                        <button onClick={() => handleDelete(product.Id)}>
                                            <DeleteIcon fontSize="medium" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </div>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center">
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
