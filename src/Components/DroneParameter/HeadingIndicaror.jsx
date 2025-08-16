import React, { useState, useMemo, useEffect, useRef } from 'react';
import icons from '../../assets/icons';
import useTelemetry from '../../Store/centralTelemetry';

const HeadingIndicator = () => {
  const [heading, setHeading] = useState(0);
  const telemetry = useTelemetry();

  // Update heading from telemetry
  useEffect(() => {
    setHeading(Math.floor(telemetry?.attitude?.yaw || 0));
  }, [telemetry?.attitude?.yaw]);

  const pixelsPerDegree = 10;
  const totalWidth = 360 * pixelsPerDegree;
  const [displayHeading, setDisplayHeading] = useState(heading);

  // Smooth heading change
  useEffect(() => {
    setDisplayHeading((prev) => {
      const target = heading;
      const currentAngle = ((prev % 360) + 360) % 360;
      let diff = target - currentAngle;
      if (diff > 180) diff -= 360;
      else if (diff < -180) diff += 360;
      return prev + diff;
    });
  }, [heading]);

  // Generate compass points
  const compassPoints = useMemo(() => {
    const points = [];
    const cardinals = [
      { deg: 0, label: 'N' },
      { deg: 45, label: 'NE' },
      { deg: 90, label: 'E' },
      { deg: 135, label: 'SE' },
      { deg: 180, label: 'S' },
      { deg: 225, label: 'SW' },
      { deg: 270, label: 'W' },
      { deg: 315, label: 'NW' },
    ];

    for (let i = 0; i < 360; i++) {
      const cardinal = cardinals.find((c) => c.deg === i);
      if (cardinal) {
        points.push({ deg: i, label: cardinal.label, type: 'cardinal' });
      } else if (i % 10 === 0) {
        points.push({ deg: i, label: i.toString(), type: 'degree' });
      } else if (i % 5 === 0) {
        points.push({ deg: i, label: '', type: 'tick5' });
      } else {
        points.push({ deg: i, label: '', type: 'tick1' });
      }
    }
    return points;
  }, []);

  // Render compass points
  const renderPoints = (offset) =>
    compassPoints.map((point) => {
      const pos = (point.deg + offset) * pixelsPerDegree;
      let content;
      switch (point.type) {
        case 'cardinal':
          content = (
            <>
              <div className="h-6 w-0.5 bg-white"></div>
              <span className="absolute top-8 text-lg font-bold text-yellow-400">{point.label}</span>
            </>
          );
          break;
        case 'degree':
          content = (
            <>
              <div className="h-4 w-0.5 bg-white"></div>
              <span className="absolute top-7 text-sm">{point.label}</span>
            </>
          );
          break;
        case 'tick5':
          content = <div className="h-3 w-px bg-white/70"></div>;
          break;
        case 'tick1':
          content = <div className="h-2 w-px bg-white/40"></div>;
          break;
        default:
          return null;
      }
      return (
        <div
          key={point.deg + offset}
          className="absolute top-0 flex flex-col items-center text-white"
          style={{ left: `${pos}px` }}
        >
          {content}
        </div>
      );
    });

  // Handle container width for centering
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Center calculation
  const transformX = -(displayHeading * pixelsPerDegree) + containerWidth / 2;

  return (
    <>
      <style>{`
        .heading-strip-container {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>

      <div className="absolute w-full h-14 top-0" ref={containerRef}>
        {/* Heading Triangle */}
        <img
          src={icons.triangle}
          alt="Heading Triangle"
          className="absolute top-6 left-1/2 w-3 h-4 z-50 -translate-x-1/2"
        />

        {/* Heading Value */}
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 z-50 text-yellow-400 font-bold text-sm">
          {heading}°
        </div>

        {/* Compass Strip */}
        <div className="heading-strip-container relative w-full h-14 bg-black/30 backdrop-blur-sm overflow-hidden">
          <div
            className="relative h-full"
            style={{
              width: `${totalWidth * 5}px`,
              left: `-${totalWidth * 2}px`,
              transform: `translateX(${transformX}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            {[-2, -1, 0, 1, 2].map((i) => renderPoints(i * 360))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadingIndicator;
