import React, {useEffect, useMemo} from 'react';
import clsx from "clsx";
import { useTable, useBlockLayout, useResizeColumns, useSortBy } from 'react-table';
import { FixedSizeList } from "react-window";
import scrollbarWidth from './scrollbarWidth';
import { isTableResizing } from './tableUtils';
import { RenderRow } from './RenderRow';
import { defaultColumn } from './defaultColumn';
import { HeaderBlock } from './HeaderBlock';
import { AddNewItemRow } from './AddNewItemRow';
import { DataTypes } from './utils';
import { reducer } from './reducer';
import { observable } from "mobx"
import { observer } from 'mobx-react';


import tableFacadeStyles from "./styles/TableFacade.module.css";
const TableFacade = observer((state:any) => {
	return <div className={tableFacadeStyles.TableFacade}>
		<Table tableState={state}
			   columns={state.state.columns}
			   data={state.state.data}
			   dispatch={(action:any) => reducer(state.state, action)}
			   skipReset={state.state.skipReset}/>
		<div id="popper-portal"/>
	</div>
})

import tableStyles from "./styles/Table.module.css";
import {CellValueChangeObserver, RowAddedObserver} from "./TableChangesObserver";
const Table = observer(({ tableState, columns, data, dispatch: dataDispatch, skipReset }:any) => {
	const sortTypes = useMemo(
		() => ({
			alphanumericFalsyLast(rowA:any, rowB:any, columnId:any, desc:number) {
				if (!rowA.values[columnId] && !rowB.values[columnId]) {
					return 0;
				}

				if (!rowA.values[columnId]) {
					return desc ? -1 : 1;
				}

				if (!rowB.values[columnId]) {
					return desc ? 1 : -1;
				}

				return isNaN(rowA.values[columnId])
					? rowA.values[columnId].localeCompare(rowB.values[columnId])
					: rowA.values[columnId] - rowB.values[columnId];
			},
		}),
		[]
	);

	const table = useTable(
		{
			columns,
			data,
			defaultColumn,
			dataDispatch,
			autoResetSortBy: !skipReset,
			autoResetFilters: !skipReset,
			autoResetRowState: !skipReset,
			sortTypes
		} as any,
		useBlockLayout,
		useResizeColumns,
		useSortBy
	);

	table.state = tableState;

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		totalColumnsWidth,
	} = table;

	return <div {...getTableProps()} className={clsx('table', isTableResizing(headerGroups) && 'noselect')}>
		<HeaderBlock headerGroups={headerGroups}/>
		<div {...getTableBodyProps()}>
			<FixedSizeList
				height={window.innerHeight - 100}
				itemCount={rows.length}
				itemData={{table}}
				itemSize={40}
				width={totalColumnsWidth + scrollbarWidth()}
				className={tableStyles.TableList}>
				{RenderRow}
			</FixedSizeList>
			<AddNewItemRow dataDispatch={dataDispatch} state={tableState}/>
		</div>
	</div>
});

export default TableFacade;