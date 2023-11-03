import React, { useState } from "react";
import HomeBoard from "../components/HomeBoard";

const Homepage = () => {
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     navigate("/mynotes");
  //   }
  // }, [navigate]);

  return (
    <div className="container">
      <div>
        <div>
          <p className="text-3xl p-4 text-[rgb(134,122,245)]">Notes</p>
        </div>
        <div className="my-14 lg:my-24 mx-4 sm:mx-32 md:mx-45 lg:mx-64">
          <HomeBoard />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
