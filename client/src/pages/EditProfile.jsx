import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("careConnectUser");
  const userData = savedUser ? JSON.parse(savedUser) : null;

  const [fullName, setFullName] = useState(
    userData?.fullName || ""
  );

  const [phone, setPhone] = useState(
    userData?.phone || ""
  );

  const handleSave = (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const updatedUser = {
      ...userData,
      fullName: fullName,
      phone: phone,
    };

    localStorage.setItem(
      "careConnectUser",
      JSON.stringify(updatedUser)
    );

    alert("Profile updated successfully! ✅");

    navigate("/dashboard");
  };

  if (!userData) {
    return (
      <>
        <Navbar />

        <div className="edit-profile-page">
          <div className="edit-profile-card">
            <h1>User Not Found</h1>

            <p>Please login first.</p>

            <button
              onClick={() => navigate("/login")}
              className="save-profile-btn"
            >
              Go to Login
            </button>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="edit-profile-page">
        <div className="edit-profile-card">

          <h1>Edit Profile ✏️</h1>

          <p>
            Update your CareConnect profile information.
          </p>

          <form onSubmit={handleSave}>

            <label>Full Name</label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />

            <label>Email Address</label>

            <input
              type="email"
              value={userData.email}
              disabled
            />

            <label>Phone Number</label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />

            <div className="edit-profile-actions">

              <button
                type="submit"
                className="save-profile-btn"
              >
                Save Changes
              </button>

              <button
                type="button"
                className="cancel-profile-btn"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default EditProfile;