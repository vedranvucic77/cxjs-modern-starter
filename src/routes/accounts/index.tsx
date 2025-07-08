import { createFunctionalComponent } from "cx/ui";
import { Grid, HighlightedSearchText, TextField } from "cx/widgets";
import { $page, $record } from "./model";
import Controller from "./Controller";
import { getSearchQueryPredicate } from "cx/util";

export const Accounts = createFunctionalComponent(() => (
	<cx>
		<h2 class="text-3xl font-semibold mb-6">Accounts</h2>

		<div
			controller={Controller}
			class="p-2 h-full overflow-hidden flex flex-col"
		>
			<TextField
				value={$page.filter}
				placeholder="Filter by account name..."
				inputClass="py-4 w-64 border rounded px-2 py-1"
				class="mb-4"
			/>

			<div class="bg-white rounded-xl shadow-sm flex flex-col h-full">
				<Grid
					records={$page.accounts}
					columns={[
						{ header: "ID", field: "id", defaultWidth: 20 },
						{
							header: "Name",
							field: "name",
							defaultWidth: 100,
							items: (
								<cx>
									<HighlightedSearchText
										text={$record.name}
										query={$page.filter}
									/>
								</cx>
							),
						},
						{ header: "IBAN", field: "iban", defaultWidth: 50 },
						{
							header: "Balance",
							field: "balance",
							format: "currency;EUR",
							defaultWidth: 50,
						},
					]}
					className="flex-1"
					scrollable
					emptyText="No records match the specified filter."
					filterParams={$page.filter}
					onCreateFilter={(search) => {
						if (!search) return () => true;
						let predicate = getSearchQueryPredicate(search);
						return (record) => predicate(record.name);
					}}
				/>
			</div>
		</div>
	</cx>
));
