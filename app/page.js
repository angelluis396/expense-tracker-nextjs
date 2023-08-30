'use client'
import React, {useState, useEffect} from 'react'
import { collection, 
  addDoc, 
  getDocs,   
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,  
} from "firebase/firestore";
import { db } from './firebase'; 



const Home = () => {
  const [items, setItems] = useState([
    // { name: 'Starbucks', price: 20.00 }, 
    // { name: 'AMC', price: 45.00 },
    // { name: 'LuLuLemon', price: 98.00 },
  ])
const [newItem, setNewItem] = useState({name: '', price: ''})
const [ total, setTotal] = useState(0)

//Add item to the db
const addItem = async (e) => {
  e.preventDefault();
  if(newItem.name !== '' && newItem.price !== ''){
    //setItems([...items, newItem]);
    await addDoc(collection(db, 'items'), {
      name: newItem.name.trim(),
      price: newItem.price,
    })
    setNewItem({name: '', price:''});
  }
}

//Read items from db
useEffect(() =>{
  const q = query(collection(db, 'items'))
  const unsubscribe = onSnapshot(q, (querySnapshot)=> {
    let itemsArr = [] 

    querySnapshot.forEach((doc) => {
      itemsArr.push({...doc.data(), id: doc.id})
    });
    setItems(itemsArr)

    //Read total of items from itemsArr
    const calculateTotal = () => {
      const totalPrice = itemsArr.reduce((sum, item ) => sum + parseFloat(item.price), 0)
      setTotal(totalPrice)
    }
    calculateTotal()
    return () => unsubscribe();
  });
}, []);

//Delete items from db
const deleteItem = async (id) => {
  await deleteDoc(doc(db, 'items', id))
}

  return (
    <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4'>
      <div className='z-10 w-full max-w-5xl items-center justify-between'>
        <h1 className='text-4xl p-4 text-center'> Spensy Tracker</h1>
          <p> Tired of always losing track of what you and your partner spent money on?!? </p>
          <br/>
          <p> Look no further then Spensy, your daily expense tracker! </p>
        <div className='bg-slate-800 p-4 rounded-lg'>
          <form className='grid grid-cols-6 items-center text-black'>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}             
              type='text' 
              placeholder='Enter Item'
              id='input'  
              className='col-span-3 p-3 border'
            />

            <input
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              type='number' 
              placeholder='Enter $'
              id='input'
              className='col-span-2 p-3 border mx-3'
            />

            <button 
              onClick={addItem}
              type='submit'
              className='bg-slate-950 hover:bg-slate-900 p-3 text-xl'
            > 
              + 
            </button>

          </form>
          <ul>
            {items.map((item, id)=> (
              <li
              key={id}
              className='my-4 w-full flex justify-between bg-slate-950'
            >
              <div className='p-4 w-full flex justify-between'> 
                <span className='capitalize'>{item.name}</span>
                <span>${item.price}</span>
              </div>
              <button 
                onClick={() => deleteItem(item.id)}
                className='ml-8 p-4 border-l-2 border-slate-900  w-16'
              > 
                X 
              </button>
            </li>
            ))}
          </ul>
          {items.length < 1 ? ('') : (
            <div className='flex justify-between p-3'>
              <span>Total</span>
              <span>${total}</span>
          </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Home
