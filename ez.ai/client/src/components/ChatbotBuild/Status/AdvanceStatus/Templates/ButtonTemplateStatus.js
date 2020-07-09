import React, { useState, useEffect } from "react";
import produce from "immer";
import "./ButtonTemplateStatus.css";
import { use } from "passport";

const ButtonTemplateStatus = (
  currentContent,
  setKeywordObject,
  keywordObject,
  now,
  setCurListCount
) => {
  const [showActionAddBtn, setShowActionAddBtn] = useState(true);

  // === 노드 데이터 ===
  const [nodeAction, setNodeAction] = useState([
    // 최대 4개
    {
      id: 0,
      type: "uri",
      label: "View detail",
      uri: "http://example.com/page/123",
      data: "",
    },
  ]);

  const btnTemplateNode = [
    {
      type: "buttons",
      thumbnailImageUrl: "",
      imageSize: "cover",
      imageBackgroundColor: "#FFFFFF",
      title: "",
      text: "",
      defaultAction: {
        // 사진, 이미지, 제목등 탭했을때
        type: "uri",
        label: "View detail",
        uri: "",
      },
      actions: nodeAction,
    },
  ];

  // action  추가
  const addAction = () => {
    console.log(btnTemplateNode);
    // 요소추가
    if (nodeAction.length < 4) {
      setNodeAction([
        ...nodeAction,
        {
          id: nodeAction.length,
          type: "uri",
          label: "",
          uri: "", // uri 타입 사용시.
          data: "", // postback 타입 사용시
        },
      ]);
    }
  };

  // action 제거
  const removeAction = (id) => {
    if (nodeAction.length == 1) {
      alert("action은 최소 한개 이상 존재해야 합니다");
      return;
    }
    let tmpAction = nodeAction;
    tmpAction = tmpAction.filter((action) => action.id !== id);
    tmpAction = tmpAction.map((action, index) => {
      return { ...action, id: index };
    });

    setNodeAction(tmpAction);
  };

  /* action type 변경 */
  const changeActionType = (id, value) => {
    setNodeAction(
      nodeAction.map((node) =>
        node.id === id ? { ...node, type: value } : node
      )
    );
  };

  // OnChange 함수들
  // uri 주소 onchsnge
  const onChangeUri = (e, id) => {
    setNodeAction(
      nodeAction.map((node) =>
        node.id === id ? { ...node, uri: e.target.value } : node
      )
    );
  };

  useEffect(() => {
    btnTemplateNode.actions = nodeAction;

    if (nodeAction.length === 4) {
      setShowActionAddBtn(false);
    } else {
      setShowActionAddBtn(true);
    }
    console.log(nodeAction);
  });

  return (
    <div className="btn-template-status">
      <div className="btn-template-control">
        <input type="color" className="btn-template-color" value="#ffffff" />
        <div className="btn-template-image-size">cover</div>
      </div>
      <div className="btn-template-status-main">
        <div
          className="btn-template-thumbnail"
          title="썸네일 이미지 업로드(선택)"
        >
          <i className="fas fa-upload"></i>
          <div className="btn-template-thumbnail-cautions">
            <div className="btn-template-thumbnail-caution">
              파일 형식 : JPEG, PNG
            </div>
            <div className="btn-template-thumbnail-caution">
              파일 최대 너비 : 1024px / 최대 파일 크기: 1MB
            </div>
          </div>
        </div>
        <div className="btn-template-contents">
          <div className="btn-template-title">
            <input type="text" placeholder="타이틀을 적어주세요(선택)" />
          </div>
          <div className="btn-template-text">
            <textarea placeholder="텍스트를 적어주세요(필수 항목)" />
          </div>
          <div className="btn-template-actions">
            {nodeAction.map((act) => (
              <>
                <div className="btn-template-action">
                  <div className="btn-action-types">
                    <div
                      className="btn-action-type"
                      onClick={() => changeActionType(act.id, "uri")}
                    >
                      url
                    </div>
                    <div
                      className="btn-action-type"
                      onClick={() => changeActionType(act.id, "postback")}
                    >
                      키워드
                    </div>
                  </div>
                  <div className="btn-action-label">
                    {act.type === "uri" ? (
                      <input
                        type="text"
                        placeholder="연동할 url를 입력해주세요"
                        onChange={(e) => onChangeUri(e, act.id)}
                        value={act.uri}
                      />
                    ) : (
                      <select>
                        <option value="none" selected disabled>
                          연동할 키워드를 선택해주세요
                        </option>
                      </select>
                    )}

                    <input
                      type="text"
                      placeholder="버튼이름을 작성해주세요"
                      value={act.id}
                    />
                  </div>
                  <div
                    className="btn-action-remove"
                    onClick={() => removeAction(act.id)}
                  >
                    <i className="fas fa-minus-circle"></i>
                  </div>
                </div>
              </>
            ))}

            {showActionAddBtn ? (
              <div className="btn-action-add">
                <div className="add-btn" onClick={() => addAction()}>
                  action 추가
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonTemplateStatus;
