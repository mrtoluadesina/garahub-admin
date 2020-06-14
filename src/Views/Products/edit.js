import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../../actions/productAction';

import Add from "./add"
export default function Edit(props) {
    const {id} = useParams();
    const  {products: {productObj}} = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchProduct(id))

    },[id,dispatch])



    return (
        <div>
            <Add method="edit" object={productObj}/>
        </div>
    )
}
