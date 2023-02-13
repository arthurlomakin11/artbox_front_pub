export interface TableChangesEvent {}

export interface CellValueChangedEvent extends TableChangesEvent {
	oldValue: any,
	newValue: any,
	changedObject: object,
}

export interface RowAddedEvent extends TableChangesEvent {
	value: any
}

abstract class TableChangesObserver<T> {
	static handlers:Array<Function> = []

	static subscribe(handler:Function) {
		this.handlers.push(handler);
	}

	private static isAsync(func:Function) {
		return func.constructor.name === "AsyncFunction";
	}

	static async fire(e:TableChangesEvent) {
		for (const handler of this.handlers) {
			const res = handler(e);
			if(res) {
				return res;
			}
		}
	}
}

export class CellValueChangeObserver extends TableChangesObserver<CellValueChangedEvent> {
	static handlers:Array<Function> = []
}
export class RowAddedObserver extends TableChangesObserver<RowAddedEvent> {
	static handlers:Array<Function> = []
}