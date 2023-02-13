import PlusIcon from './img/Plus';
import React from 'react';
import svgStyles from "./styles/svg.module.css";

import rowStyles from "./styles/Row.module.css";
import styles from "./styles/AddRow.module.css";

export const AddNewItemRow = ({ state }:any) => {
	return <div className={`${styles.addRow} ${rowStyles.tr}`} onClick={state.addRow}>
		<span className={`${svgStyles.icon} ${svgStyles.gray} ${svgStyles.marginRight}`}>
		  <PlusIcon />
		</span>
		New
	</div>
}