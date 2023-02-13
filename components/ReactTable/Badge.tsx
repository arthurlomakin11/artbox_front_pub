import React from 'react';

import styles from "./styles/Badge.module.css";
export default function Badge({ value, backgroundColor }:any) {
	return (
		<span className={`${styles.Badge} color-grey-800 border-radius-sm`}
			style={{
				backgroundColor: backgroundColor,
				padding: '2px 6px',
			}}>
      {value}
    </span>
	);
}
