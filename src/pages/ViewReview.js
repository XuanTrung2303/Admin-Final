import React, { useState} from 'react';
import  app from "../firebase";
import { getDatabase, ref, get, remove  } from 'firebase/database';
import './Banner.css';
import { useNavigate, } from "react-router-dom";

function ViewReview() {

    const navigate = useNavigate();
    const [review, setReview] = useState([]);

    const viewCate = async () => {
    const database = getDatabase(app);
    const reviewRef = ref(database, "Review");
    const snapshot = await get(reviewRef)


    if(snapshot.exists()) {
        setReview(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
  }

  return (
    <div>
        <h1>List Review</h1> <br/>
        <table align='center'>
        <tr>
            <th>Item ID</th>
            <th>Description</th>
            <th>Image</th>
            <th>Name</th>
            <th>Rating</th>
        </tr>
        {review.map( (item, index) => (
           <tr key={index}>
            <td className='idBanner'><b>{item.ItemId}</b></td>
            <td className='idBanner'><p>{item.Description}</p></td>
           <td><img size="medium" src={item.PicUrl} alt="Hình ảnh" /></td>
           <td><b>{item.Name}</b></td>
           <td><b>{item.rating}</b></td>
       </tr>
        ))}
    </table>
      <button className='button2' success type="submit" onClick={viewCate}>  View </button>
    </div>
  )
}

export default ViewReview