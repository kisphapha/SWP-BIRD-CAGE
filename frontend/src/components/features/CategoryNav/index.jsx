
import React, { useState, useEffect } from 'react'
import './styles.css'
import { Link } from 'react-router-dom'


export default function CategoryNav({ parents, current }) {

    return (
        <table id="link-container">
            <tr className="link-list">
                {parents.map((parent) => (
                    <td key={parent} className="parents">
                        <Link to={parent.link }>{parent.name} ►</Link>
                    </td>
                ))}
                <td className="current">{current}</td>
            </tr>
        </table>
    )
}
