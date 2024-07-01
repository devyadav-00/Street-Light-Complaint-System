import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  getMetadata,
  getStream,
  list,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { ImageStorage } from "../../services/firebaseConfig";

const ComplaintImages = ({ complaint }) => {
  const [signatureData, setSignatureData] = useState(complaint.signature);
  const [imageData, setImageData] = useState();

  // console.log("signatureData", signatureData);

  const importImage = async () => {
    const storageRef = ref(ImageStorage, complaint.picture);
    const downloadURL = await getDownloadURL(storageRef);
    // console.log("downloadURL", downloadURL);
    setImageData(downloadURL);

    setSignatureData(complaint.signature);
  };

  importImage();

  return (
    <div className="px-4 flex flex-col gap-2">
      <span className="font-semibold">Image :</span>
      {imageData && <img src={imageData} alt="Image" />}
      <span className="font-semibold">Signature : </span>
      {signatureData && <img src={signatureData} alt="Image" />}
    </div>
  );
};

export default ComplaintImages;
