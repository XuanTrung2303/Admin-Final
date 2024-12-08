import React, {useState, useEffect} from 'react';
import { Button, Form, Grid, Loader } from 'semantic-ui-react';
import {db, storage} from "../firebase";
import { useParams, useNavigate } from 'react-router-dom';
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const initialState = {
    file: "",
    name: ""
}
const AddEditBanner = () => {
    const [data, setData] = useState(initialState);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is Pause");
                        break;
                    case "running":
                        console.log("Upload is Running");
                        break;
                    default:
                    break;
                }
            }, (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setData((prev) => ({...prev, img: downloadURL}));
                });
            }
        );
        };
    file && uploadFile();
    }, [file]);

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const validate = () => {
        let errors = {};
        // if(!name) {
        //     errors.name = "Name is Required"
        // };

        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = validate();
        if (Object.keys(errors).length) return setErrors(errors);
        setIsSubmit(true);
        // await addDoc(collection(db, "banners"), {
        //     ...data,
        //     timestamp: serverTimestamp(),
        // });
        navigate("/");
    };
    return (
        <div>
            <Grid centered verticalAlign='middle' columns="3" style={{ height:"80vh" }}>

                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <div>
                            {isSubmit ? (
                                <Loader active inline="centered" size='huge'/>
                            ) : (
                                <>
                                <h2>Add Banner</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Input
                                    label="Upload"
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}/>
                                    <Button
                                    primary type="submit"
                                    disabled={progress !== null && progress < 100}
                                    >Submit</Button>
                                </Form>
                                </>
                            )
                        }
                        </div>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        </div>
    )
}

export default AddEditBanner