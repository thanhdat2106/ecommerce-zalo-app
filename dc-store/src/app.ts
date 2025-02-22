// React core
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Router
import router from "@/router";

// ZaUI stylesheet
import "zmp-ui/zaui.css";
// Tailwind stylesheet
import "@/css/tailwind.scss";
// Your stylesheet
import "@/css/app.scss";

// Expose app configuration
import appConfig from "../app-config.json";

// Khởi tạo QueryClient
const queryClient = new QueryClient();

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

// Mount the app
const root = createRoot(document.getElementById("app")!);
root.render(
  createElement(
    QueryClientProvider,
    { client: queryClient },
    createElement(RouterProvider, { router })
  )
);
