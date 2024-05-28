import React from "react";
import PropTypes from "prop-types";

export default function ListItem({ item, onMouseOver, onMouseLeave, titles }) {
  const { title, type } = item;

  return (
    <section
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <p className="p">{type}</p>
        {titles.length > 0 && (
          <div>
            {titles.map((title, idx) => (
              <p key={idx}>{title}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

ListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
