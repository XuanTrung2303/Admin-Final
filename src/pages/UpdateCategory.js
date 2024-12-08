import React, {useState, useEffect} from 'react';
import app from '../firebase';
import { getDatabase, ref, set, get } from 'firebase/database';
import './Banner.css';
import { Button } from 'semantic-ui-react';
import { useNavigate, useParams} from "react-router-dom";

function UpdateCategory() {

    const navigate = useNavigate();
    const {firebaseId} = useParams();

    let [IdCate, setID] = useState("");
    let [picUrl, setPicUrl] = useState("");
    let [Title, setTitle ] = useState("");

    useEffect(() => {
      const updateCate = async () => {
        const database = getDatabase(app);
        const cateRef = ref(database, "Category/"+firebaseId);
        const snapshot = await get(cateRef)
        if(snapshot.exists()) {
          const targetObject = snapshot.val();
          setID(targetObject.id);
          setPicUrl(targetObject.picUrl);
          setTitle(targetObject.title);
        } else {
          alert("error");
        }
      }
      updateCate();
    }, [firebaseId])



    const overwriteData = async () => {
        const db = getDatabase(app);
        const newCate = ref(db, "Category/"+firebaseId);
        set(newCate, {
            id: IdCate,
            picUrl: picUrl,
            title: Title
        }).then(() => {
            alert("Category Update Successfully!");
            window.location.reload();
        }).catch((error) =>{
            alert("error: ", error.message);
            window.location.reload();
        })
    }

  return (
    <div>

       <h1>Update Category</h1>
       <p>ID <input className="input1" style={{ width:"50px", height:"35px" }} type='text' value={IdCate}
        onChange={(e) => setID(e.target.value)}/> </p> <br/>
       <p>Image Url <input className="input1" style={{ width:"350px", height:"35px" }} type='text' value={picUrl}
        onChange={(e) => setPicUrl(e.target.value)}/> </p> <br/>
        <p>Title <input className="input1" style={{ width:"350px", height:"35px" }} type='text' value={Title}
        onChange={(e) => setTitle(e.target.value)}/></p>

        <Button primary onClick={overwriteData}>Update</Button>
    </div>
  )
}

export default UpdateCategory