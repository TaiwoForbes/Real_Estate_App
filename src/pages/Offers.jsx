import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'
import Spiner from '../components/Spiner'
import ListingItem from '../components/ListingItem'

const Offers = () => {
  const [listings,setListings] = useState(null)
  const [loading,setLoading] = useState(true)
  const [lastFetchedListing,setLastFetchListing] = useState(null)
  useEffect(()=>{
    const fetchListings = async()=>{
      try{
        const listingsRef = collection(db,'listings')
        const q = query(listingsRef, where('offer', '==',true),orderBy('timestamp', 'desc'),limit(8))
        const querySnap = await getDocs(q)
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchListing(lastVisible)
        const listings = []
        querySnap.forEach((doc)=>{
          listings.push({
            id:doc.id,
            data:doc.data()
          })
        })
        setListings(listings)
        setLoading(false)
        console.log(listings);

      }catch (error){
        toast.error(error.message)
      }
    }
    fetchListings()
  },[])

  const onFetchMoreListing = async()=>{
    try{
      const listingsRef = collection(db,'listings')
      const q = query(listingsRef, where('offer', '==',true),orderBy('timestamp', 'desc'),startAfter(lastFetchedListing),limit(4))
      const querySnap = await getDocs(q)
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchListing(lastVisible)
      const listings = []
      querySnap.forEach((doc)=>{
        listings.push({
          id:doc.id,
          data:doc.data()
        })
      })
      setListings((prev)=>[...prev,...listings])
      setLoading(false)
      console.log(listings);

    }catch (error){
      toast.error(error.message)
    }
  }
  return (
    <div className='max-w-6xl mx-auto px-3'>
      <h1 className='text-3xl text-center my-6  font-bold'>Offers</h1>
      {loading ? <Spiner/>:listings && listings.length > 0 ? (
        <>
        <main>
          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            {listings.map((listing)=>{
              return <ListingItem key={listing.id} id={listing.id} listing={listing.data}/>
            })}
          </ul>
        </main>
        {lastFetchedListing && (
          <div className='flex justify-center items-center'>
            <button onClick={onFetchMoreListing} className='bg-white px-3 py-1.5 text-gray-700 border-gray-300 my-6 hover:border-slate-600 rounded transition duration-150 ease-in-out'>Load More</button>
          </div>
        )}
        </>
      ):(
        <p>There are no current offer</p>
      )}
    </div>
  )
}

export default Offers