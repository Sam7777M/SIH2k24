import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import CSS
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
;
import { Link } from 'react-router-dom';

const Homepage = () => (
  <div style={{ textAlign: 'center' }}>
    <Navbar
        style={{
          backgroundColor: 'darkblue', // Override the background color
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a shadow
        }}
      />
    <div style={styles.carouselContainer}>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={5000}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            //Slider button left side//
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                position: 'absolute',
                top: '50%',
                left: '15px',
                zIndex: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                border: 'none',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              ❮
            </button>
          )
        }
        //Slider button right//
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                position: 'absolute',
                top: '50%',
                right: '15px',
                zIndex: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                border: 'none',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              ❯
            </button>
          )
        }

      >

        <div style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative', // Allow the video to be positioned absolutely
          overflow: 'hidden', // Ensures no scrollbars appear for the video
          textAlign: 'center'
        }}
        >
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline // Prevents autoplay issues on mobile
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensures the video covers the background
              zIndex: '-1' // Places the video behind the content
            }}
          >
            <source src="/public/images/tele.mp4" type="video/mp4" />
            {/* Optionally, add additional sources for other video formats */}
          </video>

          {/* Content */}
          <div style={{ width: '100%', padding: '19px' }}>
            
            <h1 style={{ fontSize: '96px', color: 'white', fontWeight: 'bold', margin: '0' }}>Revolutionizing Logistics for Seamless Nationwide Parcel Delivery</h1>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
            <Link 
  to="/services"
  style={{
    padding: "10px 20px",
    backgroundColor: "orange",
    color: "#FFF",
    textDecoration: "none",
    borderRadius: "50px",
    cursor: "pointer",
  }}
>
  Get Started
</Link>
              <button style={{ padding: '10px 20px', backgroundColor: 'orange', color: '#FFF', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>Request A Demo</button>
            </div>
          </div>
        </div>

      </Carousel>

    </div>
    {/* Key Capabilities Section */}
    
  </div>
);

const styles = {}
export default Homepage;
