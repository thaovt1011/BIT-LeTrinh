import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { productsState } from "state";
import { Rows } from "./rows";

export const OrderDetailTableTab = () => {
  return (
    <div>
      <div className="overflow-x-auto border rounded-lg">
        <table className="table">
          <tbody>
            <Rows />
          </tbody>
        </table>
      </div>
    </div>
  );
};
