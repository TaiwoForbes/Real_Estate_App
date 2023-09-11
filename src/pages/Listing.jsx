import { doc, getDoc } from "firebase/firestore";
import {FaShare} from 'react-icons/fa'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import Spiner from "../components/Spiner";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import "swiper/css/bundle";

const Listing = () => {
const [link,setLink] = useState(false)
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
  return <main>
    <Swiper slidesPerView={1} navigation pagination={{type:'progressbar'}} effect="fade" modules={[EffectFade]} autoplay={{delay:300}}>
        {listing.imgUrls.map((url,index)=>{
            return(
                <SwiperSlide key={index}>
                    <div className="w-full relative overflow-hidden h-[300px]" style={{background:`url(${listing.imgUrls[index]}) center no-repeat`, backgroundSize:'cover'}}>
                        
                    </div>

                </SwiperSlide>
            )
        })}
    </Swiper>

    <div className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center" onClick={()=>{
        navigator.clipboard.writeText(window.location.href)
        setLink(true)
        setTimeout(() => {
            setLink(false)  
        }, 1000);

    }}>
        <FaShare  className="text-lg text-slate-500 "/>
    </div>
    {link && (
      <p className="fixed px-2 top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10">Link Copied</p>  
    )}
  </main>;
};

export default Listing;
