import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { storage } from '../firebase/config';

const useFile = (file) => {
    const [per, setPerc] = useState(null);
    const [imgUrl, setImgUrl] = useState('')
    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;

            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    setPerc(progress);
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImgUrl(downloadURL)
                    });
                }
            );
        };
        file && uploadFile();
    }, [file]);

    return {imgUrl, setImgUrl, per}
}

export default useFile