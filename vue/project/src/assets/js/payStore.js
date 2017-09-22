const STORAGE_KEY = "orderId";
export default {
	fetch () {
		return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "[]");
	},
	save (items) {
		window.sessionStorage.setItem(STORAGE_KEY, items);
	}
}