import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input } from "antd";
import i18n from "i18next";

import Canvas from "../../canvas/Canvas";
import AnimationProperty from "../properties/AnimationProperty";

const AnimationModal = ({
  visible,
  animation,
  onOk,
  onCancel,
  validateTitle,
  onChange,
}) => {
  const [width, setWidth] = useState(150);
  const [height, setHeight] = useState(150);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    waitForContainerRender(containerRef.current);
  }, []);

  useEffect(() => {
    if (!visible && canvasRef.current) {
      canvasRef.current.animationHandlers.stop("animations");
    }
  }, [visible]);

  useEffect(() => {
    waitForCanvasRender(canvasRef.current, animation);
  }, [animation]);

  const waitForCanvasRender = (canvas, anim) => {
    setTimeout(() => {
      if (canvas) {
        canvas.handlers.setById("animations", "animation", anim);
      } else {
        waitForCanvasRender(canvasRef.current, anim);
      }
    }, 5);
  };

  const waitForContainerRender = (container) => {
    setTimeout(() => {
      if (container) {
        setWidth(container.clientWidth);
        setHeight(container.clientHeight);
        const option = {
          type: "i-text",
          text: "\uf3c5",
          fontFamily: "Font Awesome 5 Free",
          fontWeight: 900,
          fontSize: 60,
          width: 30,
          height: 30,
          editable: false,
          name: "New marker",
          tooltip: {
            enabled: false,
          },
          left: 200,
          top: 50,
          id: "animations",
          fill: "rgba(0, 0, 0, 1)",
          stroke: "rgba(255, 255, 255, 0)",
        };
        canvasRef.current.handlers.add(option);
      } else {
        waitForContainerRender(containerRef.current);
      }
    }, 5);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onOk(values);
      })
      .catch(() => {});
  };

  return (
    <Modal onOk={handleOk} onCancel={onCancel} visible={visible}>
      <Form form={form} initialValues={{ title: animation.title }}>
        <Form.Item
          label={i18n.t("common.title")}
          required
          colon={false}
          hasFeedback
          help={validateTitle.help}
          validateStatus={validateTitle.validateStatus}
          name="title"
          rules={[
            { required: true, message: i18n.t("common.validation.required") },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
      {AnimationProperty.render(canvasRef.current, form, {
        animation,
        id: "animations",
      })}
      <div ref={containerRef}>
        <Canvas
          ref={canvasRef}
          editable={false}
          canvasOption={{ width, height, backgroundColor: "#f3f3f3" }}
          workareaOption={{ backgroundColor: "transparent" }}
        />
      </div>
    </Modal>
  );
};

AnimationModal.propTypes = {
  visible: PropTypes.bool,
  animation: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  validateTitle: PropTypes.object,
  onChange: PropTypes.func,
};

export default AnimationModal;
