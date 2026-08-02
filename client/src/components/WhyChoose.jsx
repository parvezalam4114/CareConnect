import "./WhyChoose.css";

function WhyChoose() {
  return (
    <section className="why-choose">

      <div className="why-container">

        <h2 className="section-title">
          Why Choose CareConnect?
        </h2>

        <p className="section-description">
          We are committed to delivering quality healthcare with
          experienced doctors, advanced technology, and patient-first care.
        </p>

        <div className="why-grid">

          <div className="why-card">
            <div className="why-icon">🩺</div>
            <h3>Expert Doctors</h3>
            <p>
              Highly qualified specialists with years of experience.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">⚡</div>
            <h3>24/7 Emergency</h3>
            <p>
              Emergency medical support available anytime.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">💻</div>
            <h3>Easy Appointment</h3>
            <p>
              Book appointments online in just a few clicks.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">❤️</div>
            <h3>Patient Satisfaction</h3>
            <p>
              Trusted by thousands of happy patients every year.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;