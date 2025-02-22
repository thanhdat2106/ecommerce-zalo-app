import Layout from "@/components/layout";
import HomePage from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";
import { getBasePath } from "@/utils/zma";
import ProductDetail from "./pages/products/product-detail";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          handle: {
            logo: true,
          },
        },
        {
          path: "/product-detail/:id/:isBuyNow",
          element: <ProductDetail />,
          handle: {
            title: "Product details",
            scrollRestoration: 0, // when user selects another product in related products, scroll to the top of the page
          },
        },
      ],
    },
  ],
  { basename: getBasePath() }
);

export default router;
