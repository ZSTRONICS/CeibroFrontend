import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import i18n from "i18next";

import CommonButton from "../common/CommonButton";

const ImageMapFooterToolbar = ({
  canvasRef,
  preview,
  onChangePreview,
  zoomRatio,
}) => {
  const [interactionMode, setInteractionMode] = useState("selection");

  useEffect(() => {
    if (canvasRef) {
      attachEventListener(canvasRef);
      return () => detachEventListener(canvasRef);
    }
  }, [canvasRef]);

  const waitForCanvasRender = (canvas) => {
    setTimeout(() => {
      if (canvas) {
        attachEventListener(canvas);
      } else {
        waitForCanvasRender(canvasRef);
      }
    }, 5);
  };

  const attachEventListener = (canvasRef) => {
    canvasRef.canvas.wrapperEl.addEventListener(
      "keydown",
      events.keydown,
      false
    );
  };

  const detachEventListener = (canvasRef) => {
    canvasRef.canvas.wrapperEl.removeEventListener("keydown", events.keydown);
  };

  const handlers = {
    selection: () => {
      canvasRef.modeHandlers.selection((obj) => ({
        selectable: obj.superType !== "port",
        evented: true,
      }));
      setInteractionMode("selection");
    },
    grab: () => {
      canvasRef.modeHandlers.grab();
      setInteractionMode("grab");
    },
  };

  const events = {
    keydown: (e) => {
      if (canvasRef.canvas.wrapperEl !== document.activeElement) {
        return false;
      }
      if (e.keyCode === 81) {
        handlers.selection();
      } else if (e.keyCode === 87) {
        handlers.grab();
      }
    },
  };

  if (!canvasRef) {
    return null;
  }

  const zoomValue = parseInt((zoomRatio * 100).toFixed(2), 10);

  return (
    <React.Fragment>
      <div className="rde-editor-footer-toolbar-zoom">
        <Button.Group>
          <CommonButton
            style={{
              borderBottomLeftRadius: "8px",
              borderTopLeftRadius: "8px",
            }}
            onClick={() => {
              canvasRef.zoomHandlers.zoomOut();
            }}
            icon="search-minus"
            tooltipTitle={i18n.t("action.zoom-out")}
          />
          <CommonButton
            onClick={() => {
              canvasRef.zoomHandlers.zoomOneToOne();
            }}
            tooltipTitle={i18n.t("action.one-to-one")}
          >
            {`${zoomValue}%`}
          </CommonButton>
          <CommonButton
            onClick={() => {
              canvasRef.zoomHandlers.zoomToDefault();
            }}
            tooltipTitle={i18n.t("action.fit")}
            icon="expand"
          />
          {/* Other buttons and input elements */}
        </Button.Group>
      </div>
    </React.Fragment>
  );
};

ImageMapFooterToolbar.propTypes = {
  canvasRef: PropTypes.any,
  preview: PropTypes.bool,
  onChangePreview: PropTypes.func,
  zoomRatio: PropTypes.number,
};

export default ImageMapFooterToolbar;
