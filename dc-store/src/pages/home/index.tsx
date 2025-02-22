import Cart from "../cart";
import Header from "./header";
import ListProduct from "../products/product-list";
import { ScrollRestoration } from "@/components/scroll-restoration";
const HomePage: React.FunctionComponent = () => {
  return (
    <div className="min-h-full bg-section">
      <ScrollRestoration />
      <body className="bg-white">
        <Header />
        <ListProduct />
        <Cart />
      </body>
    </div>
  );
};

export default HomePage;
