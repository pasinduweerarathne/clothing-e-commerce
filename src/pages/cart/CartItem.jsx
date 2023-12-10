import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQty,
  incrementQty,
  removeItemFromCart,
  resetCart,
} from "../../redux/bazarSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

const CartItem = () => {
  const { productData } = useSelector((state) => state.bazar);
  const dispatch = useDispatch();

  return (
    <div className="w-full px-2">
      <div className="w-full">
        <h2 className="font-titleFont text-2xl">Shopping Cart</h2>
      </div>

      <div className="w-full">
        {productData.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between gap-6 mt-6"
          >
            <div className="flex items-center gap-2">
              <MdOutlineClose
                onClick={() =>
                  dispatch(removeItemFromCart(item)) &
                  toast.success(`${item.title} removed from your cart`)
                }
                className="text-gray-600 hover:text-red-600 cursor-pointer duration-300 text-2xl"
              />
              <div className="h-28 w-28 sm:w-32 sm:h-32">
                <img
                  src={item.image}
                  alt="productImg"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <h2 className="w-full line-clamp-2">{item.title}</h2>
            <p className="w-fit">${item.price}</p>
            <div className=" flex items-center justify-between text-gray-500 gap-4 border p-3">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <button
                  onClick={() => dispatch(decrementQty(item))}
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  -
                </button>
                {item.quantity}
                <button
                  onClick={() => dispatch(incrementQty(item))}
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  +
                </button>
              </div>
            </div>
            <p>${item.quantity * item.price}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 justify-center my-8">
        <button
          className="bg-red-500 text-white py-1 px-6 hover:bg-red-800 duration-300"
          onClick={() =>
            dispatch(resetCart()) & toast.success("Your cart is empty")
          }
        >
          Reset Cart
        </button>
        <Link to="/">
          <button className="flex items-center gap-1 border border-black text-black hover:bg-black hover:text-white py-1 px-6 duration-300">
            <HiOutlineArrowLeft className="mt-[5px]" /> go shopping
          </button>
        </Link>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default CartItem;
