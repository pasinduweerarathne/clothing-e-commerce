import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Cart = () => {
  const { productData, userInfo } = useSelector((state) => state.bazar);
  const [totalAmt, setTotalAmt] = useState("");
  const [payNow, setPayNow] = useState(false);

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  const handleCehckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("Please sign in to checkout");
    }
  };

  const payment = async (token) => {
    await axios.post("http://localhost:8000/pay", {
      amount: totalAmt * 100,
      token,
    });
  };

  return (
    <div>
      <img
        className="w-full h-60 object-cover"
        src="https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg"
        alt="cart-image"
      />

      {productData.length === 0 ? (
        <div className="flex flex-col gap-4 items-center my-8">
          <p className="text-red-500 font-semibold">
            Your cart is empty. Please go back to shopping and add product to
            Cart.
          </p>
          <Link to="/">
            <button className="flex items-center gap-1 border border-black text-black hover:bg-black hover:text-white py-1 px-6 duration-300">
              <HiOutlineArrowLeft className="mt-[5px]" /> go shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="w-full mx-auto py-20 flex flex-col lg:flex-row">
          <CartItem />

          <div className="bg-[#fafafa] py-6 px-8">
            <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
              <h2 className="text-2xl font-medium">cart totals</h2>
              <p className="flex items-center gap-4 text-base">
                Subtotal:{" "}
                <span className="font-titleFont font-bold text-lg">
                  ${totalAmt}
                </span>
              </p>
              <p className="flex items-start gap-4 text-base">
                Shipping:{" "}
                <span>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quos, veritatis.
                </span>
              </p>
            </div>
            <p className="font-titleFont font-semibold flex justify-between mt-6">
              Total <span className="text-xl font-bold">${totalAmt}</span>
            </p>
            <button
              disabled={productData.length === 0}
              onClick={handleCehckout}
              className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300 disabled:cursor-not-allowed disabled:bg-black/70"
            >
              proceed to checkout
            </button>
            {payNow && (
              <div className="w-full mt-6 flex items-center justify-center">
                <StripeCheckout
                  stripeKey="pk_test_51NXo99IayXhoaNEBQDACOcnpPu0P8KtJftA6BC97KFHegd2Oqw6lCgPUP3w26zgBN8ayuFGWluecuV6aQcdzEEMS00QuyYYYGx"
                  name="Bazar Online Shopping"
                  amount={totalAmt * 100}
                  label="Pay to bazar"
                  description={`Your payment amount is ${totalAmt}`}
                  token={payment}
                  email={userInfo.email}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
