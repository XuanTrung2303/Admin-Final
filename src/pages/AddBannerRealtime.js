// import React from 'react';
import React, {useState} from "react";
import { getDatabase, ref, set, push } from "firebase/database";
import  app from "../firebase";
import { Button } from "semantic-ui-react";
import './Banner.css'


const AddBannerRealtime = () => {
    let [inputValue, setInputValue] = useState("");

    const saveData = async () => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "Banner"));
        set(newDocRef, {
            url: inputValue
        }).then( () => {
            alert("url image added success !");
            window.location.reload();
        }).catch((error) => {
            alert("error: ", error.message)
            window.location.reload();
        })
    };

    return (
        <div>
                <input className="input1" style={{ width:"350px", height:"35px" }} type='text' value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}/>

                <Button primary onClick={saveData}>Add URL</Button>
        </div>
    )
}

export default AddBannerRealtime