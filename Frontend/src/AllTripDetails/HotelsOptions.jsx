import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import { Link } from "react-router-dom";



function HotelsOptions(props) {
  const { hotels } = props;
  
  const activitesEnrolled = hotels.map((each)=>{

  })

  const [dailogOprn,openDailoug] = useState(false)

  return (
    <div className="py-3">
      <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-1 px-8">
        {hotels.map((each, index) => (
            <Link to ={`https://www.google.com/maps/search/?api=1&query=${each.hotelName}`} target = '_blank'>  
          <li key={each.index} className="cursor-pointer w-full ">
            <div className="hover:shadow-2xl border border-slate-500 rounded-md px-2 py-2">
              <img src="/travel.jpg" className="w-[300px] rounded-md" />
              <h2 className="font-serif">
                <span className="font-extrabold">{each.hotelName}</span> ⭐{" "}
                {each.rating}
              </h2>
              <p className="text-gray-500">{each.description}</p>
              <p className="text-red-500">{each.price}</p>
              
              
            </div>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default HotelsOptions;
