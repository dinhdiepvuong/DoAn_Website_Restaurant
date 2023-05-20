import { Icon } from "@iconify/react";
import React from "react";

type Props = {
  value: any;
  click: (value: any) => void;
  type: string;
  page?: number;
  pageEnd?: number;
  status?: string;
};
function Pagination({
  value,
  click,
  type,
  page,
  pageEnd = 0,
  status = "not end",
}: Props) {
  if (type === "change")
    return (
      <button className="btn page ml_10px" onClick={() => click(value)}>
        {value === "prev" ? (
          <Icon icon="charm:chevron-left" />
        ) : (
          <Icon icon="charm:chevron-right" />
        )}
      </button>
    );
  else if ((value <= 0 || value >= pageEnd) && status !== "end") return null;
  return (
    <button
      className={`btn ${value === page ? "active" : ""} page ml_10px`}
      onClick={() => click(value)}
    >
      {value}
    </button>
  );
}

export default Pagination;
