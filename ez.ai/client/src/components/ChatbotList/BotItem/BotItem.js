import React, { useState, useCallback } from "react";
import "./BotItem.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_CURRENT_CHATBOT,
  DELETE_CHATBOT_REQUEST,
  DISCONNECT_CHATBOT_REQUEST,
} from "../../../reducer/chatbot";
import { withRouter } from "react-router-dom";
import AddPlatformPopup from "../Popup/AddPlatformPopup";
import PlatformConnect from "./PlatformConnect";

const BotItem = (props, platformInfo) => {
  const dispatch = useDispatch();
  const { currentChatbot, chatbotList, currentCategories } = useSelector(
    (state) => state.chatbot
  );
  const [botClick, setBotClick] = useState({ botOn: false });
  const { children, onRemove, botDesc, botConnect, id } = props;
  const [addPlatformFlag, setAddPlatformFlag] = useState("");
  const snsIcon = ["fab fa-line", "fab fa-telegram"];
  const [tokenPreview, setTokenPreview] = useState(["", ""]);

  const botClickEvent = () => {
    setBotClick({ botOn: !botClick.botOn });
  };
  const botDeleteClickEvent = useCallback(
    (id) => {
      const confirmDelete = window.confirm(
        "정말로 선택하신 챗봇빌더를 삭제하시겠습니까?"
      );
      if (confirmDelete) {
        const index = chatbotList.findIndex((v) => v.id === id);
        const chatbotData = chatbotList[index];
        dispatch({
          type: DELETE_CHATBOT_REQUEST,
          data: chatbotData,
        });
      }
    },
    [currentChatbot]
  );
  // const botSnsIconHandler = (botConnect) => {
  //   if (botConnect === "kakao") {
  //     return <span className="icon-kakao"></span>;
  //   } else if (botConnect === "line") {
  //     return <span className="icon-line"></span>;
  //   } else if (botConnect === "telegram") {
  //     return <span className="icon-telegram"></span>;
  //   } else {
  //     return null;
  //   }
  // };
  const setCurrentChatbot = useCallback(
    (id) => {
      const index = chatbotList.findIndex((v) => v.id === id);
      const chatbotData = chatbotList[index];
      dispatch({
        type: SET_CURRENT_CHATBOT,
        data: chatbotData,
      });
      props.history.push("/chatbotbuild");
    },
    [chatbotList]
  );
  //플랫폼 추가 팝업
  // const onClickPlatform = useCallback(
  //   (info) => {
  //     //연결되어 있으면 해제
  //     if (info.connect) {
  //       const connect = window.confirm("연동을 해제하시겠습니까?");
  //       if (connect) {
  //         const platformInfo = JSON.parse(
  //           chatbotList.find((v) => v.id === id).platformInfo
  //         );
  //         platformInfo.find(
  //           (v) => v.platform === info.platform
  //         ).connect = false;

  //         dispatch({
  //           type: DISCONNECT_CHATBOT_REQUEST,
  //           data: { platformInfo, id },
  //         });
  //       }
  //     } else {
  //       setAddPlatformFlag(info.platform);
  //     }
  //   },
  //   [chatbotList]
  // );
  return (
    <React.Fragment>
      {addPlatformFlag && (
        <AddPlatformPopup
          addPlatformFlag={addPlatformFlag}
          setAddPlatformFlag={setAddPlatformFlag}
          id={id}
          setTokenPreview={setTokenPreview}
          tokenPreview={tokenPreview}
        />
      )}
      {botClick.botOn ? (
        <div>
          <div className="bot-item-expand">
            <div className="bot-item-header" onClick={botClickEvent}>
              <div className="bot-item-infos">
                <div className="bot-name">{children}</div>
              </div>

              {/* <div className="sns-icons-container">
                {botSnsIconHandler(botConnect)}
              </div> */}
              <div className="bot-item-btns">
                <div className="bot-item-connected">
                  {JSON.parse(
                    chatbotList.find((v) => v.id === id).platformInfo
                  ).map((info, i) => (
                    <div
                      className={
                        info.connect ? `sns-color-${info.platform}` : null
                      }
                    >
                      <i className={snsIcon[i]}></i>
                    </div>
                  ))}
                </div>
                <div
                  className="bot-item-create"
                  onClick={() => setCurrentChatbot(id)}
                >
                  수정
                </div>
                <div
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    botDeleteClickEvent(id);
                  }}
                >
                  <i className="far fa-trash-alt"></i>
                </div>
              </div>
            </div>
            <div className="bot-item-footer">
              <div className="bot-description">
                <div className="txt-description">Description</div>
                <div className="txtBox">{botDesc}</div>
              </div>
            </div>
            <div className="sns-icon-container-section">
              <div className="sns-icon-container-title">챗봇 연동 정보</div>
              <div className="sns-icons-container">
                <PlatformConnect
                  id={id}
                  setAddPlatformFlag={setAddPlatformFlag}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 접혀있을때
        <div>
          <div className="bot-item-default" onClick={botClickEvent}>
            <div className="bot-item-infos">
              <div className="bot-name">{children}</div>
            </div>
            <div className="bot-item-btns">
              <div className="bot-item-connected">
                {JSON.parse(
                  chatbotList.find((v) => v.id === id).platformInfo
                ).map((info, i) => (
                  <div
                    className={
                      info.connect ? `sns-color-${info.platform}` : null
                    }
                  >
                    <i className={snsIcon[i]}></i>
                  </div>
                ))}
              </div>
              <div
                className="bot-item-create"
                onClick={() => setCurrentChatbot(id)}
              >
                수정
              </div>
              <div
                className="delete"
                onClick={() => {
                  botDeleteClickEvent(id);
                }}
              >
                <i className="far fa-trash-alt"></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default withRouter(BotItem);
