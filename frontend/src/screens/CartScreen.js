import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions.js/cartActions';
import MessageBox from '../components/MessageBox';
import {Link} from 'react-router-dom';
export default function CartScreen(props) {
    const productId=props.match.params.id;
    const qty=props.location.search
    ? Number(props.location.search.split('=')[1])
    :1;
    const cart=useSelector((state)=>state.cart);
    const {cartItems} =cart;

    const dispatch=useDispatch();
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    },[dispatch,productId,qty]);

    const removeFromChartHandler=(id)=>{
        //delete action
    }
    const checkoutHandler=()=>{
        props.history.push('/signin?redirect=shipping');
    }
    return (
        <div className="row column">
            <div className="cart">
                <h1>Shopping Cart</h1>
                {cartItems.length===0?<MessageBox variant="danger">
                    Cart is empty. <Link to="/">Go Shopping</Link>
                </MessageBox>
                :(
                    <ul>
                        {cartItems.map(item=>(
                            <li key={item.product}>
                                <div className="row center">
                                    <div className="width20">
                                        <img src={item.image} 
                                                alt={item.name} 
                                                className="small"

                                        />
                                    </div>
                                    <div className="width20">
                                        <p><Link to={`/product/${item.product}`}>{item.name}</Link></p>
                                    </div>
                                    <div className="width20">
                                        <select value={item.qty} 
                                                onChange={(e)=>
                                                    dispatch(addToCart(item.product,
                                                    Number(e.target.value)))}
                                        >
                                            {
                                                [...Array(item.countInStock).keys()].map((x)=>(
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                                ))
                                            }       
                                        </select>
                                    </div>
                                    <div className="width20"><p>${item.price}</p></div>
                                    <div className="width20">
                                        <button type="button"
                                                onClick={()=>removeFromChartHandler(item.product)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="center">
                <div className="card medium card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((sum,item)=>sum +item.qty,0)} items): $
                                    {cartItems.reduce((total,item)=>total+item.price*item.qty,0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length===0}>
                              Proceed to checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
