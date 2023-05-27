import React, { useState } from "react";
import PropTypes from "prop-types";

const Rating = ({ initialRating, onChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`cursor-pointer ${
            value <= rating ? "text-yellow-500" : "text-gray-400"
          }`}
          onClick={() => handleClick(value)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

Rating.propTypes = {
  initialRating: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Rating;
