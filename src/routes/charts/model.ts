import { createAccessorModelProxy } from "cx/data";
import { Transaction } from "./Types";

export interface Model {
	$page: {
		transactions: Transaction[];
	};
}

export const { $page } = createAccessorModelProxy<Model>();
