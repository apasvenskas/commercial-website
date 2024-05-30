import React from "react";
import PropTypes from "prop-types";
import styles from './ListItem.module.css'
import Link from "next/link";

export default function ListItem({ item, onMouseOver, onMouseLeave, titles }) {
  const { title, type } = item;

  return (
    <section
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.typesMenu}>
        <Link href={`/products/types/${type}`}>
        <p className={styles.p}>{type}</p>
        </Link>
        {titles.length > 0 && (
          <div className={styles.titles}>
            {titles.map((title, idx) => (
             <Link href={`/products/all/${title}-${type}`} key={idx} legacyBehavior> 
             <a className={styles.p}>{title}</a> 
             </Link>
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
