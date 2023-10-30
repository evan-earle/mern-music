import { EditProfileForm } from "../components/profile/EditProfileForm";
import { Navbar } from "../components/nav/Navbar";
import { Upload } from "../components/profile/Upload";
import styles from "./EditProfile.module.css";

export const EditProfile = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <EditProfileForm />
        <Upload />
      </div>
    </div>
  );
};
