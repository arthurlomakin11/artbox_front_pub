import React, { useState, useEffect } from 'react';
import { usePopper } from 'react-popper';
import { grey } from './colors';
import ArrowUpIcon from './img/ArrowUp';
import ArrowDownIcon from './img/ArrowDown';
import { ActionTypes, DataTypes, shortId } from './utils';
import svgStyles from "./styles/svg.module.css";
import headerStyles from "./styles/Header.module.css";

const Header = ({
					column: { id, created, label, dataType, getResizerProps, getHeaderProps },
					setSortBy,
					dataDispatch,
				}:any) => {
	const [expanded, setExpanded] = useState(created || false);
	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const [inputRef, setInputRef] = useState(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: 'bottom',
		strategy: 'absolute',
	});
	const [header, setHeader] = useState(label);
	const buttons = [
		{
			onClick: (e:any) => {
				dataDispatch({
					type: ActionTypes.UPDATE_COLUMN_HEADER,
					columnId: id,
					label: header,
				});
				setSortBy([{ id: id, desc: false }]);
				setExpanded(false);
			},
			icon: <ArrowUpIcon />,
			label: 'Sort ascending',
		},
		{
			onClick: (e:any) => {
				dataDispatch({
					type: ActionTypes.UPDATE_COLUMN_HEADER,
					columnId: id,
					label: header,
				});
				setSortBy([{ id: id, desc: true }]);
				setExpanded(false);
			},
			icon: <ArrowDownIcon />,
			label: 'Sort descending',
		}
	];

	function getHeader() {
		return (
			<>
				<div {...getHeaderProps()} className={`${headerStyles.th} noselect d-inline-block`}>
					<div className={headerStyles.content}
						 onClick={() => setExpanded(true)}
						 ref={el => setReferenceElement(el as any)}>{label}</div>
					<div {...getResizerProps()} className="resizer" />
				</div>
				{expanded && (
					<div className="overlay" onClick={() => setExpanded(false)} />
				)}
				{expanded && (
					<div
						ref={el => setPopperElement(el as any)}
						style={{ ...styles.popper, zIndex: 3 }}
						{...attributes.popper}
					>
						<div
							className="bg-white shadow-5 border-radius-md"
							style={{
								width: 240,
							}}
						>
							<div
								className="list-padding"
								key={shortId()}
								style={{
									borderTop: `2px solid ${grey(200)}`,
								}}
							>
								{buttons.map(button => (
									<button type="button" className="sort-button" onMouseDown={button.onClick}>
										<span className={`${svgStyles.icon} ${svgStyles.svgText} ${svgStyles.marginRight}`}>
											{button.icon}
										</span>
										{button.label}
									</button>
								))}
							</div>
						</div>
					</div>
				)}
			</>
		);
	}

	useEffect(() => {
		if (created) {
			setExpanded(true);
		}
	}, [created]);

	useEffect(() => {
		setHeader(label);
	}, [label]);

	useEffect(() => {
		if (inputRef) {
			(inputRef as any).focus();
			(inputRef as any).select();
		}
	}, [inputRef]);

	return getHeader();
}


export default React.memo(Header)