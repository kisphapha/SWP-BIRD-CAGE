import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import jwtDecode from 'jwt-decode'
import Popup from 'reactjs-popup'
import LoginCard from '../features/LoginCard'
import logo from '../../../src/image/icons/logo.svg'
import './Header.css'
// import banner from '../../image/banner/banner.png'

function Header() {
    const { user } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [keyword, setKeyword] = useState('')
    const [googleUser, setGoogleUser] = useState('')
    const [isTriggerClicked, setIsTriggerClicked] = useState(false)
    const navigate = useNavigate()

    function handleSignOut(e) {
        sessionStorage.removeItem('loginedUser')
        navigate('/')
        window.location.reload()
    }

    function handlecallbackResponse(response) {
        document.getElementById('google').hidden = true
        // console.log('Encoded JWT ID Token: ' + response.credential)
        var userObject = jwtDecode(response.credential)
        setGoogleUser(userObject)
        //console.log(userObject)
        setEmail(userObject.email)
    }

    const handleLogin = () => {
        setIsTriggerClicked(true)
    }

    const handleClick = () => {
        navigate('/')
    }

    const handleKeyword = (event) => {
        setKeyword(event.target.value)
    }

     const handleSearch = () => {
         if (keyword.trim() != '') navigate(`/filter/2/${keyword}`)
         //a`); alert("You have been attacked")//
     }

    return (
        <div id="header">
            <section className="header-top">
                <div className="service">
                    <div className="contact">
                        <div>
                            Chăm sóc khách hàng: <Link to="/user/contact">0334567856</Link>
                        </div>
                        {/* <div className="intro">Shop Bán Lồng Chim Đẹp Giá Rẻ & Cao Cấp</div> */}
                    </div>
                </div>
                {user == null ? (
                    <Popup
                        contentStyle={{ width: '500px', height: '250px', borderRadius: '10px' }}
                        trigger={
                            <button type="button" className="login" onClick={handleLogin}>
                                <span>Đăng nhập</span>
                            </button>
                        }
                        position="center"
                        modal
                    >
                        {(close) => (
                            <div className="login-popup">
                                <LoginCard />
                            </div>
                        )}
                    </Popup>
                ) : (
                    <div className="user-info">
                        <Link to="/user/profile" className="avatar">
                            <img src={user.Picture} alt="avatar" />
                        </Link>
                        <ul className="user-info-list">
                            {JSON.parse(sessionStorage.loginedUser).Role == 'Admin' ? (
                                <Link to="/admin" className="user-info-suboptions">
                                    <li>Thống kê</li>
                                </Link>
                            ) : (
                                <></>
                            )}
                            <Link to="/user/profile" className="user-info-suboptions">
                                <li>Thông tin cá nhân</li>
                            </Link>
                            <Link to="/user/purchase" className="user-info-suboptions">
                                <li>Đơn hàng của tôi</li>
                            </Link>
                            <Link onClick={(e) => handleSignOut(e)} className="user-info-suboptions">
                                <li>Đăng xuất</li>
                            </Link>
                        </ul>
                    </div>
                )}
            </section>

            <section className="header-bottom">
                <div className="logo" onClick={handleClick}>
                    <img src={logo} style={{height:"60px", width: "60px"}}/>
                    BICA
                </div>
                <form className="search-container">
                    <input onChange={handleKeyword} className="search-bar" type="text" placeholder="Tìm kiếm" />
                    <button onClick={handleSearch} className="search-button">
                        🔍︎
                    </button>
                </form>
                <div> </div>
            </section>
        </div>
    )
}

export default Header
