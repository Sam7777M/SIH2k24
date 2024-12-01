import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import CSS
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Footer from '../Components/Footer';
import Lomda from './Lomda';

const Services = () => (
  <div style={{ textAlign: 'center' }}>
    <Navbar/>
    <div style={styles.carouselContainer}>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={5000}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
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
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          {/* Background Image */}
          <img
            src="/public/images/Service.jpeg" // Replace with your image path
            alt="Background"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '110%',
              height: '100%',
              objectPosition: 'center',
              zIndex: '-1',
              filter: 'blur(2px)', // Apply blur effect to the image
            }}
          />

          {/* Color Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(53, 53, 53, 0.7)', // Color overlay
              zIndex: '0', // Ensures it's on top of the image but below the content
            }}
          />

          {/* Content */}
          <div style={{ width: '100%', padding: '19px', position: 'relative', zIndex: '1' }}>
            <h1 style={{ fontSize: '84px', color: 'white', fontWeight: 'bold', margin: '0', fontStyle:'italic' }}>
              “Humse Hi Hogi <br /> Shuruwaat,<span style={{ color: 'black' }}> Services</span> Jo <br /> Kare Baat”
            </h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
              {/* Add your buttons or other content here */}
            </div>
          </div>
        </div>
      </Carousel>
    </div>
    
    
 
 {/*second */}
 
<Lomda/>

{/*third */}


{/* fourth */}


{/* fifth */}


{/**sixth */}


{/*Seventh */}

{/* Feedback  */}
<div style={{ backgroundColor: '#353535' }}>
  <h1
    style={{
      fontSize: '50px',
      fontWeight: '500',
      margin: '0px',
      position: 'relative',
      top: '-15px', // Move the heading up
      backgroundSize: '100% 120%', // Stretch vertically to 120% of the container's height
      backgroundPosition: 'center top', // Align image to the top center to show more of the upper part of the image
    }}
  >
    Hear From Our Happy Users
  </h1>

  <div
    style={{
      padding: '30px',
      height: '400px',
      width: '100%',
      maxWidth: '1300px',
      margin: '0 auto',
      borderRadius: '30px',
      backgroundImage:
        'linear-gradient(81.47deg, rgba(11, 9, 10, 0.7) 32.85%, rgba(39, 42, 46, 0.7) 76.97%, rgba(52, 58, 64, 0.7) 96.48%), url("/public/images/crowd.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      boxSizing: 'border-box',
      transform: 'translateY( 0px)', // Move the entire div up by 20px
    }}
  >
    <Slider {...styles.settings} style={{ position: 'relative', height: '100%' }}>
      {/* First Slide */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          color: '#fff',
          padding: '0 50px',
        }}
      >
        <div style={{ textAlign: 'left', flex: 1 }}>
          <p
            style={{
              fontSize: '32px', // Consistent font size
              color: '#fff',
              margin: '30px 20px 20px 20px',
              lineHeight: '1.2',
              textAlign: 'left', // Left-align the text
            }}
          >
            Using <strong>EaseMyDelivery</strong> has been a game-changer for our fleet <br />
            operations. The predictive analytics have helped us stay <br />
            ahead of potential disruptions, and the GPS tracking <br />
            ensures every truck is on course and on time.
            Truly a <br /> revolutionary platform for logistics!
          </p>

          <div
            style={{
              fontSize: '20px',
              color: 'rgba(149, 155, 163, 1)',
              fontWeight: 'normal', // Normal weight for the text
              marginLeft: '20px',
            }}
          >
            <strong style={{ fontWeight: 'normal' }}>Reeta Roy</strong>
            <br />
            Plant Manager
            <br />
            ABC Pvt lmtd
          </div>
        </div>
        <img
          src="/public/images/krati.png"
          alt="User"
          style={{
            width: '430px',
            height: '430px',
            borderRadius: '40%',
            marginLeft: '890px',
            marginTop: '-350px',
          }}
        />
      </div>

      {/* Second Slide */}
      <div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    color: '#fff',
    padding: '0 50px',
  }}
>
  {/* Text Section */}
  <div
    style={{
      textAlign: 'left',
      flex: 1,
      maxWidth: '80%', // Limit text width to prevent overlap
      marginRight: '20px', // Add spacing between text and image
    }}
  >
    <p
      style={{
        fontSize: '32px', // Consistent font size
        color: '#fff',
        margin: '50px 20px 20px 20px',
        lineHeight: '1.2',
        fontWeight: 'normal', // Normal weight for the text
      }}
    >
      <strong> EaseMyDelivery </strong> health monitoring system has made truck maintenance easier and more efficient. We now receive alerts before a problem even occurs, saving us money and preventing downtime. It’s a must-have tool for fleet owners.
    </p>
    <div
      style={{
        fontSize: '20px',
        color: 'rgba(149, 155, 163, 1)',
        marginLeft: '20px',
        fontWeight: 'normal', // Normal weight for the text
      }}
    >
      <strong style={{ fontWeight: 'normal' }}>Palkhi Bhatt </strong>
      <br />
      Resource Head
      <br />
      XYZ Resource Department.
    </div>
  </div>

  {/* Image Section */}
  <div>
    <img
      src="/public/images/khushi.png"
      alt="User"
      style={{
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        marginLeft: '830px',
        marginTop: '-370px',
        
      }}
    />
  </div>
</div>

 {/* Third Slide */}
 <div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    color: '#fff',
    padding: '0 50px',
  }}
>
  {/* Text Section */}
  <div
    style={{
      textAlign: 'left',
      flex: 1,
      maxWidth: '80%', // Limit text width to prevent overlap
      marginRight: '20px', // Add spacing between text and image
    }}
  >
    <p
      style={{
        fontSize: '32px', // Consistent font size
        color: '#fff',
        margin: '50px 20px 20px 20px',
        lineHeight: '1.2',
        fontWeight: 'normal', // Normal weight for the text
      }}
    >
     Thanks to <strong> EaseMyDelivery </strong> automated scheduling, we’ve reduced idle times and significantly improved delivery accuracy. The interface is user-friendly, and the real-time data insights are invaluable for our day-to-day planning."
    </p>
    <div
      style={{
        fontSize: '20px',
        color: 'rgba(149, 155, 163, 1)',
        marginLeft: '20px',
        fontWeight: 'normal', // Normal weight for the text
      }}
    >
      <strong style={{ fontWeight: 'normal' }}>Priya Bhati </strong>
      <br />
Operations Head
      <br />
      DEF Logistics
    </div>
  </div>

  {/* Image Section */}
  <div>
    <img
      src="/public/images/khushi.png"
      alt="User"
      style={{
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        marginLeft: '830px',
        marginTop: '-370px',
        
      }}
    />
  </div>
</div>
    </Slider>
  </div>

  {/* Space between feedback and footer */}
  <div
    style={{
      backgroundColor: '#353535',
      height: '90px', // Adjust the height as needed
      width: '100%',
    }}
  ></div>

  <div className="bg-[#353535]">
    <Footer />
  </div>
</div>





  </div>
 
);

const styles = {};
export default Services;