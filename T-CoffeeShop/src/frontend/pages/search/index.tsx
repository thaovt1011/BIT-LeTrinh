import React, { FC } from "react";
import { Header, Page } from "zmp-ui";
import { Inquiry } from "./inquiry";
import { SearchResult } from "./result";
import { CiSearch } from "react-icons/ci";
import { size } from "lodash";

const SearchPage: FC = () => {
  return (
    <Page className="flex flex-col">
       
      <Header backIcon={<CiSearch size={24}/> } title="Tìm kiếm" />
      <Inquiry />
      <SearchResult />
    </Page>
  );
};

export default SearchPage;
