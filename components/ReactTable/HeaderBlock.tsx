import React from 'react';

export const HeaderBlock = ({ headerGroups }:any) => {
	return <div>
		{headerGroups.map((headerGroup:any) => (
			<div {...headerGroup.getHeaderGroupProps()}>
				{headerGroup.headers.map((column:any) => column.render('Header'))}
			</div>
		))}
	</div>
}