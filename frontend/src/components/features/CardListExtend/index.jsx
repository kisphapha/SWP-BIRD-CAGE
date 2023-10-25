import React, { useState, useEffect } from 'react'
import './styles.css'
import Card from '../Card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function CardListExtend({ categoryId, proList}) {
    return (
        <>
            
            <div id="item-container">
                <div className="item-list">
                    {proList.map((card) => (
                        <Card key={card}
                            percent={card.discount}
                            discount={parseInt(card.Price * (100 - card.discount) / 100).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                            image={card.Url}
                            itemId={card.Id}
                            material={card.material}
                            price={parseInt(card.Price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                            shape={card.Shape}
                            title={card.Name}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
