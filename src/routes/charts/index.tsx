import {
	BarGraph,
	CategoryAxis,
	Chart,
	Gridlines,
	NumericAxis,
} from "cx/charts";
import { Svg } from "cx/src/svg";
import { createFunctionalComponent } from "cx/ui";
import Controller from "./Controller";
import { $page } from "./model";

export const Charts = createFunctionalComponent(() => (
	<cx>
		<h2 class="text-3xl font-semibold mb-6">Weekly Transactions</h2>

		<div controller={Controller} class="p-6">
			<div class="bg-white rounded-xl shadow-sm p-6">
				<Svg style="width: 100%; height: 400px;">
					<Chart
						offset="20 -150 -30 150"
						axes={{
							x: { type: NumericAxis },
							y: { type: CategoryAxis, vertical: true },
						}}
					>
						<Gridlines />
						<BarGraph
							data={$page.transactions}
							colorIndex={5}
							name="V1"
							size={0.3}
							offset={-0.15}
							xField="amount"
							yField="day"
						/>
						<BarGraph
							data={$page.transactions}
							colorIndex={0}
							name="V1"
							size={0.3}
							offset={0.25}
							xField="amount"
							yField="day"
						/>
					</Chart>
				</Svg>
			</div>
		</div>
	</cx>
));
