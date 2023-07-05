import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Collapse, List } from "antd";

import PropertyDefinition from "./PropertyDefinition";
import Scrollbar from "../../common/Scrollbar";
import { FlexBox } from "../../flex";

const { Panel } = Collapse;

const NodeProperties = ({ canvasRef, selectedItem }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedItem) {
      form.resetFields();
    }
  }, [selectedItem, form]);

  const showArrow = false;

  return (
    <Scrollbar>
      <Form layout="horizontal" form={form}>
        <Collapse bordered={false}>
          {selectedItem && PropertyDefinition[selectedItem.type] ? (
            Object.keys(PropertyDefinition[selectedItem.type]).map((key) => {
              return (
                <Panel
                  key={key}
                  header={PropertyDefinition[selectedItem.type][key].title}
                  showArrow={showArrow}
                >
                  {PropertyDefinition[selectedItem.type][key].component.render(
                    canvasRef,
                    form,
                    selectedItem
                  )}
                </Panel>
              );
            })
          ) : (
            <FlexBox
              justifyContent="center"
              alignItems="center"
              style={{
                width: "100%",
                height: "100%",
                color: "rgba(0, 0, 0, 0.45)",
                fontSize: 16,
                padding: 16,
              }}
            >
              <List />
            </FlexBox>
          )}
        </Collapse>
      </Form>
    </Scrollbar>
  );
};

NodeProperties.propTypes = {
  canvasRef: PropTypes.any,
  selectedItem: PropTypes.object,
};

export default NodeProperties;
