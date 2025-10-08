import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  { path: "/review", file: "routes/review.tsx" },
  { path: "/reviewSummaryPage", file: "routes/reviewSummaryPage.tsx" },
  { path: "/priorCampaignSummaryPage", file: "routes/priorCampaignSummaryPage.tsx" },
  { path: "/priorCampaigns", file: "routes/priorCampaigns.tsx" },
] satisfies RouteConfig;