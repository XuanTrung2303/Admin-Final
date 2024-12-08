import React, { useEffect, useState} from 'react';
import  app from "../firebase";
import { getDatabase, ref, get, remove  } from 'firebase/database';
import './Banner.css';
import { useNavigate, } from "react-router-dom";
import { Button } from "semantic-ui-react";

function ViewCategory() {

    const navigate = useNavigate();
    const [categoryArray, setCategoryArray] = useState([]);

    const viewCate = async () => {
    const database = getDatabase(app);
    const cateRef = ref(database, "Category");
    const snapshot = await get(cateRef)

    if(snapshot.exists()) {

      const myCate = snapshot.val();
      const temporaryArray = Object.keys(myCate).map( myCateId => {
          return {
              ...myCate[myCateId],
              cateId: myCateId
          }
      } )
    setCategoryArray(temporaryArray);
  } else {
    alert("error");
  }
  }

    const deleteCategory = async (cateIdParam) => {
      const db = getDatabase(app);
      const dbRef = ref(db, "Category/"+cateIdParam);
      await remove(dbRef);
      window.location.reload();
    }

  return (
    <div>
        <Button size="mini" primary onClick={() => navigate("/addCategory")}>
                        Add Category
        </Button>

       <h1>List Category</h1> <br/>

        <table align='center'>
        <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Action</th>
        </tr>
        {categoryArray.map( (item, index) => (
           <tr key={index}>
            <td className='idBanner'><b>{item.id}</b></td>
           <td><img size="medium" src={item.picUrl} alt="Hình ảnh" /></td>
           <td><b>{item.title}</b></td>
           <td>
            <button className='button1' onClick={ () => deleteCategory(item.cateId)}>DELETE</button>
            <button className='button3' onClick={() => navigate(`/updateCate/${item.cateId}`)}>UPDATE</button>
           </td>
       </tr>
        ))}
    </table>
      <button className='button2' success type="submit" onClick={viewCate}>  View Category </button>
    </div>
  )
}

export default ViewCategory