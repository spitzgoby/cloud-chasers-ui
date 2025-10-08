import { type RouteConfig, index } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), { path: "/review", file: "routes/review.tsx"}] satisfies RouteConfig;
