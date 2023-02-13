export function isTableResizing(headerGroups:any) {
	for (let headerGroup of headerGroups) {
		for (let column of headerGroup.headers) {
			if (column.isResizing) {
				return true;
			}
		}
	}

	return false;
}