import React, { useState } from "react";

import { SiCodesignal } from "react-icons/si";
import { FaPencilAlt } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

function Navbar({ handleClearScreen, isDarkModeWritten, changeMode }) {
  const [isShowMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu(!isShowMenu);
  };

  return (
    <div className="main lg:flex md:flex flex-wrap justify-between items-center px-4 bg-[#2f3640] py-4 w-[100%]">
      <div className="left w-full">
        <div className="flex justify-between logo font-bold text-2xl text-white text-center w-full">
          <div className="flex">
            <SiCodesignal className="text-5xl md:text-7xl " />

            <div className="flex my-auto ">
              <p className="ml-3 text-[30px] md:text-3xl font-bold ">
                Untitled
              </p>
              <FaPencilAlt className="ml-2  text-3xl md:font-bold" />
            </div>
          </div>

          <div>
            <div className="md:hidden my-auto text-right mt-3">
              {isShowMenu ? (
                <IoMdClose onClick={handleMenu} />
              ) : (
                <MdMenu onClick={handleMenu} />
              )}
            </div>
            <div className="hidden md:visible md:flex mt-3 gap-5 w-[100%] mr-5">
              <button
                className="bg-blue-500 p-2 px-3 text-xl rounded-lg md:visible md:text-right hover:bg-white hover:text-black hover:border-[3px] "
                onClick={handleClearScreen}
              >
                Clear Screen
              </button>

              <button
                className="bg-blue-500 p-2 px-3 text-xl rounded-lg md:visible md:text-right hover:bg-white hover:text-black hover:border-[3px] "
                onClick={changeMode}
              >
                {isDarkModeWritten ? "DarkMode" : "White Mode"}
              </button>
            </div>
          </div>
        </div>
        {isShowMenu && (
          <div className="md:hidden flex justify-center items-center bg-white h-10 rounded gap-5 mt-5 ">
            <p
              className="font-semibold text-xl cursor-pointer hover:text-blue-700 hover:font-bold"
              onClick={handleClearScreen}
            >
              Clear Screen
            </p>
            <p
              className="font-semibold text-xl cursor-pointer hover:text-blue-700 hover:font-bold"
              onClick={changeMode}
            >
              {isDarkModeWritten ? "DarkMode" : "White Mode"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
