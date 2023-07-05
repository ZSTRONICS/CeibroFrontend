import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input } from "antd";
import i18n from "i18next";

import Canvas from "../../canvas/Canvas";
import StyleProperty from "../properties/StyleProperty";

const StyleModal = ({
  visible,
  style,
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
    let newStyle = style;
    if (!newStyle || !Object.keys(newStyle).length) {
      newStyle = {
        fill: "rgba(0, 0, 0, 1)",
        opacity: 1,
        stroke: "rgba(255, 255, 255, 0)",
        strokeWidth: 1,
      };
    }
    delete newStyle.strokeDashArray;
    waitForCanvasRender(canvasRef.current, newStyle);
    form.resetFields();
  }, [style]);

  const waitForCanvasRender = (canvas, newStyle) => {
    setTimeout(() => {
      if (canvas) {
        Object.keys(newStyle).forEach((key) => {
          canvas.handlers.setById("styles", key, newStyle[key]);
        });
      } else {
        waitForCanvasRender(canvasRef.current, newStyle);
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
          id: "styles",
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
      <Form form={form} initialValues={{ title: style.title }}>
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
      {StyleProperty.render(canvasRef.current, form, style)}
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

StyleModal.propTypes = {
  visible: PropTypes.bool,
  style: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  validateTitle: PropTypes.object,
  onChange: PropTypes.func,
};

export default StyleModal;
