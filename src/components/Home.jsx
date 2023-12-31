
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleClick = () => {
    alert('Get Started Button clicked');
  };

  return (
    <Slider {...settings}>
      <div className="slide-container">
        <img src="/images/1.jpg" alt="Slide 1" className="slide-image" />
        <div className="slide-content">
          <button className="get-started-button" onClick={handleClick}>
            Get Started
          </button>
          <div className="slide-text">Bienvenue sur LOC-APP</div>
        </div>
      </div>
      <div className="slide-container">
        <img src="/images/2.jpg" alt="Slide 2" className="slide-image" />
        <div className="slide-content">
          <Link to="/login">
            <button className="get-started-button">Get Started</button>
          </Link>
          <div className="slide-text">Bienvenue sur LOC-APP</div>
        </div>
      </div>
      <div className="slide-container">
        <img src="/images/3.jpg" alt="Slide 3" className="slide-image" />
        <div className="slide-content">
          <button className="get-started-button" onClick={handleClick}>
            Get Started
          </button>
          <div className="slide-text">Bienvenue sur LOC-APP</div>
        </div>
      </div>
    </Slider>
  );
};

export default Carousel;
