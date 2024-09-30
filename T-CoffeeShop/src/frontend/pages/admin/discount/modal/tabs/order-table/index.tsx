import React from "react";
import { Rows } from "./rows";

export const OrderTableTab = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead></thead>
          <tbody>
            <Rows />
          </tbody>
        </table>
      </div>
    </div>
  );
};
