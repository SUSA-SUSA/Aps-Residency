import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import gallery1 from "../assets/gallery/gellary_img1.jpg";
import gallery2 from "../assets/gallery/gellary_img2.jpg";
import gallery3 from "../assets/gallery/gellary_img3.jpg";
import gallery4 from "../assets/gallery/gellary_img4.jpg";
import gallery5 from "../assets/gallery/gellary_img5.jpg";
import gallery6 from "../assets/gallery/gellary_img6.jpg";
import gallery7 from "../assets/gallery/gellary_img7.jpg";
import gallery8 from "../assets/gallery/gellary_img8.jpg";

const Gallery = () => {
  const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8];

  return (
    <section id="gallery" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="display-4">Gallery</h2>
          <p className="text-muted">Take a visual tour of the beautiful hotel</p>
        </div>
        <div className="row g-3">
          {images.map((src, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-3">
              <div className="card overflow-hidden shadow-sm h-100">
                <img
                  src={src}
                  className="card-img-top img-fluid"
                  alt={`Gallery ${i + 1}`}
                  style={{ transition: "transform 0.3s" }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
