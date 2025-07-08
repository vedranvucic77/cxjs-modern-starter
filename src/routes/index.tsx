import { FirstVisibleChildLayout } from "cx/ui";
import { Route, PureContainer, Link } from "cx/widgets";
import { Accounts } from "./accounts";
import { Charts } from "./charts";

export default () => (
	<cx>
		<div class="flex h-screen bg-gray-50">
			{/* Sidebar */}
			<div class="w-64 bg-white shadow-md p-4 flex flex-col">
				<div class="text-2xl font-bold mb-8">CxJS</div>
				<nav class="flex flex-none flex-col gap-4">
					<Link
						href="~/accounts"
						class="text-gray-700 hover:text-blue-500"
					>
						Accounts
					</Link>
					<Link
						href="~/charts"
						class="text-gray-700 hover:text-blue-500"
					>
						Charts
					</Link>
				</nav>
			</div>

			<div class="flex-1 flex flex-col p-10">
				<FirstVisibleChildLayout>
					<Route route="~/accounts" url-bind="url" prefix>
						<Accounts />
					</Route>
					<Route route="~/charts" url-bind="url" prefix>
						<Charts />
					</Route>
					<Route route="~/cx" url-bind="url" prefix>
						<h2 class="text-3xl font-semibold">Hello CxJS</h2>
					</Route>
				</FirstVisibleChildLayout>
			</div>
		</div>
	</cx>
);
