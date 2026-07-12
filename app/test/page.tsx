// components/ThreeDCard.js
export default function ThreeDCard() {
  return (
    <div className="perspective-[1000px]">
      <div className="transform-style-preserve-3d rotate-y-12 transition-transform duration-500 hover:rotate-y-0">
        {/* Front face */}
        <div className="absolute backface-hidden bg-blue-500 text-white p-6 rounded-lg w-64 h-40 flex items-center justify-center">
          Front Side
        </div>

        {/* Back face */}
        <div className="absolute backface-hidden rotate-y-180 bg-red-500 text-white p-6 rounded-lg w-64 h-40 flex items-center justify-center">
          Back Side
        </div>
      </div>
    </div>
  );
}
