export function shortId() {
	return '_' + Math.random().toString(36).substr(2, 9);
}

export function randomColor() {
	return `hsl(${Math.floor(Math.random() * 360)}, 95%, 90%)`;
}

export const ActionTypes = {
	ADD_OPTION_TO_COLUMN: 'add_option_to_column',
	ADD_ROW: 'add_row',
	UPDATE_COLUMN_HEADER: 'update_column_header',
	UPDATE_CELL: 'update_cell',
	ENABLE_RESET: 'enable_reset',
};

export const DataTypes = {
	NUMBER: 'number',
	TEXT: 'text',
	SELECT: 'select',
};
