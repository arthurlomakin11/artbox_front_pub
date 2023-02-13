import React, {useEffect, useState} from 'react';
import ContentEditable from 'react-contenteditable';
import Badge from './Badge';
import { usePopper } from 'react-popper';
import { grey } from './colors';
import PlusIcon from './img/Plus';
import { ActionTypes, DataTypes, randomColor } from './utils';
import ReactDOM from "react-dom";
import svgStyles from "./styles/svg.module.css";
import cellStyles from "./styles/Cell.module.scss";

const Cell = ({ value: initialValue, row: { index }, column: { id, dataType, options }, dataDispatch, state}:any) => {
	const [value, setValue] = useState({ value: initialValue, update: false });
	const [selectRef, setSelectRef] = useState(null);
	const [selectPop, setSelectPop] = useState(null);
	const [showSelect, setShowSelect] = useState(false);
	const [showAdd, setShowAdd] = useState(false);
	const [addSelectRef, setAddSelectRef] = useState(null);
	const { styles, attributes } = usePopper(selectRef, selectPop, {
		placement: 'bottom-start',
		strategy: 'fixed',
	});

	function handleOptionKeyDown(e:any) {
		if (e.key === 'Enter') {
			if (e.target.value !== '') {
				dataDispatch({
					type: ActionTypes.ADD_OPTION_TO_COLUMN,
					option: e.target.value,
					backgroundColor: randomColor(),
					columnId: id,
				});
			}
			setShowAdd(false);
		}
	}

	function handleAddOption(e:any) {
		setShowAdd(true);
	}

	function handleOptionBlur(e:any) {
		if (e.target.value !== '') {
			dataDispatch({
				type: ActionTypes.ADD_OPTION_TO_COLUMN,
				option: e.target.value,
				backgroundColor: randomColor(),
				columnId: id,
			});
		}
		setShowAdd(false);
	}

	function getColor() {
		let match = options.find((option:any) => option.label === value.value);
		return (match && match.backgroundColor) || grey(200);
	}

	function onChange(e:any) {
		setValue({ value: e.target.value, update: true });
	}

	function handleOptionClick(option:any) {
		setValue({ value: option.label, update: true });
		setShowSelect(false);
	}

	function getCellElement() {
		switch (dataType) {
			case DataTypes.TEXT:
				return (
					<ContentEditable
						html={(value.value && value.value.toString()) || ''}
						onChange={onChange}
						// onBlur={() => setValue(old => ({ value: old.value, update: false }))}
						className={cellStyles.text}
					/>
				);
			case DataTypes.NUMBER:
				return (
					<ContentEditable
						html={(value.value && value.value.toString()) || ''}
						onChange={onChange}
						// onBlur={() => setValue(old => ({ value: old.value, update: false }))}
						className={cellStyles.number}
					/>
				);
			case DataTypes.SELECT:
				return (
					<>
						<div
							ref={el => setSelectRef(el as any)}
							className={cellStyles.select}
							onClick={() => setShowSelect(true)}>
							{value.value && (
								<Badge value={value.value} backgroundColor={getColor()} />
							)}
						</div>
						{showSelect && (
							<div className="overlay" onClick={() => setShowSelect(false)} />
						)}
						{showSelect &&
						ReactDOM.createPortal(
							<div
								className="shadow-5 bg-white border-radius-md"
								ref={el => setSelectPop(el as any)}
								{...attributes.popper}
								style={{
									...styles.popper,
									zIndex: 4,
									minWidth: 200,
									maxWidth: 320,
									maxHeight: 400,
									padding: '0.75rem',
									overflow: 'auto',
								}}>
								<div
									className="d-flex flex-wrap-wrap"
									style={{ marginTop: '-0.5rem' }}>
									{options.map((option:any) => (
										<div className="cursor-pointer mr-5 mt-5" onClick={() => handleOptionClick(option)}>
											<Badge value={option.label} backgroundColor={option.backgroundColor}/>
										</div>
									))}
									{showAdd && (
										<div
											className="mr-5 mt-5 bg-grey-200 border-radius-sm"
											style={{
												width: 120,
												padding: '2px 4px',
											}}
										>
											<input
												type="text"
												className="option-input"
												onBlur={handleOptionBlur}
												ref={el => setAddSelectRef(el as any)}
												onKeyDown={handleOptionKeyDown} />
										</div>
									)}
									<div className="cursor-pointer mr-5 mt-5" onClick={handleAddOption}>
										<Badge
											value={
												<span className={`${svgStyles.icon} ${svgStyles.iconSmall} ${svgStyles.svgText}`}>
													<PlusIcon />
												</span>
											}
											backgroundColor={grey(200)}
										/>
									</div>
								</div>
							</div>,
							document.querySelector('#popper-portal') as Element
						)}
					</>
				);
			default:
				return <></>;
		}
	}

	useEffect(() => {
		if (addSelectRef && showAdd) {
			(addSelectRef as any).focus();
		}
	}, [addSelectRef, showAdd]);

	useEffect(() => {
		setValue({ value: initialValue, update: false });
	}, [initialValue]);

	useEffect(() => {
		if (value.update) {
			state.updateCell(id, index, value.value).then((res:any) => res);
		}
	}, [value, dataDispatch, id, index]);

	return getCellElement();
}

export default React.memo(Cell);
