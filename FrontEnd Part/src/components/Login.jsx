import React from "react";

const Login = (props) => {
  return (
    <div>
      <div className=" text-center mt-20">
        <h1 className=" text-3xl font-bold ">
          Welcome to decentralized voting application
        </h1>

        <button
          className=" bg-blue-500 text-white px-5 py-3 rounded-full mt-10 "
          onClick={props.connectWallet}
        >
          Login Using Metamask
        </button>
      </div>
    </div>
  );
};

export default Login;
