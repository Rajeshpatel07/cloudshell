import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const NotFound = lazy(() => import("./NotFound"));
const Login = lazy(() => import("./Login"));
const Demo = lazy(() => import("./Demo"));
const Playground = lazy(() => import("./Playground"));
const Dashboard = lazy(() => import("./Dashboard"));
const Signup = lazy(() => import("./Signup"));
const Manage = lazy(() => import("./Manage"));

export {
	Home,
	NotFound,
	Login,
	Demo,
	Playground,
	Dashboard,
	Signup,
	Manage
}
