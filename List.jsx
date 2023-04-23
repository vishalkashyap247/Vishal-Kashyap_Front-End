import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";


// Single List Item
const SingleListItem = memo(({ index, isSelected, onClick, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "red" }}
      onClick={onClick}
    >
      {text}
    </li>
  );
});


SingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};


// List Component
const List = memo(({ items = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => () => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return (
    <ul style={{ textAlign: "left" }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index}
          onClick={handleClick(index)}
          text={item.text}
          index={index}
          isSelected={index === selectedIndex}
        />
      ))}
    </ul>
  );
});


List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};


export default List;
