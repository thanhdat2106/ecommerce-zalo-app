import { Outlet } from "react-router-dom";
import Header from "./header";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { ScrollRestoration } from "./scroll-restoration";
import { RecoilRoot } from "recoil";
import Skeleton from "./skeletonProduct";

export default function Layout() {
  return (
    <RecoilRoot>
      <div className="w-screen h-screen flex flex-col bg-background text-foreground">
        <ScrollRestoration />
        <Header />
        <div className="flex-1 overflow-y-auto">
          <Suspense fallback={<Skeleton />}>
            <Outlet />
          </Suspense>
        </div>
        {/* <Footer /> */}
        <Toaster
          containerClassName="toast-container"
          containerStyle={{
            top: "calc(50% - 24px)",
          }}
        />
      </div>
    </RecoilRoot>
  );
}
