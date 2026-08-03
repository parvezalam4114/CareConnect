import "./Services.css";

function Services() {
  return (
    <section className="page">
      <h1>Our Medical Services</h1>
      <p>We provide world-class healthcare services.</p>

      <div className="doctor-list">
        <div className="doctor-card">
          <h3>General Checkup</h3>
          <p>Complete health examination.</p>
        </div>

        <div className="doctor-card">
          <h3>Dental Care</h3>
          <p>Advanced dental treatment.</p>
        </div>

        <div className="doctor-card">
          <h3>Cardiology</h3>
          <p>Heart specialist consultation.</p>
        </div>
      </div>
    </section>
  );
}

export default Services;