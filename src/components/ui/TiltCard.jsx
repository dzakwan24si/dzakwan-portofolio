"use client";
import Tilt from "react-parallax-tilt";

export default function TiltCard({ children, className = "" }) {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      scale={1.02}
      transitionSpeed={400}
      gyroscope={true}
      className={className}
    >
      {children}
    </Tilt>
  );
}
