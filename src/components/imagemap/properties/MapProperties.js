import React from "react";
import PropTypes from "prop-types";
import { Form, Collapse } from "antd";

import PropertyDefinition from "./PropertyDefinition";
import Scrollbar from "../../common/Scrollbar";

const { Panel } = Collapse;

function MapProperties({ canvasRef }) {
  const [form] = Form.useForm();
  const showArrow = false;

  if (canvasRef) {
    return (
      <Scrollbar>
        <Form layout="horizontal" form={form}>
          <Collapse bordered={false}>
            {Object.keys(PropertyDefinition.map).map((key) => (
              <Panel
                key={key}
                header={PropertyDefinition.map[key].title}
                showArrow={showArrow}
              >
                {PropertyDefinition.map[key].component.render(
                  canvasRef,
                  form,
                  canvasRef.workarea
                )}
              </Panel>
            ))}
          </Collapse>
        </Form>
      </Scrollbar>
    );
  }

  return null;
}

MapProperties.propTypes = {
  canvasRef: PropTypes.any,
};

export default React.memo(MapProperties);
