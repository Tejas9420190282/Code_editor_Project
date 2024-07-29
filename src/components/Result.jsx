import React from "react";

function Result({ srcCode, mode }) {
  return (
    <div>
      <div
        className={`${
          mode === "dark" ? "bg-[#282c34]" : "bg-white"
        } p-4 shadow mt-4 rounded-lg `}
      >
        <h2
          className={`text-lg font-semibold mb-2 ${
            mode === "dark" ? "text-white" : "text-black"
          }  `}
        >
          Result
        </h2>
        <iframe
          className="w-full h-60 border border-gray-700 rounded-md"
          srcDoc={srcCode}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  );
}

export default Result;
