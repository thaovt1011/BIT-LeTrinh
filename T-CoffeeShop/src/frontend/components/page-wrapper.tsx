import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Header, Page } from "zmp-ui";

export const PageWrapper = ({ children, title }) => {
  const navigate = useNavigate();
  return (
    <Page>
      <Header title={title} onBackClick={() => navigate("/")} />
      {children}
    </Page>
  );
};
