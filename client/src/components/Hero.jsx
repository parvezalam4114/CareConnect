import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-container">

        {/* Left Content */}
        <div className="hero-content">

          <p className="hero-tag">
            Trusted Healthcare Platform
          </p>

          <h1 className="hero-title">
            Your Health,
            <br />
            Our Priority
          </h1>

          <p className="hero-description">
            Book appointments with experienced doctors,
            manage your health records, and receive quality
            healthcare services from the comfort of your home.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Book Appointment
            </button>

            <button className="secondary-btn">
              Find Doctors
            </button>
          </div>

        </div>

        {/* Right Content */}

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700"
            alt="Doctor"
          />

        </div>

      </div>

    </section>
  );
}

export default Hero;