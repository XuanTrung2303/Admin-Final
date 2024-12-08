import React, { useState} from 'react';
import  app from "../firebase";
import { getDatabase, ref, get, remove  } from 'firebase/database';
import './Banner.css';
import { useNavigate, } from "react-router-dom";
import { Button } from "semantic-ui-react";


  function ViewBanner () {
  const navigate = useNavigate();
  const [bannerArray, setImages] = useState([]);

  const viewImage = async () => {
    const database = getDatabase(app);
    const imagesRef = ref(database, "Banner");
    const snapshot = await get(imagesRef)

    if(snapshot.exists()) {

      const myImage = snapshot.val();
      const temporaryArray = Object.keys(myImage).map( myImageId => {
          return {
              ...myImage[myImageId],
              bannerId: myImageId
          }
      } )
    setImages(temporaryArray);
  } else {
    alert("error");
  }

}

  const deleteBanner = async (bannerIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Banner/"+bannerIdParam);
    await remove(dbRef);
    window.location.reload();
  }

  return (
    <div>
          <Button className='button4' size="mini" primary onClick={() => navigate("/add")}>
             Add Banner
          </Button>
          <Button className='button4' size="mini" primary onClick={() => navigate("/addBanner")}>
            Add Banner Realtime
          </Button>
        <h1>List Banner</h1>
      <table align='center'>
        <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Action</th>
        </tr>
        {bannerArray.map( (item, index) => (
           <tr key={index}>
            <td className='idBanner'><b>{index++}</b></td>
           <td><img size="medium" src={item.url} alt="Hình ảnh" /></td>
           <td><button className='button1' onClick={ () => deleteBanner(item.bannerId)}>DELETE</button></td>
       </tr>
        ))}
    </table>
      <button align="center" className='button2' success type="submit" onClick={viewImage}>  View Banner </button>
    </div>
  );
}

export default ViewBanner