import React, {createContext, useState, useEffect} from 'react';
// import { isHtmlElement } from 'react-router-dom/dist/dom';


export const CartContext = createContext();
const CartProvider = ({children}) => {

  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if(cart){
      const total = cart.reduce((accumulator, currentItem) =>{
        return accumulator + currentItem.price * currentItem.amount ;
      }, 0);
      setTotal(total);
    }
  }, [cart]);

  useEffect(() => {
    if(cart){
      const amount = cart.reduce((accumulator, currentItem) =>{
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  const addToCart = (id, product) =>{
    const newItem = {...product, amount:1};
    const CartItem = cart.find((item)=> {
      return item.id === id;
    });
    if(CartItem){
      const newCart = [...cart].map(item => {
        if(item.id === id){
          return{...item, amount: CartItem.amount + 1};
        } else{
          return item;
        }
      });
      setCart(newCart);
    }else{
      setCart([...cart,newItem]);
    }
    // console.log(product);
    // console.log(`item ${id,product} added to the cart`);
  };
  // console.log(cart);
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  const clearCart =() => {
    setCart([]);
  };

  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    // console.log(item);
    addToCart(id,cartItem);
    // addToCart(item, id);
    // console.log(`item ${id} increased`);
  };

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
    return item.id === id;
    });
      // console.log(item);
      if(cartItem){
        const newCart = cart.map((item) => {
          if(item.id === id){
            return {...item, amount:cartItem.amount -1};
          } else{
            return item;
          }
        });
        setCart(newCart);
      }
      if(cartItem.amount < 2){
        removeFromCart(id);
      }
  };
  return( 
    <CartContext.Provider value={{cart, addToCart , removeFromCart, clearCart , increaseAmount, decreaseAmount, itemAmount, total}}>{children}</CartContext.Provider>
  
  );
};

export default CartProvider;
