import React, { useState} from 'react';
import  app from "../firebase";
import { getDatabase, ref, get  } from 'firebase/database';
import './Banner.css';
import { useNavigate, } from "react-router-dom";

function ViewItem() {

    const navigate = useNavigate();
    const [item, setItem] = useState([]);

    const viewItem = async () => {
    const database = getDatabase(app);
    const reviewRef = ref(database, "Items");
    const snapshot = await get(reviewRef)


    if(snapshot.exists()) {
        setItem(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
  }

  return (
    <div>
        <h1>List Items</h1>
        <br/>
        <table align='center'>
        <tr>
            <th>ID</th>
            <th>Description</th>
            <th>OldPrice</th>
            <th>Image</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Title</th>
        </tr>
        {item.map( (item, index) => (
           <tr key={index}>
            <td className='idBanner'><b>{index++}</b></td>
            <td ><p>{item.description}</p></td>
            <td ><p>{item.oldPrice}</p></td>
           <td><img size="medium" src={item.picUrl} alt="Hình ảnh" /></td>
           <td><b>{item.price}</b></td>
           <td><b>{item.rating}</b></td>
           <td><b>{item.review}</b></td>
           <td><b>{item.title}</b></td>
       </tr>
        ))}
    </table>
      <button className='button2' success type="submit" onClick={viewItem}>  View </button>
    </div>
  )
}

export default ViewItem