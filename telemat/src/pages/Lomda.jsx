

import React from 'react';
import { Slide } from 'react-awesome-reveal';

// Reusable FeatureSection Component
const FeatureSection = ({ title, subtitle, description, imgSrc, reverse }) => (
  <div
    style={{ backgroundColor: '#353535' }}
    className="p-5 md:p-0 flex items-center justify-center text-blue-100 font-sans h-[500px]"
  >
    <div
      style={{
        width: '1500px',
        height: '400px',
        position: 'relative',
        background: '#2D2D2D',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25) inset',
        borderRadius: reverse ? '0 30px 30px 0' : '20px 0 0 20px',
        display: 'flex',
        flexDirection: reverse ? 'row-reverse' : 'row',
        alignItems: 'start',
        padding: '40px',
        
      }}
    >
      {/* Text Section */}
      <div style={{ flex: 2, textAlign: 'left', paddingLeft: '20px' }}>
        <h2
          style={{
            color: 'rgba(80, 124, 162, 1)',
            fontSize: '64px',
            fontStyle: 'italic',
            fontWeight: 'bold',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: '2rem',
            fontStyle: 'italic',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '12px',
          }}
        >
          {subtitle}
        </p>
        <p style={{ fontSize: '1.5rem', lineHeight: '1.75', color: 'white' }}>
          {description}
        </p>
      </div>

      {/* Image Section */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={imgSrc}
          alt={title}
          style={{
            width: '350px',
            height: '360px',
            borderRadius: '8px',
            objectFit: 'cover',
           
          }}
        />
      </div>
    </div>
  </div>
);

// Main Lomda Component
const Lomda = () => {
  // Feature data array
  const features = [
    {
      title: 'Route Optimization',
      subtitle: 'Raaste Ka Jadoo, Samay Aur Diesel Ki Bachat!',
      description:
        'Hamare smart algorithms aapko dikhayenge sabse chhota, sabse tez aur sabse efficient raasta, taaki har delivery time pe ho aur cost kam aaye.',
      imgSrc: '/public/images/1a.png',
      reverse: false,
      
    },
    {
      title: 'Real-Time Tracking',
      subtitle: 'Gaadi Kahan, Packet Kahan, Har Waqt Pata Chal Jaye!',
      description:
        'Now, no more delivery worries — our tracking system shows the exact real-time location of parcels.',
      imgSrc: '/public/images/2a.png',
      reverse: true,
    },
    {
      title: 'Load Capacity Analysis',
      subtitle: 'Truck Mein Kitni Jagah Bachi Hai, Ab App Se Pata Chalega!',
      description:
        "With the help of smart analysis tools, you'll get complete real-time insights into truck capacity without any additional hardware.",
      imgSrc: '/public/images/3a.png',
      reverse: false,
    },
    {
      title: 'Driver Efficiency Tracking',
      subtitle: 'Driver Ki Har Kaarigari Par Nazar Rakhein!',
      description:
        'Track driving habits, idle times, and improve overall efficiency with our advanced analytics.',
      imgSrc: '/public/images/4a.png',
      reverse: true,
    },
    {
      title: 'Fuel Efficiency Optimization',
      subtitle: 'Diesel Ki Bachat, Profits Ki Badhat!',
      description:
        'Monitor fuel usage and optimize consumption for cost-effective trucking.',
      imgSrc: '/public/images/5a.png',
      reverse: false,
    },
    {
      title: 'Predictive Maintenance',
      subtitle: 'Samay Par Maintenance, Badi Kharche Ki Bachat!',
      description:
        'Stay ahead of potential breakdowns by scheduling maintenance with our predictive tools.',
      imgSrc: '/public/images/6a.png',
      reverse: true,
    },

    {
      title: 'Smart Parcel Management using QR',
      subtitle: 'QR Ka Kamal: Parcel Ka Hisaab Kitaab',
      description:
        'Ek scan se onboard aur offload ka pura hisaab, capacity planning ab super simple!',
      imgSrc: '/public/images/7a.png',
      reverse: false,
    },
  ];

  return (
    <div style={{ backgroundColor: '#353535' }}>
      {features.map((feature, index) => (
        <Slide
          key={index}
          direction={index % 2 === 0 ? 'left' : 'right'}
          triggerOnce
        >
          <FeatureSection {...feature} />
        </Slide>
      ))}
    </div>
  );
};

export default Lomda;
