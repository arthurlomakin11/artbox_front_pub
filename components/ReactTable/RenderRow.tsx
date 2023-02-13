import React from 'react';

import rowStyles from "./styles/Row.module.css"

export const RenderRow = React.memo(({ index, style, data:{ table } }:any) => {
	const row = table.rows[index];
	table.prepareRow(row);
	return (
		<div key={index} {...row.getRowProps({ style })} className={rowStyles.tr}>
			{row.cells.map((cell:any) => (
				<div {...cell.getCellProps()} className={rowStyles.td}>
					{cell.render('Cell')}
				</div>
			))}
		</div>
	);
});