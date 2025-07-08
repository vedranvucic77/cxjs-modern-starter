import { Controller } from "cx/ui";
import { Account } from "./Types";
import { $page } from "./model";

export default class extends Controller {
	public onInit(): void {
		this.loadData();
	}

	public async loadData(): Promise<void> {
		this.store.set($page.accounts, this.generateAccounts(100));
	}

	private generateAccounts(count: number): Account[] {
		const names: string[] = [
			"Personal Account",
			"Savings Account",
			"Business Account",
			"Crypto Account",
		];
		const accounts: Account[] = [];

		for (let i = 1; i <= count; i++) {
			const name: string =
				names[Math.floor(Math.random() * names.length)];
			const iban: string = this.generateIban();
			const balance: number = parseFloat(
				(Math.random() * 15000).toFixed(2)
			);

			accounts.push({ id: i, name, iban, balance });
		}

		return accounts;
	}

	private generateIban(): string {
		const country: string = "BA39";
		let bank = "";
		for (let i = 0; i < 16; i++) {
			bank += Math.floor(Math.random() * 10).toString();
		}
		return country + bank;
	}
}
