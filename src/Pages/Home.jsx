import Slider1 from "../assets/heroSlider/Slider1.JPG";
import Slider2 from "../assets/heroSlider/Slider2.jpg";
import Slider3 from "../assets/heroSlider/Slider3.jpg";

import MobileSlider1 from "../assets/heroSlider/mobileSlider1.jpg";
import MobileSlider2 from "../assets/heroSlider/mobileSlider2.jpg";
import MobileSlider3 from "../assets/heroSlider/mobileSlider3.jpg";

const HeroSlider = () => {
  const slides = [
    {
      desktopImg: Slider1,
      mobileImg: MobileSlider1,
      title: "Welcome to APS RESIDENCY",
      btnText: "See our rooms",
    },
    {
      desktopImg: Slider2,
      mobileImg: MobileSlider2,
      title: "Feel Relax & Enjoy Your Luxuriousness",
      btnText: "See our rooms",
    },
    {
      desktopImg: Slider3,
      mobileImg: MobileSlider3,
      title: "Your Luxury Hotel For Vacation",
      btnText: "See our rooms",
    },
  ];
  const handleScrollToRooms = () => {
const roomSection = document.getElementById("room");
if (roomSection) {
roomSection.scrollIntoView({ behavior: "smooth" });
}
};

  return (
    <div
      id="hero"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
      style={{ height: "100vh" }}
    >
      <div className="carousel-inner h-100">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`carousel-item ${idx === 0 ? "active" : ""} h-100`}
          >
            <picture>
              <source media="(max-width: 768px)" srcSet={slide.mobileImg} />
              <img
                src={slide.desktopImg}
                className="d-block w-100 h-100"
                style={{ objectFit: "cover" }}
                alt={`Slide ${idx + 1}`}
              />
            </picture>

            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ backgroundColor: "rgba(0,0,0,0.5)", pointerEvents: "none" }}
            />

            <div
              className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100 text-center px-3"
              style={{ top: 0 }}
            >
              <div
                className="text-uppercase mb-3"
                style={{
                  letterSpacing: "6px",
                  fontFamily: "'Tertiary', sans-serif",
                  color: "#fff",
                  fontSize: "1rem",
                }}
              >
                Just Enjoy & Relax
              </div>

              {/* ✅ Responsive Heading Font Size */}
              <h1
                className="text-uppercase fw-bold mb-4"
                style={{
                  fontSize: "3rem",
                  maxWidth: "900px",
                  color: "#A37D4C",
                  lineHeight: "1.2",
                  fontFamily: "'Primary', sans-serif",
                }}
              >
                {slide.title}
              </h1>

                <button
            className="btn btn-lg"
            style={{
              backgroundColor: "#ffffff",
              color: "#A37D4C",
              border: "2px solid #A37D4C",
              fontWeight: "bold",
            }}
            onClick={handleScrollToRooms}
          >
            {slide.btnText}
          </button>
            </div>

            {/* ✅ Inject responsive CSS */}
            <style>
              {`
                @media (max-width: 768px) {
                  #hero .carousel-caption h1 {
                    font-size: 1.6rem !important;
                  }
                  #hero .carousel-caption div {
                    font-size: 0.8rem !important;
                  }
                  #hero .carousel-caption button {
                    font-size: 0.8rem !important;
                    padding: 6px 16px !important;
                  }
                }
              `}
            </style>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
