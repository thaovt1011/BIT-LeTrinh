import React from "react";

export const LoadingRows = ({ row }) => {
  return (
    <>
      {[...new Array(row)].map((val, key) => (
        <tr key={key}>
          <td>
            <div className="flex gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-20 w-20">
                  <div className="skeleton w-full aspect-square rounded-lg"></div>
                </div>
              </div>
              <div className="w-full space-y-3 py-3">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
