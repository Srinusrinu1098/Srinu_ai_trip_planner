import { actualPromt, Budgets, noOfUSers } from "@/components/custom/options";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/service/aiModel";
import React, { useState } from "react";


import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function CreateTrip() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading,setLoading] = useState(false)
  const [datas, dataAdded] = useState({
    number: "",
    location: "",
    people: null,
    budget: null,
  });

  const navigate = useNavigate()
  const [bool, bools] = useState(false);

  const [open, close] = useState(false);

  const fetchPlaces = async (input) => {
    const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_APIKEY;
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.predictions || []);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  if (datas.number < 1) {
    dataAdded({ ...datas, number: 1 });
  }

  const handelEvents = (name, value) => {
    dataAdded({
      ...datas,
      [name]: value,
    });
  };

  const getStarted = async () => {
    const user = localStorage.getItem("user");
   

   
    if (!datas.number || !datas.budget || !datas.people || !datas.location) {
      toast("Fill all the details");
    } else if (datas.number >= 10) {
      toast("please enter the number less than 10 days ");
    } else if (!user) {
      close(true);
      return;
    } else {
      toast("please wait... we are working on it....");
      setLoading(true)
      const finalPromt = actualPromt
        .replace("{location}", datas.location)
        .replace("{people}", datas.people)
        .replace("{budget}", datas.budget)
        .replace("{days}", datas.number);

      const result = await chatSession.sendMessage(finalPromt);
     

      

      setLoading(false)
      
      saveAiTrip(result.response.text());
     
    }
  };

  const saveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const uniqueId = Date.now();
    console.log(uniqueId)
    

    try {
        // 🛠 Debugging: Log the values before sending the request
        console.log("📝 TripData before saving:", TripData);
        
        // Ensure TripData is a valid JSON object
        const formattedTripData = typeof TripData === "string" ? JSON.parse(TripData) : TripData;
        const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
        const response = await fetch(`${BASE_URL}/api/trips`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userSelection: datas,  
                tripData: formattedTripData, // ✅ Use formatted JSON
                email: user?.email,
                id: uniqueId,
                created_at: new Date(Date.now()).toISOString().split("T")[0]
                
            }),
        });

        const result = await response.json();
        if (response.ok) {
            console.log("✅ Trip data saved successfully:", result);
            navigate("/view-trip/" + uniqueId);
        } else {
            console.error("❌ Error saving trip data:", result.message);
        }
    } catch (error) {
        console.error("❌ Error saving trip data:", error);
    }

    setLoading(false);
};


  



  const getLogedin = useGoogleLogin({
    onSuccess : (resp)=> userProfile(resp),
    onError :(error) =>console.log(error)

    
  })

  const userProfile = (token)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${token.access_token}`,{
      headers : {
        Authorization :`Bearer ${token.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp)=>{
     
      localStorage.setItem("user",JSON.stringify(resp.data))
      close(false)
      getStarted()
    })
  }

  return (
    <div className="sm:px-10 md:px-32 xl:px-56 px-4  mt-10 h-screen overflow-y-scroll  no-scrollbar">
      <h1 className=" font-bold sm:text-[34px] md:text-[34px] text-[24px]">
        Tell us your travel preferences 🏕️🌴
      </h1>
      <p className="pt-5 text-gray-400 font-bold sm:text-[24px] md:text-[24px] text-[14px]">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-4 sm:mt-14">
        <div>
          <h2 className="text-black font-bold  sm:text-[34px] md:text-[34px] text-[24px]">
            What is destination of choice?
          </h2>
          <div className=" rounded-md p-2 w-full shadow-lg border border-slate-400 my-4">
            {" "}
            <input
              type="text"
              placeholder="Enter your place 🏞️"
              value={datas.location || ""}
              className="px-3 outline-none w-full"
              onChange={(e) => {
                fetchPlaces(e.target.value);
                bools(true);
                handelEvents("location", e.target.value);
              }}
            />
            <ul className="px-3">
              {bool &&
                suggestions.map((place) => (
                  <li
                    key={place.place_id}
                    onClick={() => {
                      handelEvents("location", place.description), bools(false);
                    }}
                    className="cursor-pointer"
                  >
                    {place.description}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="text-black font-bold text-3xl">
              How many days you want to travel?
            </h2>
            <div className=" rounded-md p-2 w-full shadow-lg border border-slate-400 my-4">
              {" "}
              <input
                type="number"
                placeholder="ex:3"
                
                className="px-3 outline-none w-full"
                onChange={(e) => {
                  handelEvents("number", e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            {" "}
            <ul className="grid grid-cols-3 gap-5 my-5">
              {noOfUSers.map((each) => (
                <li
                  key={each.id}
                  className={`cursor-pointer flex flex-col justify-center items-center rounded-md  shadow-sm hover:shadow-lg border  py-3 ${
                    datas.people == each.people && "border border-black"
                  }`}
                  onClick={() => handelEvents("people", each.people)}
                >
                  <h1 className="text-[24px] text-center">{each.emoji}</h1>
                  <h2 className="sm:font-thin md:font-medium lg:font-bold font-serif text-center">
                    {each.people}
                  </h2>
                  <p className="sm:text-[22px] md:text-[14px] lg:text-[13px] text-[12px] text-gray-400 font-mono text-center">
                    {each.discription}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {" "}
            <ul className="grid grid-cols-3 gap-5 my-5">
              {Budgets.map((each) => (
                <li
                  key={each.id}
                  className={`cursor-pointer flex flex-col justify-center items-center rounded-md  shadow-sm hover:shadow-lg border  py-3 ${
                    datas.budget == each.people && "border border-black"
                  } `}
                  onClick={() => handelEvents("budget", each.people)}
                >
                  <h1 className="text-[24px] text-center">{each.emoji}</h1>
                  <h2 className="sm:font-thin md:font-medium lg:font-bold font-serif text-center">
                    {each.people}
                  </h2>
                  <p className="sm:text-[22px] md:text-[14px] lg:text-[13px] text-[12px] text-gray-400 font-mono text-center">
                    {each.discription}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end my-6">
            <Button onClick={getStarted} disabled ={loading}>
              {loading ? <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin"/> : "Get Started"}
            </Button>
          </div>

          <Dialog open={open} onOpenChange={close}>
            <DialogContent>
              <DialogHeader>
              <DialogTitle> <img src ='/Srinus.png' className='w-20 h-12 mt-2'/> <br/>Sign in with Google</DialogTitle>
                <DialogDescription className ="">
               
                
                Sign in to the app with google authontication securely
                <Button className ="w-full my-3"  onClick ={getLogedin}> <FcGoogle /> Sign in with google</Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
