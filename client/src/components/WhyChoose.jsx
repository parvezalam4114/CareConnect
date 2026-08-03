import "./WhyChoose.css";

function WhyChoose() {
  return (
    <section className="why-choose">
      <div className="why-container">
        <h2>Why Choose CareConnect?</h2>
        <p>
          We are committed to providing quality healthcare with experienced
          doctors and modern medical facilities.
        </p>

        <div className="why-grid">
          <div className="why-card">
            <h3>👨‍⚕️ Expert Doctors</h3>
            <p>Highly qualified specialists for every treatment.</p>
          </div>

          <div className="why-card">
            <h3>⚡ 24/7 Emergency</h3>
            <p>Emergency services available anytime.</p>
          </div>

          <div className="why-card">
            <h3>💻 Easy Appointment</h3>
            <p>Book appointments online in just a few clicks.</p>
          </div>

          <div className="why-card">
            <h3>❤️ Patient Satisfaction</h3>
            <p>Thousands of happy patients trust CareConnect.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;