import React, { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";

const Contact = ({ listing, userRef }) => {
  const [message, setMessage] = useState("");
  const [landLord, seTLandlord] = useState(null);
  useEffect(() => {
    const getLandLord = async () => {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        seTLandlord(docSnap.data());
      } else {
        toast.error("Couldn't get Landlord data");
      }
    };
    getLandLord();
  }, [userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landLord != null && (
        <div className="flex flex-col w-full">
          <p>
            Contact {landLord.name} for the {listing.name.toLowerCase()}
          </p>
          <div className="mt-6 mb-6">
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600"
            ></textarea>
          </div>
          <a
            href={`mailto:${landLord.email}?Subject=${listing.name}&body=${message}`}
          >
            <button
              type="button"
              className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg  transition duration-150 ease-in-out w-full text-center mb-6"
            >
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
};

export default Contact;
