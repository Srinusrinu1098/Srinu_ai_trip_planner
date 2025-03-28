import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Activities(props) {
  const { activites } = props;
  const [imageUrls, setImageUrls] = useState({}); // Store fetched image URLs

  if (!activites?.itinerary) {
    return <p>Loading activities...</p>;
  }

  let itineraryArray = Object.values(activites.itinerary)[0];

  if (!Array.isArray(itineraryArray)) {
    itineraryArray = Object.values(activites.itinerary);
  }

  // Function to fetch image based on keyword
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

  // Fetch images for themes and placeNames
  useEffect(() => {
    itineraryArray.forEach((each) => {
      getImage(each.theme); // Fetch image for theme
      each.activities?.forEach((trip) => getImage(trip.placeName)); // Fetch image for placeName
    });
  }, [activites]);

  return (
    <div>
      {itineraryArray?.map((each, index) => (
        <div key={index} className="px-9 my-2">
          <h1 className="text-[24px] font-bold">
            Day {index + 1}: {each.theme}
          </h1>
          <img
            src={imageUrls[each.theme] || "/travel.jpg"} // Theme image or fallback
            className="sm:w-[650px] md:w-[800px] lg:w-[600px] xlg:w-[800px] w-[800px] my-5"
            style={{ borderRadius: "24px" }}
          />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-1 px-2">
            {each.activities?.map((trip, index1) => (
              <Link
                key={index1}
                to={`https://www.google.com/maps/search/?api=1&query=${trip.placeName}`}
                target="_blank"
              >
                <div className="shadow-sm hover:shadow-2xl cursor-pointer border border-slate-500 rounded-md px-2 py-2">
                  <img
                    src={imageUrls[trip.placeName] || "/travel.jpg"} // Place image or fallback
                    className="w-[300px] rounded-md"
                  />
                  <h2 className="text-[24px] font-bold font-sans py-1">
                    {trip.placeName}{" "}
                    <span className="font-serif font-medium text-[18px]">
                      ⭐ {trip.rating}
                    </span>
                  </h2>
                  <p className="text-gray-500">{trip.placeDetails}</p>
                  <p className="text-gray-500">{trip.timeTravel}</p>
                  <p className="text-red-500">{trip.ticketPricing}</p>
                  <p className="text-gray-500">{trip.bestTimeToVisit}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Activities;
