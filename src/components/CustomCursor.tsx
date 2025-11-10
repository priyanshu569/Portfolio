import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
      );
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", updateCursorType);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", updateCursorType);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150"
        style={{
          transform: `translate(${position.x - 12}px, ${position.y - 12}px) scale(${isPointer ? 1.5 : 1})`,
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-primary glow-primary" />
      </div>

      {/* Trail cursor */}
      <div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9998] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
        }}
      >
        <div className="w-full h-full rounded-full bg-primary opacity-60" />
      </div>
    </>
  );
};
