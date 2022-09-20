import React from "react";

function Forget() {
  return (
    <>
    <nav className="flex items-center justify-between bg-teal-600 p-2 h-14">
      <div>
        <h1 className=" text-white font-bold text-2xl">Test Project</h1>
      </div>
    </nav>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 bg-white shadow-lg">
        <h1 className=" text-3xl text-center">Forget Password</h1>
        <form>
          <div className="my-4">
            <label className=" text-base font-bold">Email Address</label>
            <input
              className=" border-2 w-full mt-2 p-1"
              type="text"
              name="email address"
              placeholder="Enter Your Email"
              id="username"
            />
          </div>
          <div className=" flex justify-center items-center mt-2">
            <button className=" border-2 text-white px-10 p-1 my-2 bg-teal-600">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Forget;
