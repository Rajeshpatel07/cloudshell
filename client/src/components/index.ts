import { lazy } from "react";

const TerminalWindow = lazy(() => import("./Term"));
const Working = lazy(() => import("./Working"));
const Navbar = lazy(() => import("./Navbar"));
const Intro = lazy(() => import("./Intro"));
const Table = lazy(() => import("./Table"));

export {
	TerminalWindow,
	Working,
	Navbar,
	Intro,
	Table,
};
