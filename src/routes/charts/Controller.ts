import { Controller } from "cx/ui";
import { $page } from "./model";

export default class extends Controller {
	public onInit(): void {
		this.loadData();
	}

	public loadData(): void {
		const days: string[] = [
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat",
			"Sun",
		];
		const data = days.map((day) => ({
			day,
			amount: parseFloat((Math.random() * 2000).toFixed(2)),
		}));

		this.store.set($page.transactions, data);
	}
}
