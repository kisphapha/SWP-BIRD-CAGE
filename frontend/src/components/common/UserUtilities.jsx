import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './UserUtilities.css'
import { Assignment, CurrencyBitcoin, LocationOn, Person } from '@mui/icons-material'

const UserUtilities = (props) => {
    return (
        <div className="user-utilities  ">
            <div className="user-holder">
                <img src={props.user.Picture} />
                <h1>{props.user.Name}</h1>
            </div>
            <hr />
            <div className="utilities">
                <NavLink to="/user/profile" activeClassName="active">
                    <div className="ult-txt">
                        <Person /> My Profile
                    </div>
                </NavLink>
                <NavLink to="/user/purchase" activeClassName="active">
                    <div className="ult-txt">
                        <Assignment />
                        Purchased
                    </div>
                </NavLink>
                <NavLink to="/user/address" activeClassName="active">
                    <div className="ult-txt">
                        <LocationOn />
                        Address
                    </div>
                </NavLink>
                <NavLink to="/" activeClassName="active">
                    <div className="ult-txt">
                        <CurrencyBitcoin />
                        BiCa Coin
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default UserUtilities
