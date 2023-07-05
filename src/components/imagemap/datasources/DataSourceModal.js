import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input } from "antd";

import Canvas from "../../canvas/Canvas";
import DataSourceProperty from "../properties/DataSourceProperty";

const DataSourceModal = ({
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

  const waitForContainerRender = (container) => {
    setTimeout(() => {
      if (container) {
        setWidth(container.clientWidth);
        setHeight(container.clientHeight);
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
          label="Title"
          required
          colon={false}
          hasFeedback
          help={validateTitle.help}
          validateStatus={validateTitle.validateStatus}
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input />
        </Form.Item>
      </Form>
      {DataSourceProperty.render(canvasRef.current, form, { animation })}
      <div ref={containerRef}>
        <Canvas
          ref={canvasRef}
          editable={false}
          width={width}
          height={height}
        />
      </div>
    </Modal>
  );
};

DataSourceModal.propTypes = {
  visible: PropTypes.bool,
  animation: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  validateTitle: PropTypes.object,
  onChange: PropTypes.func,
};

export default DataSourceModal;
