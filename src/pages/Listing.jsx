import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import Spiner from "../components/Spiner";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import "swiper/css/bundle";

const Listing = () => {
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
  </main>;
};

export default Listing;
