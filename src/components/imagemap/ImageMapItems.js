import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Collapse, notification, Input, message } from "antd";
import { v4 as uuid } from "uuid";
import classnames from "classnames";
import i18n from "i18next";

import { FlexBox } from "../flex";
import Icon from "../icon/Icon";
import Scrollbar from "../common/Scrollbar";
import CommonButton from "../common/CommonButton";

notification.config({
  top: 80,
  duration: 2,
});

const ImageMapItems = ({ canvasRef, descriptors, readOnly }) => {
  const [activeKey, setActiveKey] = useState([]);
  const [collapse, setCollapse] = useState(true);
  const [textSearch, setTextSearch] = useState("");
  const [filteredDescriptors, setFilteredDescriptors] = useState([]);
  const [descriptorsState, setDescriptorsState] = useState({});

  useEffect(() => {
    waitForCanvasRender(canvasRef);
  }, [canvasRef]);

  useEffect(() => {
    if (JSON.stringify(descriptors) !== JSON.stringify(descriptorsState)) {
      const descriptorsArray = Object.keys(descriptors).reduce((prev, key) => {
        return prev.concat(descriptors[key]);
      }, []);
      setDescriptorsState(descriptors);
      setFilteredDescriptors(descriptorsArray);
    }
  }, [descriptors, descriptorsState]);

  const waitForCanvasRender = (canvas) => {
    setTimeout(() => {
      if (canvas) {
        attachEventListener(canvas);
        return;
      }
      waitForCanvasRender(canvasRef);
    }, 5);
  };

  const attachEventListener = (canvas) => {
    if (!readOnly) {
      canvas.canvas.wrapperEl.addEventListener(
        "dragenter",
        events.onDragEnter,
        false
      );
      canvas.canvas.wrapperEl.addEventListener(
        "dragover",
        events.onDragOver,
        false
      );
      canvas.canvas.wrapperEl.addEventListener(
        "dragleave",
        events.onDragLeave,
        false
      );
      canvas.canvas.wrapperEl.addEventListener("drop", events.onDrop, false);
    }
  };

  const detachEventListener = (canvas) => {
    if (!readOnly) {
      canvas.canvas.wrapperEl.removeEventListener(
        "dragenter",
        events.onDragEnter
      );
      canvas.canvas.wrapperEl.removeEventListener(
        "dragover",
        events.onDragOver
      );
      canvas.canvas.wrapperEl.removeEventListener(
        "dragleave",
        events.onDragLeave
      );
      canvas.canvas.wrapperEl.removeEventListener("drop", events.onDrop);
    }
  };

  const handlers = {
    onAddItem: (item, centered) => {
      if (canvasRef.workarea.layout === "responsive") {
        if (!canvasRef.workarea._element) {
          notification.warn({
            message: "Please your select background image",
          });
          return;
        }
      }
      if (canvasRef.interactionMode === "polygon") {
        message.info("Already drawing");
        return;
      }
      const id = uuid();
      const option = Object.assign({}, item.option, { id });
      canvasRef.handlers.add(option, centered);
    },
    onDrawingItem: (item) => {
      if (canvasRef.workarea.layout === "responsive") {
        if (!canvasRef.workarea._element) {
          notification.warn({
            message: "Please your select background image",
          });
          return;
        }
      }
      if (canvasRef.interactionMode === "polygon") {
        message.info("Already drawing");
        return;
      }
      if (item.option.type === "line") {
        canvasRef.drawingHandlers.line.init();
      } else if (item.option.type === "arrow") {
        canvasRef.drawingHandlers.arrow.init();
      } else {
        canvasRef.drawingHandlers.polygon.init();
      }
    },
    onChangeActiveKey: (activeKey) => {
      setActiveKey(activeKey);
    },
    onCollapse: () => {
      setCollapse(!collapse);
    },
    onSearchNode: (e) => {
      const filteredDescriptors = handlers
        .transformList()
        .filter((descriptors) =>
          descriptors.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
      setTextSearch(e.target.value);
      setFilteredDescriptors(filteredDescriptors);
    },
    transformList: () => {
      const updatedDescriptor = Object.entries(descriptors)
        .filter((value, key) => {
          return key !== "default";
        })
        .reduce((prev, curr) => prev.concat(curr), []);

      // console.log(updatedDescriptor, "updatedDescriptor");
      return Object.values(descriptors).reduce(
        (prev, curr) => prev.concat(curr),
        []
      );
    },
  };

  const events = {
    onDragStart: (e, item) => {
      this.item = item;
      const { target } = e;
      target.classList.add("dragging");
    },
    onDragOver: (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = "copy";
      return false;
    },
    onDragEnter: (e) => {
      const { target } = e;
      target.classList.add("over");
    },
    onDragLeave: (e) => {
      const { target } = e;
      target.classList.remove("over");
    },
    onDrop: (e) => {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      const { layerX, layerY } = e;
      const dt = e.dataTransfer;
      if (dt.types.length && dt.types[0] === "Files") {
        const { files } = dt;
        Array.from(files).forEach((file) => {
          file.uid = uuid();
          const { type } = file;
          if (
            type === "image/png" ||
            type === "image/jpeg" ||
            type === "image/jpg"
          ) {
            const item = {
              option: {
                type: "image",
                file,
                left: layerX,
                top: layerY,
              },
            };
            handlers.onAddItem(item, false);
          } else {
            notification.warn({
              message: "Not supported file type",
            });
          }
        });
        return false;
      }
      const option = Object.assign({}, this.item.option, {
        left: layerX,
        top: layerY,
      });
      const newItem = Object.assign({}, this.item, { option });
      handlers.onAddItem(newItem, false);
      return false;
    },
    onDragEnd: (e) => {
      this.item = null;
      e.target.classList.remove("dragging");
    },
  };

  const renderItems = (items) => {
    console.log(items, "items");
    return (
      <FlexBox flexWrap="wrap" flexDirection="column" style={{ width: "100%" }}>
        {items.map((item) => renderItem(item))}
      </FlexBox>
    );
  };

  const renderItem = (item, centered) => {
    let classNames = ["rde-editor-items-item"];
    if (readOnly) {
      classNames = [...classNames, "rde-editor-items-readonly"];
    }
    return item.type === "drawing" ? (
      <div
        key={item.name}
        draggable={!readOnly}
        onClick={(e) => {
          if (!readOnly) {
            handlers.onDrawingItem(item);
          }
        }}
        className={classNames.join(" ")}
        style={{ justifyContent: collapse ? "center" : null }}
      >
        <span className="rde-editor-items-item-icon">
          <Icon
            name={item.icon.name}
            prefix={item.icon.prefix}
            style={item.icon.style}
          />
        </span>
        {collapse ? null : (
          <div className="rde-editor-items-item-text">{item.name}</div>
        )}
      </div>
    ) : (
      <div
        key={item.name}
        draggable={!readOnly}
        onClick={(e) => {
          if (!readOnly) {
            handlers.onAddItem(item, centered);
          }
        }}
        onDragStart={(e) => {
          if (!readOnly) {
            events.onDragStart(e, item);
          }
        }}
        onDragEnd={(e) => {
          if (!readOnly) {
            events.onDragEnd(e, item);
          }
        }}
        className={classNames.join(" ")}
        style={{ justifyContent: collapse ? "center" : null }}
      >
        <span className="rde-editor-items-item-icon">
          <Icon
            name={item.icon.name}
            prefix={item.icon.prefix}
            style={item.icon.style}
          />
        </span>
        {collapse ? null : (
          <div className="rde-editor-items-item-text">{item.name}</div>
        )}
      </div>
    );
  };

  const render = () => {
    const className = classnames("rde-editor-items", {
      minimize: collapse,
    });
    return (
      <div className={className}>
        <FlexBox flex="1" flexDirection="column" style={{ height: "100%" }}>
          <Scrollbar>
            <FlexBox flex="2" style={{ overflowY: "hidden" }}>
              {textSearch.length ? (
                renderItems(filteredDescriptors)
              ) : collapse ? (
                <FlexBox
                  flexWrap="wrap"
                  flexDirection="column"
                  style={{ width: "100%" }}
                  justifyContent="center"
                >
                  {handlers.transformList().map((item) => renderItem(item))}
                </FlexBox>
              ) : (
                <Collapse
                  style={{ width: "100%" }}
                  bordered={false}
                  activeKey={
                    activeKey.length ? activeKey : Object.keys(descriptors)
                  }
                  onChange={handlers.onChangeActiveKey}
                >
                  {Object.keys(descriptors).map((key) => (
                    <Collapse.Panel
                      key={key}
                      header={key}
                      showArrow={!collapse}
                    >
                      {renderItems(descriptors[key])}
                    </Collapse.Panel>
                  ))}
                </Collapse>
              )}
            </FlexBox>
          </Scrollbar>
        </FlexBox>
      </div>
    );
  };

  return render();
};

export default ImageMapItems;
