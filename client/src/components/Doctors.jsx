import "./Doctors.css";

function Doctors() {
  return (
    <section className="doctors">

      <div className="doctors-container">

        <h2 className="section-title">
          Meet Our Expert Doctors
        </h2>

        <p className="section-description">
          Our experienced specialists are committed to providing
          the highest quality healthcare services.
        </p>

        <div className="doctors-grid">

          <div className="doctor-card">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500"
              alt="Doctor"
            />

            <h3>Dr. Sarah Johnson</h3>

            <p>Cardiologist</p>

            <span>⭐ 4.9</span>
          </div>

          <div className="doctor-card">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500"
              alt="Doctor"
            />

            <h3>Dr. Michael Smith</h3>

            <p>Neurologist</p>

            <span>⭐ 4.8</span>
          </div>

          <div className="doctor-card">
            <img
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500"
              alt="Doctor"
            />

            <h3>Dr. Emily Brown</h3>

            <p>Dentist</p>

            <span>⭐ 4.9</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Doctors;