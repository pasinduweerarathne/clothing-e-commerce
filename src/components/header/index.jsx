import { useEffect, useState } from "react";
import { cart, logoDark } from "../../assets";
import { FiMenu, FiUser } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const listStyles =
  "text-base text-black font-bold hover:text-orange-600 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { productData, userInfo } = useSelector((state) => state.bazar);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-800 px-2 font-titleFont sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto items-center flex justify-between">
        <img src={logoDark} alt="logo-dark" className="w-28" />

        {windowWidth >= 690 ? (
          <div className="flex items-center gap-8">
            <div className={`${listStyles}`}>
              <span className="capitalize">Home</span>
            </div>
            <div className={`${listStyles}`}>
              <span className="capitalize">Pages</span>
            </div>
            <div className={`${listStyles}`}>
              <span className="capitalize">Shop</span>
            </div>
            <div className={`${listStyles}`}>
              <span className="capitalize">Element</span>
            </div>
            <div className={`${listStyles}`}>
              <span className="capitalize">Block</span>
            </div>
            <div className="relative flex gap-8">
              <Link to="/cart">
                <img src={cart} alt="cart" className="w-6" />
                <span className="absolute w-6 top-2 left-0 text-sm flex items-center justify-center font-semibold font-titleFont">
                  {productData.length}
                </span>
              </Link>
              <Link to={"/login"} className="flex items-center gap-4">
                {userInfo ? (
                  <>
                    <img
                      src={userInfo.image}
                      alt="profile"
                      className="w-[28.95px] h-[28.95px] object-cover rounded-full"
                    />
                    <p>{userInfo.name.split(" ")[0]}</p>
                  </>
                ) : (
                  <FiUser
                    size={30}
                    className="bg-gray-300 text-black p-1 rounded-full"
                  />
                )}
              </Link>
            </div>
          </div>
        ) : (
          <div className="relative flex gap-4">
            <Link to={"/cart"}>
              <div className="relative py-2 flex gap-4">
                <img src={cart} alt="cart" className="w-6" />
                <span className="absolute w-6 top-4 left-0 text-sm flex items-center justify-center font-semibold font-titleFont">
                  {productData.length}
                </span>
              </div>
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {!isMenuOpen ? <FiMenu size={35} /> : <MdClose size={35} />}
            </button>
            {isMenuOpen && (
              <div className="absolute top-10 right-0 z-10 bg-white p-4 min-w-[150px] rounded-lg shadow-md">
                <div className="py-2">Home</div>
                <div className="py-2">Pages</div>
                <div className="py-2">Shop</div>
                <div className="py-2">Element</div>
                <div className="py-2">Block</div>
                <Link to={"/login"}>
                  <div className="flex gap-3 items-center justify-center bg-black p-2 rounded-md cursor-pointer hover:bg-black/80 transition duration-300 text-white">
                    {userInfo.image ? (
                      <>
                        <img
                          src={userInfo.image}
                          alt="profile"
                          className="w-[28.95px] h-[28.95px] object-cover rounded-full"
                        />
                        <span>{userInfo.name.split(" ")[0]}</span>
                      </>
                    ) : (
                      <FiUser
                        size={30}
                        className="bg-gray-300 text-black p-1 rounded-full"
                      />
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
