import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import ListingItem from "../components/ListingItem";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const onlogOut = () => {
    auth.signOut();
    navigate("/");
  };

  const onchange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName != name) {
        // Update displayName in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //  Update the name in the fireStore
        const docRef = doc(db, "user", auth.currentUser.uid);
        await updateDoc(docRef, {
          name, // name: name
        });
      }
      toast.success("profile details updated");
    } catch (error) {
      toast.error("Couldn't update the profile detail ");
    }
  };

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querrySnap = await getDocs(q);
      let listings = [];
      querrySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      console.log(listings);
      setListings(listings);
      setLoading(false);
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onDelete = async(listingId)=>{
    if(window.confirm('Are you sure you want to delete?')){
      await deleteDoc(doc(db,'listings',listingId))
      const updatedListings = listings.filter((listing)=>listing.id !== listingId)
      setListings(updatedListings)
      toast.success('successfully deleted the listings')
    }
  }

  const onEdit = (listingId)=>{
    navigate(`/edit-listing/${listingId}`)
  }
  return (
    <div>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3 ">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onchange}
              className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }  `}
            />

            <input
              type="email"
              id="email"
              value={email}
              disabled
              className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }  `}
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center ">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prev) => !prev);
                  }}
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>

              <p
                onClick={onlogOut}
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
              >
                Sign Out
              </p>
            </div>
          </form>
          <button
            className="w-full bg-blue-600 text-white uppercase py-3 px-7 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-150 hover:shadow-lg active:bg-blue "
            type="submit"
          >
            <Link
              className="flex justify-center items-center gap-2"
              to="/create-listing"
            >
              <FcHome className="text-3xl bg-red-200 rounded-full p-1 border-2" />
              Sell or Rent your home
            </Link>
          </button>
        </div>
      </section>

      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">
              My Listings
            </h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => {
                return (
                  <ListingItem
                    key={listing.id}
                    id={listing.id}
                    listing={listing.data}
                    onDelete={()=>onDelete(listing.id)}
                    onEdit={()=>onEdit(listing.id)}
                  />
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
