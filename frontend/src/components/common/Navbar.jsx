import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import TocIcon from '@mui/icons-material/Toc'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone'
import { Badge } from '@mui/material'
export default function Navbar() {
    const [cartData, setCartData] = useState({ products: [] })
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const cartDataFromSession = sessionStorage.getItem('cart')
        if (cartDataFromSession) {
            setCartData(JSON.parse(cartDataFromSession))
        }
        setLoading(false)
    }, [cartData])
    
    const totalProductQuantity = () => {
        let total = 0
        cartData.products.forEach((product) => {
            if (product != null) {
                total += product.quantity
            }
        })
        return total
    }
    return (
        <div id="navbar">
            <div className="menu">
                <div className="menu-button"><TocIcon />Danh Mục Sản Phẩm</div>
                <ul className="menu-list">
                    <li>Lồng Chim</li>
                    <li>Phụ Kiện</li>
                </ul>
            </div>
            <nav className="nav">
                <NavLink to="/" acctiveClassName="active">
                    <div className="nav-content"><HomeIcon />Trang Chủ</div>
                </NavLink>
                <NavLink to="/About" activeClassName="active">
                    <div className="nav-content"><InfoIcon />Giới Thiệu</div>
                </NavLink>
                <NavLink to="/Contact" acctiveClassName="active">
                    <div className="nav-content"><ContactPageIcon />Liên Hệ</div>
                </NavLink>
                <NavLink to="/Custom" acctiveClassName="active">
                    <div className="nav-content"><DesignServicesIcon />Lồng Tùy Chỉnh</div>
                </NavLink>
                <button className="cart-button" onClick={() => navigate(`/cart`)}>
                    <Badge badgeContent={totalProductQuantity()} color="error">
                        <ShoppingCartTwoToneIcon sx={{ fontSize: 30 }} />
                    </Badge>
                </button>
            </nav>
        </div>
    )
}