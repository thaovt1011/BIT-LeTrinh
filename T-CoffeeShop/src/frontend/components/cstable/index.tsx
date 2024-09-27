import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  RecoilState,
  RecoilValueReadOnly,
  useRecoilRefresher_UNSTABLE,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { LoadingRows } from "./loading-rows";
import { modalVisibleState } from "components/csmodal";
import { displayCustomDate } from "utils/date";
import RowEffect from "./row-effect";
import { motion, useInView } from "framer-motion";
import { debounce } from "lodash";

const CSTableWrapper = ({ children, refs }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <tbody>{children}</tbody>
      </table>
      <div ref={refs} style={{ height: "20px" }} />
    </div>
  );
};

type Actions = {
  deleted?: Function;
  created?: Function;
};

type FilterBy = {
  field: string;
  value: string;
};

type RowsProps = {
  valueRecoilState: RecoilValueReadOnly<any[]>;
  setRecoilState: RecoilState<any>;
  actions?: Actions | boolean;
  rowsTitle?: object;
  loadingRows?: ReactElement;
  children?: Function;
  filter?: string;
  filterBy?: Function;
};

export const CSTable = ({
  valueRecoilState,
  setRecoilState,
  actions,
  rowsTitle,
  loadingRows,
  children,
  filter,
  filterBy,
}: RowsProps) => {
  const recoilValue = useRecoilValueLoadable(valueRecoilState);
  const setRecoil = useSetRecoilState(setRecoilState);
  const setModalVisible = useSetRecoilState(modalVisibleState);
  const refresh = useRecoilRefresher_UNSTABLE(valueRecoilState);
  let { state, contents } = recoilValue;
  const [search, setSearch] = useState("");
  const [value, setValue] = useState(5);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
  });

  const handleDetail = (val) => {
    setRecoil(val);
    setModalVisible(true);
  };
  useEffect(() => {
    refresh();
  },[])

  useEffect(() => {
    if (isInView) {
      setValue(value + 3);
    }
  }, [isInView]);

  const handleSearchProduct = useCallback(
    debounce((keyword) => {
      setSearch(keyword);
      setValue(5);
    }, 500),
    []
  );

  if (state === "loading")
    return (
      <CSTableWrapper refs={ref}>
        {loadingRows || <LoadingRows rowsData={rowsTitle || []} />}
      </CSTableWrapper>
    );

  if (state === "hasValue") {
    var list = contents.filter((obj) => {
      if (filterBy) {
        return filterBy(obj);
      }
      return true;
    });

    return (
      <CSTableWrapper refs={ref}>
        {filter && (
          <div className="p-4 flex gap-x-2">
            <label className="input input-bordered input-sm flex flex-1 items-center">
              <input
                type="text"
                className="grow "
                placeholder="Search"
                onChange={(e) => handleSearchProduct(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            {typeof actions !== "boolean" && actions?.created && (
              <button
                onClick={() => actions.created && actions.created()}
                className="btn btn-sm"
              >
                Create
              </button>
            )}
          </div>
        )}
        {(filter
          ? list.filter((obj) => {
              return obj[filter]
                .toString()
                .trim()
                .toLowerCase()
                .includes(search.toLowerCase());
            })
          : list
        )
          .slice(0, value)
          .map((val, key) => (
            <tr key={key} className="border-0">
              <td className="pb-0">
                <RowEffect>
                  <div className="flex justify-center">
                    <div className="p-2 space-y-2 border-2 rounded-md w-full">
                      {rowsTitle &&
                        Object.keys(val as {}).map(
                          (k, key) =>
                            rowsTitle[k] && (
                              <div className="flex justify-between" key={key}>
                                <span>{rowsTitle[k].title}</span>
                                <span className="bg-black text-white rounded-lg px-1">
                                  {(() => {
                                    switch (rowsTitle[k].type) {
                                      case "money":
                                        return val[k]?.toLocaleString() + " đ";
                                      case "date":
                                        return displayCustomDate(
                                          new Date(val[k])
                                        );
                                      default:
                                        return val[k];
                                    }
                                  })()}
                                </span>
                              </div>
                            )
                        )}
                      {children && children(val)}
                      {!children && actions && (
                        <>
                          <div className="divider divider-neutral">
                            Thao tác
                          </div>
                          <div className="flex *:flex-1 gap-x-5">
                            <button
                              className="btn btn-sm"
                              onClick={() => handleDetail(val)}
                            >
                              Chi tiết
                            </button>
                            {typeof actions !== "boolean" &&
                              actions.deleted && (
                                <button
                                  onClick={() =>
                                    actions.deleted && actions.deleted(val.id)
                                  }
                                  className="btn btn-sm btn-outline btn-error"
                                >
                                  Xóa
                                </button>
                              )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </RowEffect>
              </td>
            </tr>
          ))}
      </CSTableWrapper>
    );
  }
  return;
};
