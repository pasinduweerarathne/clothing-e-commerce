import { cart, logoDark, profile } from "../../assets";

const listStyles =
  "text-base text-black font-bold hover:text-orange-600 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300";

const Header = () => {
  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-800 px-2 font-titleFont">
      <div className="max-w-screen-xl h-full mx-auto items-center flex justify-between">
        <img src={logoDark} alt="logo-dark" className="w-28" />

        <ul className="flex items-center gap-8">
          <li className={`${listStyles}`}>
            <span className="capitalize">Home</span>
          </li>
          <li className={`${listStyles}`}>
            <span className="capitalize">Pages</span>
          </li>
          <li className={`${listStyles}`}>
            <span className="capitalize">Shop</span>
          </li>
          <li className={`${listStyles}`}>
            <span className="capitalize">Element</span>
          </li>
          <li className={`${listStyles}`}>
            <span className="capitalize">Block</span>
          </li>
          <div className="relative flex gap-8">
            <img src={cart} alt="cart" className="w-6" />
            <span className="absolute w-6 top-2 left-0 text-sm flex items-center justify-center font-semibold font-titleFont">
              0
            </span>
            <img
              src={profile}
              alt="profile"
              className="w-[28.95px] h-[28.95px] object-cover rounded-full"
            />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
