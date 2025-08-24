import { TanstackDevtools } from "@tanstack/react-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import { Navbar } from "@/components/common/Navbar";
import type { QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Navbar />
      <main className=" xl:max-w-screen-lg 2xl:max-w-screen-xl lg:mx-auto p-4 md:p-10">
        <Outlet />
      </main>
      <Toaster richColors closeButton position="top-right" />
      <TanstackDevtools
        config={{
          position: "bottom-left",
        }}
        
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel/>,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  ),
});
