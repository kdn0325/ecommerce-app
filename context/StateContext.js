import React , {createContext , useContext , useState, useEffect} from "react";
import toast, { Toast } from "react-hot-toast";

//Context 객체 생성

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart , setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice , setTotalPrice] = useState();
    const [totalQuantities , setTotalQuantities] = useState()
    const [qty , setQty ] = useState(1);

    //장바구니 추가 
    const onAdd = (product, quantity) => {

        //해당 제품 선택
       const checkProductInCart = cartItems.find(item=>item._id === product._id);

       //총 가격  = 제품 가격 * 수량
       setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
       //총 수량 = 총 수량 + 수량
       setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities + quantity);
       
       if(checkProductInCart){
           const updateCartitems = cartItems.map((cartProduct) => {
               //장바구니 상품과 상품이 같으면
               if(cartProduct._id === product._id) return {
                   ...cartProduct,
                   //수량은 장바구니 수량
                   quantity:cartProduct.quantity + quantity
               }
            })
           setCartItems(updateCartitems);
        } else {
            product.quantity = quantity;
            
            setCartItems([...cartItems,{...product}]);
        }
        toast.success(`${qty} ${product.name} 장바구니에 추가 되었습니다.`)
       };

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
        <Context.Provider value={{showCart,cartItems,totalPrice,totalQuantities,qty,incQty,decQty,onAdd}}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);