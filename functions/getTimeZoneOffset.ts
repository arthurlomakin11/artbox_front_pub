export function getTimeZoneOffset(date:Date): number {
	return date.getTimezoneOffset() / -60
}