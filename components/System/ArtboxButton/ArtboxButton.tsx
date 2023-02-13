import React, {MouseEventHandler, ReactChild} from "react";
import styles from "./ArtboxButton.module.css";

export const ArtboxButton = ({children, onClick}:{children:ReactChild, onClick?:MouseEventHandler<HTMLButtonElement>}) => {
	return <button type="button" className={styles.button} onClick={onClick}>
		{children}
	</button>
}