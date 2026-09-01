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

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!fullName.trim()) {
      setMessage("❌ Please enter your full name.");
      setMessageType("error");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setMessage(
        "❌ Please enter a valid 10-digit phone number."
      );
      setMessageType("error");
      return;
    }

    const token = localStorage.getItem("careConnectToken");

    if (!token) {
      setMessage(
        "❌ Session expired. Please login again."
      );
      setMessageType("error");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      return;
    }

    if (!userData?.id && !userData?._id) {
      setMessage(
        "❌ User information not found. Please login again."
      );
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const userId = userData.id || userData._id;

      const response = await fetch(
        `https://careconnect-vvwz.onrender.com/api/auth/profile/${userId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            fullName: fullName.trim(),
            phone: phone.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          `❌ ${data.message || "Unable to update profile."}`
        );
        setMessageType("error");
        return;
      }

      localStorage.setItem(
        "careConnectUser",
        JSON.stringify(data.user)
      );

      setMessage(
        "✅ Profile updated successfully!"
      );
      setMessageType("success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      console.error("Profile Update Error:", error);

      setMessage(
        "❌ Unable to connect to server."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
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
              onChange={(e) =>
                setFullName(e.target.value)
              }
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
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="Enter your phone number"
            />

            {message && (
              <p
                className={
                  messageType === "success"
                    ? "success-text"
                    : "error-text"
                }
              >
                {message}
              </p>
            )}

            <div className="edit-profile-actions">

              <button
                type="submit"
                className="save-profile-btn"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save Changes"}
              </button>

              <button
                type="button"
                className="cancel-profile-btn"
                onClick={() =>
                  navigate("/dashboard")
                }
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