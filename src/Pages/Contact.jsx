import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="py-5"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Contact Us</h2>
          <p className="text-muted">Get in touch for reservations and inquiries</p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Hotel Info */}
          <div className="col-12 col-lg-5">
            <div className="mb-4">
              <h4 style={{ fontWeight: "600", marginBottom: "1rem" }}>Hotel Information</h4>
              <p className="mb-2"><strong>Address:</strong> 49/A/1 Vettavalam Road, Kilnathur, Tiruvannamalai, 606 601</p>
              <p className="mb-2"><strong>Phone:</strong> 9444195037</p>
              <p className="mb-2"><strong>Email:</strong> apsresidencytvm@gmail.com</p>
              <p className="mb-2"><strong>Check-in / Check-out:</strong> 3:00 PM / 12:00 PM</p>
            </div>
            <div className="card shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d341.68447825765935!2d79.08271061092677!3d12.224094678257504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bacc1d1934838c3%3A0x9244ddf21feed56a!2sAPS%20RESIDENCY!5e0!3m2!1sen!2sin!4v1760159893353!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Hotel Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-12 col-lg-5">
            <div className="card shadow-sm p-4">
              <h4 style={{ fontWeight: "600", marginBottom: "1rem" }}>Send us a Message</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name *"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address *"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Message *"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-warning w-100"
                  disabled={submitting}
                  style={{ backgroundColor: "#A37D4C", borderColor: "#A37D4C" }}
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
