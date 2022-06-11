import React , {createContext , useContext , useState, useEffect} from "react";
import { Toast } from "react-hot-toast";

//Context 객체 생성

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart , setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState();

    const [totalPrice , setTotalPrice] = useState();
    const [totalQuantities , setTotalQuantities] = useState()
    const [qty , setQty ] = useState(1);

    //장바구니 추가 
    const onAdd = (product, quantity) => {
       const checkProductInCart = cartItems.find(item=>item._id === product._id);

       if(checkProductInCart){
           setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
           setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities + quantity)

           const updateCartitems = cartItems.map((cartProduct) => {
               if(cartProduct._id === product._id) return {
                   ...cartProduct,
                   quantity:cartProduct.quantity + quantity
               }
           });
       };
    }

    const incQty = () =>{
        setQty((prevQty)=> prevQty+1)
    }
    const decQty = () =>{
        setQty((prevQty)=> {
            
            if(prevQty-1 <1) return 1;

            return prevQty -1
        });
    }

    return (

        //value prop을 받아서 하위 컴포넌트에게 전달함
        <Context.Provider value={{showCart,cartItems,totalPrice,totalQuantities,qty,incQty,decQty}}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);