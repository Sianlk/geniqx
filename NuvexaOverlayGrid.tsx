import React from 'react';

type InjectionPoint = {
  label: string;
  top: string;
  left: string;
  units: number;
  direction: string;
};

const injectionPoints: InjectionPoint[] = [
  { label: 'Forehead (Botox)', top: '20%', left: '45%', units: 10, direction: 'upward' },
  { label: 'Nasolabial Fold (Filler)', top: '45%', left: '40%', units: 1.5, direction: 'center-out' },
  { label: 'Jawline (Filler)', top: '70%', left: '50%', units: 2.0, direction: 'angled inward' },
];

export default function NuvexaOverlayGrid() {
  return (
    <div className="relative w-full max-w-md mx-auto h-96 bg-gray-200 rounded overflow-hidden">
      <img src="/face-outline.png" alt="Face Diagram" className="absolute w-full h-full object-cover" />

      {injectionPoints.map((point, index) => (
        <div
          key={index}
          className="absolute text-xs bg-black text-white p-1 rounded"
          style={{ top: point.top, left: point.left }}
        >
          {point.label}
          <div className="text-[10px] text-gray-300">
            {point.units}u &bull; {point.direction}
          </div>
        </div>
      ))}
    </div>
  );
}
