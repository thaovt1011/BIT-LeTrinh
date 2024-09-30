import React from "react";

export const LoadingRows = ({
  rows = 5,
  rowsData,
}: {
  rows?: number;
  rowsData: object;
}) => {
  return (
    <>
      {Object.keys([...Array(rows)]).map((val, index) => (
        <tr key={index} className="border-0">
          <td>
            <div className="flex justify-center">
              <div className="p-2 space-y-2 border-2 border-black border-opacity-15 rounded-md w-full">
                {/* <div className="skeleton h-4 w-full"></div> */}
                {Object.keys(rowsData).map((val) => (
                  <div className="flex *:flex-1 gap-x-5">
                    <div className="skeleton h-4"></div>
                    <div className="skeleton h-4"></div>
                  </div>
                ))}
                <div className="divider">
                  <div className="skeleton h-4 w-56"></div>
                </div>
                <div className="flex *:flex-1 gap-x-5">
                  <button className="btn btn-sm skeleton"></button>
                  <button className="btn btn-sm skeleton"></button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
