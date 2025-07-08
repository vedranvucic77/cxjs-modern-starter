import { enableImmerMutate } from "cx-immer";
import { Store } from "cx/data";
import {
	enableCultureSensitiveFormatting,
	History,
	startHotAppLoop,
	Url,
	Widget,
} from "cx/ui";
import { Debug, Timing } from "cx/util";
import { enableMsgBoxAlerts, enableTooltips } from "cx/widgets";
import routes from "./routes";

enableTooltips();
enableMsgBoxAlerts();
enableImmerMutate();
enableCultureSensitiveFormatting();

const store: Store = new Store();

Url.setBaseFromScript("app.*js");
History.connect(store, "url");

Widget.resetCounter();
Timing.enable("app-loop");
Debug.enable("app-data");

startHotAppLoop(module, document.getElementById("app"), store, routes);
