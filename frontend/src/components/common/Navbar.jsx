import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone'
import HomeIcon from '@mui/icons-material/Home'
export default function Navbar() {
    const navigate = useNavigate()
    return (
        <div id="navbar">
            <div className="menu">
                <div className="menu-button">☰ Danh Mục Sản Phẩm </div>
                <ul className="menu-list">
                    <li>Lồng Chim</li>
                    <li>Phụ Kiện</li>
                </ul>
            </div>
            <nav className="nav">
                <NavLink to="/" acctiveClassName="active">
                    <div className="nav-content">
                        <HomeIcon />
                        Trang Chủ
                    </div>
                </NavLink>
                <NavLink to="/About" activeClassName="active">
                    <div className="nav-content">Giới Thiệu</div>
                </NavLink>
                <NavLink to="/Contact" acctiveClassName="active">
                    <div className="nav-content">Liên Hệ</div>
                </NavLink>
                <NavLink to="/Custom" acctiveClassName="active">
                    <div className="nav-content">Lồng Tùy Chỉnh</div>
                </NavLink>

                <button className="cart-button" onClick={() => navigate(`/cart`)}>
                    <ShoppingCartTwoToneIcon sx={{ fontSize: 30 }} />
                </button>
            </nav>
        </div>
    )
}
