import { doc, getDoc } from "firebase/firestore";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import Spiner from "../components/Spiner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  const [link, setLink] = useState(false);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use((Autoplay, Navigation, Pagination));
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
        console.log(listing);
      }
    };
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spiner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 300 }}
      >
        {listing.imgUrls.map((url, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className="w-full relative overflow-hidden h-[300px]"
                style={{
                  background: `url(${listing.imgUrls[index]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setLink(true);
          setTimeout(() => {
            setLink(false);
          }, 1000);
        }}
      >
        <FaShare className="text-lg text-slate-500 " />
      </div>
      {link && (
        <p className="fixed px-2 top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10">
          Link Copied
        </p>
      )}

      <div className="flex flex-col md:flex-row m-4 max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className=" w-full h-[200px] lg:h-[400px] ">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? "/ month" : ""}
          </p>
          <p className="flex items-center  mt-6 m-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md ">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            <p>
              {listing.offer && (
                <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                  $
                  {(+listing.regularPrice - +listing.discountedPrice)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  discount
                </p>
              )}
            </p>
          </div>
          <p className="mt-3 mb-3 ">
            <span className="font-semibold ">Description - </span>
            {listing.description}
          </p>
          <ul className="flex items-center gap-2 text-sm font-semibold lg:space-x-10">
            <li className="flex ">
              <FaBed className="text-lg mr-1 items-center whitespace-nowrap" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex ">
              <FaBath className="text-lg mr-1 items-center whitespace-nowrap" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Bath` : "1 Bath"}
            </li>
            <li className="flex ">
              <FaParking className="text-lg mr-1 items-center whitespace-nowrap" />
              {listing.parking ? "Parking Spot" : "No Parking"}
            </li>
            <li className="flex ">
              <FaChair className="text-lg mr-1 items-center whitespace-nowrap" />
              {listing.furnished ? "Furnished" : "Not Furnished"}
            </li>
          </ul>
        </div>

        <div className="bg-blue-300 w-full h-[200px] lg:h-[400px] z-10 overflow-x-hidden "></div>
      </div>
    </main>
  );
};

export default Listing;
