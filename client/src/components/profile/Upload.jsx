import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./Upload.module.css";

export const Upload = () => {
  const [previewSource, setPreviewSource] = useState("");
  const [pic, setPic] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      const data = await axios("/api/users/upload", {
        method: "POST",
        data: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
      const photo = data.data.url;
      await axios.post(`/api/users/storePhoto`, {
        photo,
      });
      setPic(photo);
      toast.success("Photo uploaded");
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmitFile} className={styles["Auth-form"]}>
        <div className={styles["Auth-form-content"]}>
          <h3 className={styles["Auth-form-title"]}>Upload Photo</h3>
        </div>
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          className={`form-input ${styles.input}`}
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
