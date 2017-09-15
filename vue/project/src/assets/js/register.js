const STORAGE_KEY = "registerInfo";
export default {
	fetch () {
		return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "[]");
	},
	save (items) {
		window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	}
}