import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelsOptions(props) {
  const { hotels } = props;
  const [imageUrls, setImageUrls] = useState({}); // Store fetched image URLs

  // Function to fetch image based on hotel name
  const getImage = async (keyword) => {
    if (imageUrls[keyword]) return; // Skip if already fetched

    try {
      const response = await fetch(`https://picsum.photos/600/400`);
      const imageUrl = response.url;

      setImageUrls((prev) => ({ ...prev, [keyword]: imageUrl })); // Store in state
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  // Fetch images for hotels
  useEffect(() => {
    hotels.forEach((each) => getImage(each.hotelName));
  }, [hotels]);

  return (
    <div className="py-3">
      <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-1 px-8">
        {hotels.map((each, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${each.hotelName}`}
            target="_blank"
            key={index}
          >
            <li className="cursor-pointer w-full">
              <div className="hover:shadow-2xl border border-slate-500 rounded-md px-2 py-2">
                <img
                  src={imageUrls[each.hotelName] || "/travel.jpg"} // Hotel image or fallback
                  className="w-[300px] rounded-md"
                />
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
