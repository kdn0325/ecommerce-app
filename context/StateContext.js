import React , {createContext , useContext , useState} from "react";
import toast from "react-hot-toast";

//Context 객체 생성

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart , setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice , setTotalPrice] = useState(0);
    const [totalQuantities , setTotalQuantities] = useState(0)
    const [qty , setQty ] = useState(1);
    
    let foundProduct;
    let index;

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
               //장바구니 상품과 상품이 같은 경우
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
        toast.success(`${qty}개의 ${product.name}가 장바구니에 추가 되었습니다.`)
        };
    
    //장바구니 제거
    const onRemove = (product) =>{
        foundProduct = cartItems.find(item=>item._id === product._id);

        //선택한 상품 품목만 제거
        const newCartItems = cartItems.filter(item=>item._id !== product._id);

        //총 가격  = 제품 가격 * 수량만큼 제거
        setTotalPrice(prevTotalPrice=>prevTotalPrice - foundProduct.price * foundProduct.quantity);
        //총 갯수  = 제품 수량 * 수량만큼 제거
        setTotalQuantities(prevTotalQuantities=>prevTotalQuantities - foundProduct.quantity);

        //
        setCartItems(newCartItems);
    }

    //장바구니 아이템 메뉴 증가 / 감소
    const toggleCartItemQuanitity = (id, value) =>{
        //
        foundProduct = cartItems.find(item=>item._id === id)

        //선택한 id값과 같은 index 번호 검색
        index = cartItems.findIndex(product=>product._id===id)
        //
        const newCartItems = cartItems.filter((item,)=>item._id !== id )
        
        //inc 값이면 장바구니 아이템 메뉴 증가
        if(value==="inc"){
            //상품 추가 목록에서 선택한 상품 추가
            setCartItems([...newCartItems , {...foundProduct , quantity:foundProduct.quantity + 1}])

            //전체 상품에서 선택한 상품만큼 가격 추가
            setTotalPrice((prevTotalPrice)=>prevTotalPrice+foundProduct.price)

            //전체 수량에서 선택한 상품만큼 수량 추가
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)

        //dec 값이면 장바구니 아이템 메뉴 증가
        }else if(value=="dec"){
            //제품이 1개 이상의 수량일 경우에만 조건
            if(foundProduct.quantity > 1 ){

                //상품 추가 목록에서 선택한 상품 제거
                setCartItems([...newCartItems , {...foundProduct , quantity:foundProduct.quantity - 1}])

                //전체 상품에서 선택한 상품만큼 가격 감소
                setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price)

                //전체 상품에서 선택한 수량만큼 가격 감소
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
    }
    //증가 
    const incQty = () =>{
        setQty((prevQty)=> prevQty+1)
    }
    //감소
    const decQty = () =>{
        setQty((prevQty)=> {
            
            if(prevQty-1 <1) return 1;

            return prevQty -1
        });
    }

    return (

        //value prop을 받아서 하위 컴포넌트에게 전달함
        <Context.Provider value={{showCart,cartItems,totalPrice,totalQuantities,qty,incQty,decQty,onAdd,setShowCart,toggleCartItemQuanitity,onRemove,setCartItems,setTotalPrice,setTotalQuantities}}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);