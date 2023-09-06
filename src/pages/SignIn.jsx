import React from "react";

const SignIn = () => {
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold ">Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto gap-20">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:md-6">
          <img
            src="https://images.unsplash.com/photo-1572782992110-afab5a6ef870?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGtleXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="key"
          className="w-full rounded-2xl"/>
        </div>

        <div className="w-full md:w-[67%] lg:w-[40%]">
          <form >
            <input className="w-full" type="text" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
