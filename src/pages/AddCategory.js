import React, {useState} from 'react';
import app from '../firebase';
import { getDatabase, ref, set, push } from 'firebase/database';
import './Banner.css';
import { Button } from 'semantic-ui-react';
import { useNavigate, } from "react-router-dom";

function AddCategory() {

    const navigate = useNavigate();
    const [IdCate, setID] = useState("");
    const [picUrl, setPicUrl] = useState("");
    const [Title, setTitle ] = useState("");

    const addCategory = async () => {
        const db = getDatabase(app);
        const newCate = push(ref(db, "Category"))
        set(newCate, {
            id: IdCate,
            picUrl: picUrl,
            title: Title
        }).then(() => {
            alert("Category Added Successfully!");
            window.location.reload();
        }).catch((error) =>{
            alert("error: ", error.message);
            window.location.reload();
        })
    }

  return (
    <div>
        <Button size="mini" primary onClick={() => navigate("/addImage")}>
                        Add Image Category
        </Button>
       <h1>Add Category</h1>
       <p>ID <input className="input1" style={{ width:"50px", height:"35px" }} type='text' value={IdCate}
        onChange={(e) => setID(e.target.value)}/> </p> <br/>
       <p>Image Url <input className="input1" style={{ width:"350px", height:"35px" }} type='text' value={picUrl}
        onChange={(e) => setPicUrl(e.target.value)}/> </p> <br/>
        <p>Title <input className="input1" style={{ width:"350px", height:"35px" }} type='text' value={Title}
        onChange={(e) => setTitle(e.target.value)}/></p>

        <Button primary onClick={addCategory}>Add</Button>
    </div>
  )
}

export default AddCategory