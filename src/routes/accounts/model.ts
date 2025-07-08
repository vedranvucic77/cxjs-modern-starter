import { createAccessorModelProxy } from "cx/data";

import { Account } from "./Types";

export interface Model {
	$page: {
		accounts: Account[];

		filter: string;
	};

	$record: Account;
}

export const { $page, $record } = createAccessorModelProxy<Model>();
