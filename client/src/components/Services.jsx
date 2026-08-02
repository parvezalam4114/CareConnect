import "./Services.css";

function Services() {
  return (
    <section className="services">

      <div className="services-container">

        <h2 className="section-title">
          Our Medical Services
        </h2>

        <p className="section-description">
          We provide world-class healthcare services with
          experienced doctors and advanced medical technology.
        </p>

        <div className="services-grid">

          <div className="service-card">
            <div className="service-icon">🩺</div>
            <h3>General Checkup</h3>
            <p>
              Regular health checkups for all age groups.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">❤️</div>
            <h3>Cardiology</h3>
            <p>
              Advanced heart care by expert cardiologists.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">🦷</div>
            <h3>Dental Care</h3>
            <p>
              Complete dental treatments with modern equipment.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">🧠</div>
            <h3>Neurology</h3>
            <p>
              Specialized neurological diagnosis and treatment.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Services;