import { request } from '@/api';
import React from 'react'
import { FaRegHeart, FaTrashAlt  } from "react-icons/fa";

const Products = ({data, isAdmin}) => {

  const handleDelete = id => {
    if(confirm("are you sure ?")){
      request
        .delete(`/product/delete/${id}`)
        .then(res => {
        })
    }
  }

  const productItems = data?.map((product)=> (
    <div key={product.id} className='w-80 p-3 border'>
        <img src={product.image} className='w-full h-60 object-cover' alt="" />
        <h3>{product.name}</h3>
        <p>{product.price} USD</p>
        {
          isAdmin ?
          <button onClick={()=> handleDelete(product.id)}><FaTrashAlt/></button>
          :
          <button><FaRegHeart/></button>
        }
    </div>
  ))
  return (
    <div className='flex gap-3 flex-wrap container mx-auto'>{productItems}</div>
  )
}

export default Products