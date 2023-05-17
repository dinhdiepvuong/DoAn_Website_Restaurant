import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.config";

export const saveImage = (refImage: string, image: any) => {
    const promise = new Promise((resolve: any, reject: any) => {
        const storageRef = ref(storage, `${refImage}/${new Date().getTime()}.${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            async () => {
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                console.log('first', downloadUrl)
                resolve(downloadUrl)
            }
        );
    });
    return promise;
}