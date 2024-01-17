import { useState , useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([
      {id: 1, name: "Shirt", price:100 , qty : 0},
      {id: 2, name: "Paint", price:200 , qty : 0},
      {id: 3, name: "Shoes", price:300 , qty : 0},
      
  ])

  const [cart , setCart] = useState([]);
  const [total , setAmount] = useState(0);
  
  useEffect(() => {
    setCart(cart.filter(c => c.qty > 0));
    setAmount(cart.reduce((acc , curr) => acc + Number(curr.price) * curr.qty , 0))
   },[data])

  const handleUpdate = (id , item) => {
    const findIndex = data.findIndex(item =>  item.id === id);
    const items = [...data];
    items[findIndex].qty += 1;
    if(items[findIndex].qty > 0){
      setData(items);
    }

    const alreadyThere  = cart.some(c => c.id === id);
    if(!alreadyThere){
      setCart([...cart , item]);
    }
  }


  const handleUpdateRemove = (id) => {
    const findIndex = data.findIndex(item =>  item.id === id);
    const items = [...data];
    if(items[findIndex].qty > 0){
      items[findIndex].qty -= 1;
      setData(items);
    }
  }

  return (
    <div className='container'>
    <div>
    <div className='heading'>
          <h2>Products</h2>
        </div>
      <div className="left flex direction gap">
        {data.map(item => (
          <div className='product flex gap around'>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <div className='flex gap'>
            <button onClick={() => handleUpdate(item.id , item)}>+</button>
            <span>{item.qty}</span>
            <button onClick={() => handleUpdateRemove(item.id)}>-</button>
            </div>
          </div>
        ))}
      </div>
      </div>

      <div>
        
      <div className="right">
        <div className='heading flex direction'>
          <h2>Cart</h2>
          <p>{cart.length <= 0 && "No Products added To Cart"}</p>

        </div>
          <div className='flex gap direction'>
            {cart && cart.map(c => (
              <div className='flex gap around product'>
                <p>{c.name}</p>
                <p>{c.qty} X {c.price}</p>
              </div>
            ))}
          </div>
          {cart.length > 0 &&
            <div className="total">
              <p> Total {total}</p>
            </div>
          }
        </div>
      </div>      
      </div>

  )
}

export default App
