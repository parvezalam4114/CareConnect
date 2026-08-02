import "./Testimonials.css";

function Testimonials() {
  return (
    <section className="testimonials">

      <div className="testimonials-container">

        <h2 className="section-title">
          What Our Patients Say
        </h2>

        <p className="section-description">
          Thousands of patients trust CareConnect for quality healthcare and
          seamless appointment booking.
        </p>

        <div className="testimonials-grid">

          <div className="testimonial-card">
            <p className="testimonial-text">
              "Excellent service! The doctors were professional and booking an
              appointment was very easy."
            </p>

            <h3>Rahul Sharma</h3>

            <span>⭐⭐⭐⭐⭐</span>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-text">
              "Very clean hospital environment and friendly staff. Highly
              recommended!"
            </p>

            <h3>Priya Verma</h3>

            <span>⭐⭐⭐⭐⭐</span>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-text">
              "CareConnect made finding the right doctor so simple. Great
              experience."
            </p>

            <h3>Aman Khan</h3>

            <span>⭐⭐⭐⭐⭐</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Testimonials;