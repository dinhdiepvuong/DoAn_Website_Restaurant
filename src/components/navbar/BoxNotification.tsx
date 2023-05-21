import classNames from "classnames";
import React, { useState } from "react";
import styled from "styled-components";
import { primaryColor } from "../../theme";

const Top = styled.div`
  border-radius: 5px 5px 0px 0px;
`;
const Bottom = styled.div`
  background-color: #ffffff;
`;
function BoxNotification() {
  const [tab, setTab] = useState<string>("all");
  const handleChangeTab = (tab: string) => {
    setTab(tab);
  };
  return (
    <div className="box_shadow_card">
      <Top className="bg_primary">
        <div className="d-flex align-items-center justify-content-between p-4">
          <div className="font16 font_family_bold_italic color_white">
            Notifications
          </div>
          <div className="bg_white color_primary font_14 font_family_bold py-1 px-2 border_radius_5">
            0 New
          </div>
        </div>
        <div className="px-3">
          <button
            onClick={() => handleChangeTab("all")}
            className={classNames(
              "btn m-0 py-2 px-3 font14 font_family_bold_italic tab_notification",
              {
                active: Boolean(tab === "all"),
              }
            )}
          >
            All (4)
          </button>
          <button
            onClick={() => handleChangeTab("messages")}
            className={classNames(
              "btn m-0 py-2 px-3 font14 font_family_bold_italic tab_notification",
              {
                active: Boolean(tab === "messages"),
              }
            )}
          >
            Messages
          </button>
          <button
            onClick={() => handleChangeTab("alerts")}
            className={classNames(
              "btn m-0 py-2 px-3 font14 font_family_bold_italic tab_notification",
              {
                active: Boolean(tab === "alerts"),
              }
            )}
          >
            Alerts
          </button>
        </div>
      </Top>
      <Bottom className="p-2 bottom_box_notification">
        {[1, 2, 3, 4, 5].map((item) => (
          <div style={{ height: "200px" }}>{item}</div>
        ))}
      </Bottom>
    </div>
  );
}

export default BoxNotification;
