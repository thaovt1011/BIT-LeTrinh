import React from "react";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import { getConfig } from "utils/config";
import { Layout } from "./layout";
import { ConfigProvider } from "./config-provider";

const MyApp = () => {
  return (
    <RecoilRoot>
      <ConfigProvider
        cssVariables={{
          // đổi màu template ở đây
          "--zmp-primary-color": getConfig((c) => c.template.greenColor),
          "--zmp-background-color": "#f4f5f6"
        }}
      >
        <App>
          <SnackbarProvider className="mt-12 bg-neutral-50 border border-success p-5 text-black">
            <ZMPRouter>
              <Layout />
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </ConfigProvider>
    </RecoilRoot>
  );
};
export default MyApp;
