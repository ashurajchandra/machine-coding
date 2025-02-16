"use client";
import { useState, useMemo } from "react";

interface Props {
  stars: number;
  activeStars: number;
}
const empty_star =
  "https://upload.wikimedia.org/wikipedia/commons/e/e7/Empty_Star.svg";
const filled_star =
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Plain_Yellow_Star.png";

const StarRating = (props: Props) => {
  const { stars, activeStars } = props;

  const [selectedRating, setSelectedRating] = useState<number>(activeStars);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const starsArray = useMemo(() => {
    return Array.from({ length: stars }).map((_, index) => index + 1);
  }, [stars]);

  const handleClick = (currentRating: number) => {
    setSelectedRating(currentRating);
  };

  const displayRating = hoveredRating !== null ? hoveredRating : selectedRating;

  return (
    <div className='flex gap-[3px]'>
      {starsArray.map((starRating, index) => (
        <img
          key={index}
          className='w-[30px] h-[30px]'
          onClick={() => handleClick(starRating)}
          onMouseEnter={() => setHoveredRating(starRating)}
          onMouseLeave={() => setHoveredRating(null)}
          src={starRating <= displayRating ? filled_star : empty_star}
        />
      ))}
    </div>
  );
};

export default StarRating;
