import { ActionTypes } from './utils';

export async function reducer(state:any, action:any) {
	if(action.type === ActionTypes.UPDATE_COLUMN_HEADER) {
		const index = state.columns.findIndex((column:any) => column.id === action.columnId);

		state.columns[index].label = action.label;
	}
}