import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <Oval height={30} width={30} color="#077bc5" visible={true} />
    </div>
  );
};

export default Loader;
