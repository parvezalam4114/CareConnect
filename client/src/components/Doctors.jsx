import "./Doctors.css";

import doctor1 from "../assets/doctors/doctor1.jpg";
import doctor2 from "../assets/doctors/doctor2.jpg";
import doctor3 from "../assets/doctors/doctor3.jpg";
import doctor4 from "../assets/doctors/doctor4.jpg";
import doctor5 from "../assets/doctors/doctor5.jpg";
import doctor6 from "../assets/doctors/doctor6.jpg";

function Doctors() {
  const doctors = [
    {
      id: 1,
      image: doctor1,
      name: "Dr. Raj Sharma",
      specialization: "Cardiologist",
      experience: "10 Years",
      rating: "⭐ 4.9",
    },
    {
      id: 2,
      image: doctor2,
      name: "Dr. Neha Singh",
      specialization: "Dentist",
      experience: "8 Years",
      rating: "⭐ 4.8",
    },
    {
      id: 3,
      image: doctor3,
      name: "Dr. Amit Verma",
      specialization: "Neurologist",
      experience: "12 Years",
      rating: "⭐ 4.9",
    },
    {
      id: 4,
      image: doctor4,
      name: "Dr. Priya Kapoor",
      specialization: "Dermatologist",
      experience: "7 Years",
      rating: "⭐ 4.7",
    },
    {
      id: 5,
      image: doctor5,
      name: "Dr. Arjun Mehta",
      specialization: "Orthopedic",
      experience: "9 Years",
      rating: "⭐ 4.8",
    },
    {
      id: 6,
      image: doctor6,
      name: "Dr. Sneha Gupta",
      specialization: "Pediatrician",
      experience: "6 Years",
      rating: "⭐ 4.9",
    },
  ];

  return (
    <section className="page">
      <h1>Our Doctors</h1>
      <p>Meet our experienced specialists.</p>

      <div className="doctor-list">
        {doctors.map((doctor) => (
          <div className="doctor-card" key={doctor.id}>
            <img
              src={doctor.image}
              alt={doctor.name}
              className="doctor-image"
            />

            <h3>{doctor.name}</h3>

            <p>{doctor.specialization}</p>

            <span>{doctor.experience}</span>

            <br />

            <span>{doctor.rating}</span>

            <br />
            <br />

            <button className="book-btn">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Doctors;