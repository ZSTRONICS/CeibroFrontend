import { Badge, Button, Menu } from "antd";
import { ResizeSensor } from "css-element-queries";
import { Component } from "react";
// import ab2str from 'arraybuffer-to-string';
import i18n from "i18next";
import debounce from "lodash/debounce";

import Canvas from "../canvas/Canvas";
import ImageMapConfigurations from "./ImageMapConfigurations";
import ImageMapFooterToolbar from "./ImageMapFooterToolbar";
import ImageMapHeaderToolbar from "./ImageMapHeaderToolbar";
import ImageMapItems from "./ImageMapItems";

import "../../libs/fontawesome-5.2.0/css/all.css";
import "../../styles/index.less";
import Container from "../common/Container";

const propertiesToInclude = [
  "id",
  "name",
  "lock",
  "file",
  "src",
  "link",
  "tooltip",
  "animation",
  "layout",
  "workareaWidth",
  "workareaHeight",
  "videoLoadType",
  "autoplay",
  "shadow",
  "muted",
  "loop",
  "code",
  "icon",
  "userProperty",
  "trigger",
  "configuration",
  "superType",
  "points",
];

const defaultOptions = {
  fill: "rgba(0, 0, 0, 1)",
  stroke: "rgba(255, 255, 255, 0)",
  resource: {},
  link: {
    enabled: false,
    type: "resource",
    state: "new",
    dashboard: {},
  },
  tooltip: {
    enabled: true,
    type: "resource",
    template: "<div>{{message.name}}</div>",
  },
  animation: {
    type: "none",
    loop: true,
    autoplay: true,
    delay: 100,
    duration: 1000,
  },
  userProperty: {},
  trigger: {
    enabled: false,
    type: "alarm",
    script: "return message.value > 0;",
    effect: "style",
  },
};

class ImageMapEditor extends Component {
  constructor(props) {
    super(props);
    this.getWorkarea = this.getWorkarea.bind(this);
    const workarea = this.getWorkarea(props);
    this.state = {
      selectedItem: null,
      zoomRatio: 1,
      canvasRect: {
        width: 600,
        height: 150,
      },
      preview: false,
      loading: false,
      progress: 0,
      animations: [],
      objects: [],
      styles: [],
      dataSources: [],
      workarea,
      editing: false,
      descriptors: {},
      dataObjects: {}, // store each of page object, for page change
    };
  }

  // componentWillReceiveProps({ page }) {

  // }

  componentDidMount() {
    this.showLoading(true);

    import("./Descriptors.json").then((descriptors) => {
      this.setState(
        {
          descriptors,
        },
        () => {
          this.showLoading(false);
        }
      );
    });
    this.resizeSensor = new ResizeSensor(this.container, () => {
      const { canvasRect: currentCanvasRect } = this.state;
      const canvasRect = Object.assign({}, currentCanvasRect, {
        width: this.container.clientWidth,
        height: this.container.clientHeight,
      });
      this.setState({
        canvasRect,
      });
    });
    const { config = {} } = this.props;
    this.setState(
      {
        canvasRect: {
          width: this.container.clientWidth,
          height: this.container.clientHeight,
        },
        selectedItem: null,
        dataObjects: config,
      },
      () =>
        this.handlers.initialObjectFromConfig(config, this.props.currentPage)
    );
  }

  canvasHandlers = {
    onAdd: (target) => {
      if (!this.state.editing) {
        this.changeEditing(true);
      }
      if (target.type === "activeSelection") {
        this.canvasHandlers.onSelect(null);
        return;
      }
      this.canvasRef.handlers.select(target);
    },
    onSelect: (target) => {
      if (
        target &&
        target.id &&
        target.id !== "workarea" &&
        target.type !== "activeSelection"
      ) {
        if (
          this.state.selectedItem &&
          target.id === this.state.selectedItem.id
        ) {
          return;
        }
        this.canvasRef.handlers.getObjects().forEach((obj) => {
          if (obj) {
            this.canvasRef.animationHandlers.initAnimation(obj, true);
          }
        });
        this.setState({
          selectedItem: target,
        });
        return;
      } else if (target && !target.id && target.type === "activeSelection") {
        this.canvasRef.handlers.getObjects().forEach((obj) => {
          if (obj) {
            this.canvasRef.animationHandlers.initAnimation(obj, true);
          }
        });
        this.setState({
          selectedItem: target,
        });
        return;
      }
      this.canvasRef.handlers.getObjects().forEach((obj) => {
        if (obj) {
          this.canvasRef.animationHandlers.initAnimation(obj, true);
        }
      });
      this.setState({
        selectedItem: null,
      });
    },
    onRemove: (target) => {
      if (!this.state.editing) {
        this.changeEditing(true);
      }
      this.canvasHandlers.onSelect(null);
    },
    onModified: debounce((target) => {
      if (!this.state.editing) {
        this.changeEditing(true);
      }
      if (
        target &&
        target.id &&
        target.id !== "workarea" &&
        target.type !== "activeSelection"
      ) {
        this.setState({
          selectedItem: target,
        });
        return;
      }
      this.setState({
        selectedItem: null,
      });
    }, 300),
    onZoom: (zoom) => {
      this.setState(
        {
          zoomRatio: zoom,
        },
        () => {
          if (this.props.onZoom) {
            this.props.onZoom(zoom);
          }
        }
      );
    },
    onChange: (selectedItem, changedValues, allValues) => {
      if (!this.state.editing) {
        this.changeEditing(true);
      }
      const changedKey = Object.keys(changedValues)[0];
      const changedValue = changedValues[changedKey];
      if (allValues.workarea) {
        this.canvasHandlers.onChangeWokarea(
          changedKey,
          changedValue,
          allValues.workarea
        );
        return;
      }
      if (changedKey === "width" || changedKey === "height") {
        this.canvasRef.handlers.scaleToResize(
          allValues.width,
          allValues.height
        );
        return;
      }
      if (changedKey === "lock") {
        this.canvasRef.handlers.setObject({
          lockMovementX: changedValue,
          lockMovementY: changedValue,
          hasControls: !changedValue,
          hoverCursor: changedValue ? "pointer" : "move",
          editable: !changedValue,
          lock: changedValue,
        });
        return;
      }
      if (
        changedKey === "file" ||
        changedKey === "src" ||
        changedKey === "code"
      ) {
        if (selectedItem.type === "image") {
          this.canvasRef.handlers.setImageById(selectedItem.id, changedValue);
        } else if (this.canvasRef.handlers.isElementType(selectedItem.type)) {
          this.canvasRef.elementHandlers.setById(selectedItem.id, changedValue);
        }
        return;
      }
      if (changedKey === "link") {
        const link = Object.assign({}, defaultOptions.link, allValues.link);
        this.canvasRef.handlers.set(changedKey, link);
        return;
      }
      if (changedKey === "tooltip") {
        const tooltip = Object.assign(
          {},
          defaultOptions.tooltip,
          allValues.tooltip
        );
        this.canvasRef.handlers.set(changedKey, tooltip);
        return;
      }
      if (changedKey === "animation") {
        const animation = Object.assign(
          {},
          defaultOptions.animation,
          allValues.animation
        );
        this.canvasRef.handlers.set(changedKey, animation);
        return;
      }
      if (changedKey === "icon") {
        const { unicode, styles } = changedValue[Object.keys(changedValue)[0]];
        const uni = parseInt(unicode, 16);
        if (styles[0] === "brands") {
          this.canvasRef.handlers.set("fontFamily", "Font Awesome 5 Brands");
        } else if (styles[0] === "regular") {
          this.canvasRef.handlers.set("fontFamily", "Font Awesome 5 Regular");
        } else {
          this.canvasRef.handlers.set("fontFamily", "Font Awesome 5 Free");
        }
        this.canvasRef.handlers.set("text", String.fromCodePoint(uni));
        this.canvasRef.handlers.set("icon", changedValue);
        return;
      }
      if (changedKey === "shadow") {
        if (allValues.shadow.enabled) {
          this.canvasRef.handlers.setShadow(changedKey, allValues.shadow);
        } else {
          this.canvasRef.handlers.setShadow(changedKey, null);
        }
        return;
      }
      if (changedKey === "fontWeight") {
        this.canvasRef.handlers.set(
          changedKey,
          changedValue ? "bold" : "normal"
        );
        return;
      }
      if (changedKey === "fontStyle") {
        this.canvasRef.handlers.set(
          changedKey,
          changedValue ? "italic" : "normal"
        );
        return;
      }
      if (changedKey === "textAlign") {
        this.canvasRef.handlers.set(changedKey, Object.keys(changedValue)[0]);
        return;
      }
      if (changedKey === "trigger") {
        const trigger = Object.assign(
          {},
          defaultOptions.trigger,
          allValues.trigger
        );
        this.canvasRef.handlers.set(changedKey, trigger);
        return;
      }
      this.canvasRef.handlers.set(changedKey, changedValue);
    },
    onChangeWokarea: (changedKey, changedValue, allValues) => {
      if (changedKey === "layout") {
        this.canvasRef.workareaHandlers.setLayout(changedValue);
        return;
      }
      if (changedKey === "file" || changedKey === "src") {
        this.canvasRef.workareaHandlers.setImage(changedValue);
        return;
      }
      if (changedKey === "width" || changedKey === "height") {
        this.canvasRef.handlers.originScaleToResize(
          this.canvasRef.workarea,
          allValues.width,
          allValues.height
        );
        this.canvasRef.canvas.centerObject(this.canvasRef.workarea);
        return;
      }
      this.canvasRef.workarea.set(changedKey, changedValue);
      this.canvasRef.canvas.requestRenderAll();
    },
    onTooltip: (ref, target) => {
      const value = Math.random() * 10 + 1;
      const { animations, styles } = this.state;
      // const { code } = target.trigger;
      // const compile = SandBox.compile(code);
      // const result = compile(value, animations, styles, target.userProperty);
      return (
        <div>
          <div>
            <div>
              <Button>{target.id}</Button>
            </div>
            <Badge count={value} />
          </div>
        </div>
      );
    },
    onLink: (canvas, target) => {
      const { link } = target;
      if (link.state === "current") {
        document.location.href = link.url;
        return;
      }
      window.open(link.url);
    },
    onContext: (ref, event, target) => {
      if ((target && target.id === "workarea") || !target) {
        const { layerX: left, layerY: top } = event;
        return (
          <Menu>
            <Menu.SubMenu
              key="add"
              style={{ width: 120 }}
              title={i18n.t("action.add")}
            >
              {this.transformList().map((item) => {
                const option = Object.assign({}, item.option, { left, top });
                const newItem = Object.assign({}, item, { option });
                return (
                  <Menu.Item style={{ padding: 0 }} key={item.name}>
                    {this.itemsRef.renderItem(newItem, false)}
                  </Menu.Item>
                );
              })}
            </Menu.SubMenu>
          </Menu>
        );
      }
      if (target.type === "activeSelection") {
        return (
          <Menu>
            <Menu.Item
              onClick={() => {
                this.canvasRef.handlers.toGroup();
              }}
            >
              {i18n.t("action.object-group")}
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                this.canvasRef.handlers.duplicate();
              }}
            >
              {i18n.t("action.clone")}
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                this.canvasRef.handlers.remove();
              }}
            >
              {i18n.t("action.delete")}
            </Menu.Item>
          </Menu>
        );
      }
      if (target.type === "group") {
        return (
          <Menu>
            <Menu.Item
              onClick={() => {
                this.canvasRef.handlers.toActiveSelection();
              }}
            >
              {i18n.t("action.object-ungroup")}
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                this.canvasRef.handlers.duplicate();
              }}
            >
              {i18n.t("action.clone")}
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                this.canvasRef.handlers.remove();
              }}
            >
              {i18n.t("action.delete")}
            </Menu.Item>
          </Menu>
        );
      }
      return (
        <Menu>
          <Menu.Item
            onClick={() => {
              this.canvasRef.handlers.duplicateById(target.id);
            }}
          >
            {i18n.t("action.clone")}
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              this.canvasRef.handlers.removeById(target.id);
            }}
          >
            {i18n.t("action.delete")}
          </Menu.Item>
        </Menu>
      );
    },
  };

  handlers = {
    // get all of objects for the current page
    getCurrentCanvasObjects: () => {
      // get all of object for the current canvas
      const objects = this.canvasRef.handlers
        .exportJSON()
        .objects.filter((obj) => {
          if (!obj.id) {
            return false;
          }
          return true;
        });
      const { animations, styles, dataSources, workarea } = this.state;
      const exportDatas = {
        workarea,
        objects,
        animations,
        styles,
        dataSources,
      };

      return exportDatas;
    },
    // update current Object into dataObjects state for the current page
    updateCurrentToAllObjects: () => {
      const exportDatas = this.handlers.getCurrentCanvasObjects();
      let { dataObjects } = this.state;
      const { currentPage } = this.props;
      // store the current page object into state
      dataObjects = {
        ...dataObjects,
        [currentPage]: exportDatas,
      };
      return dataObjects;
    },
    // clear the current canvas and switch to another canvas with the objects
    loadOtherCanvas: (pageToBeChanged, objectToBe = {}) => {
      // clear all of objects in the canvas
      this.canvasRef.handlers.clear();
      // load all of objects picked from dataObjects state for the page to be changed
      this.canvasRef.handlers.importJSON(objectToBe.objects || {});
      // call back to pdf viewer for the page changing
      this.props.onChangePage(pageToBeChanged);
    },
    initialObjectFromConfig: (dataObjects, pageToBeChanged) => {
      const workarea = this.getWorkarea(this.props);
      // get all of object for the page to be changed
      const current = dataObjects[pageToBeChanged] || {
        animations: [],
        styles: [],
        dataSources: [],
        objects: [],
        workarea,
      };

      this.setState(
        {
          ...current,
        },
        () => {
          // clear all of objects in the canvas
          this.canvasRef.handlers.clear();
          // load all of objects picked from dataObjects state for the page to be changed
          this.canvasRef.handlers.importJSON(current.objects || {});
        }
      );
    },
    onChangePage: (pageToBeChanged) => {
      const dataObjects = this.handlers.updateCurrentToAllObjects();
      const workarea = this.getWorkarea(this.props);
      // get all of object for the page to be changed
      const prevData = dataObjects[pageToBeChanged] || {
        animations: [],
        styles: [],
        dataSources: [],
        objects: [],
        workarea,
      };

      this.setState(
        {
          ...prevData,
          dataObjects,
        },
        () => {
          this.handlers.loadOtherCanvas(pageToBeChanged, prevData);
        }
      );
    },
    onChangePreview: (checked) => {
      this.setState(
        {
          preview: typeof checked === "object" ? false : checked,
        },
        () => {
          if (this.state.preview) {
            const data = this.canvasRef.handlers
              .exportJSON()
              .objects.filter((obj) => {
                if (!obj.id) {
                  return false;
                }
                return true;
              });
            this.preview.canvasRef.handlers.importJSON(data);
            return;
          }
          this.preview.canvasRef.handlers.clear(true);
        }
      );
    },
    onProgress: (progress) => {
      this.setState({
        progress,
      });
    },
    onPDFX: () => {},
    onImport: (files) => {
      if (files) {
        this.showLoading(true);
        setTimeout(() => {
          const reader = new FileReader();
          reader.onprogress = (e) => {
            if (e.lengthComputable) {
              const progress = parseInt((e.loaded / e.total) * 100, 10);
              this.handlers.onProgress(progress);
            }
          };
          reader.onload = (e) => {
            const { objects, animations, styles, dataSources } = JSON.parse(
              e.target.result
            );
            this.setState({
              animations,
              styles,
              dataSources,
            });
            if (objects) {
              this.canvasRef.handlers.clear(true);
              const data = objects.filter((obj) => {
                if (!obj.id) {
                  return false;
                }
                return true;
              });

              this.canvasRef.handlers.importJSON(JSON.stringify(data));
            }
          };
          reader.onloadend = () => {
            this.showLoading(false);
          };
          reader.onerror = () => {
            this.showLoading(false);
          };
          reader.readAsText(files[0]);
        }, 500);
      }
    },
    onUpload: () => {
      const inputEl = document.createElement("input");
      inputEl.accept = ".json";
      inputEl.type = "file";
      inputEl.hidden = true;
      inputEl.onchange = (e) => {
        this.handlers.onImport(e.target.files);
      };
      document.body.appendChild(inputEl); // required for firefox
      inputEl.click();
      inputEl.remove();
    },
    // export all of object for the page and pdf buffer string
    onExport: () => {
      this.showLoading(true);
      const data = this.handlers.updateCurrentToAllObjects();
      // toBeExport = JSON.stringify(toBeExport);
      // convert to base64
      // if (this.props.encrypt) {
      //     toBeExport = window.btoa(encodeURIComponent(toBeExport));
      // }
      let { file } = this.props;
      file = `${(file.name || "default").replace(/\.[^/.]+$/, "")}.json`;
      const anchorEl = document.createElement("a");
      anchorEl.href = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data, null, "\t")
      )}`;
      anchorEl.download = file;
      document.body.appendChild(anchorEl); // required for firefox
      anchorEl.click();
      anchorEl.remove();
      this.showLoading(false);
    },
    onDownload: () => {
      this.showLoading(true);
      const objects = this.canvasRef.handlers
        .exportJSON()
        .objects.filter((obj) => {
          if (!obj.id) {
            return false;
          }
          return true;
        });
      const { animations, styles, dataSources } = this.state;
      const exportDatas = {
        objects,
        animations,
        styles,
        dataSources,
      };
      const anchorEl = document.createElement("a");
      let { file } = this.props;
      file = `${(file.name || "default").replace(/\.[^/.]+$/, "")}.pdfx`;
      anchorEl.href = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(exportDatas, null, "\t")
      )}`;
      anchorEl.download = `${this.canvasRef.workarea.name || "sample"}.json`;
      document.body.appendChild(anchorEl); // required for firefox
      anchorEl.click();
      anchorEl.remove();
      this.showLoading(false);
    },
    onChangeAnimations: (animations) => {
      if (!this.state.editing) {
        this.changeEditing(true);
      }
      this.setState({
        animations,
      });
    },
    onChangeStyles: (styles) => {
      if (!this.state.editing) {
        this.changeEditing(true);
      }
      this.setState({
        styles,
      });
    },
    onChangeDataSources: (dataSources) => {
      if (!this.state.editing) {
        this.changeEditing(true);
      }
      this.setState({
        dataSources,
      });
    },
    onSaveImage: () => {
      this.canvasRef.handlers.saveCanvasImage();
    },
  };

  getWorkarea(props) {
    const { page, percentage } = props;
    let width = 900;
    let height = 600;
    if (page && page.getViewport) {
      const workarea = page.getViewport(percentage || 1);
      width = workarea.width;
      height = workarea.height;
    }
    return {
      width,
      height,
    };
  }

  transformList = () => {
    return Object.values(this.state.descriptors).reduce(
      (prev, curr) => prev.concat(curr),
      []
    );
  };

  showLoading = (loading) => {
    this.setState({
      loading,
    });
  };

  changeEditing = (editing) => {
    this.setState({
      editing,
    });
  };

  render() {
    const {
      preview,
      selectedItem,
      canvasRect,
      zoomRatio,
      loading,
      progress,
      animations,
      styles,
      dataSources,
      editing,
      descriptors,
      workarea,
    } = this.state;
    const {
      onAdd,
      onRemove,
      onSelect,
      onModified,
      onChange,
      onZoom,
      onTooltip,
      onLink,
      onContext,
    } = this.canvasHandlers;
    const {
      onChangePreview,
      onDownload,
      onExport,
      onPDFX,
      onUpload,
      onChangeAnimations,
      onChangeStyles,
      onChangeDataSources,
      onSaveImage,
    } = this.handlers;
    let { page, afterZoom, percentage, readOnly } = this.props;
    // let width = 600;
    // let height = 900;

    // if (page && page.getViewport) {
    //     page = page.getViewport(percentage || 1);
    //     width = page.width;
    //     height = page.height;
    // }

    // const action = (
    //   <React.Fragment>
    //     <CommonButton
    //       className="rde-action-btn"
    //       shape="circle"
    //       icon="file-download"
    //       disabled={!editing}
    //       tooltipTitle={i18n.t("action.download")}
    //       onClick={onDownload}
    //       tooltipPlacement="bottomRight"
    //     />
    //     {editing ? (
    //       <Popconfirm
    //         title={i18n.t("imagemap.imagemap-editing-confirm")}
    //         okText={i18n.t("action.ok")}
    //         cancelText={i18n.t("action.cancel")}
    //         onConfirm={onUpload}
    //         placement="bottomRight"
    //       >
    //         <CommonButton
    //           className="rde-action-btn"
    //           shape="circle"
    //           icon="file-upload"
    //           tooltipTitle={i18n.t("action.upload")}
    //           tooltipPlacement="bottomRight"
    //         />
    //       </Popconfirm>
    //     ) : (
    //       <CommonButton
    //         className="rde-action-btn"
    //         shape="circle"
    //         icon="file-upload"
    //         tooltipTitle={i18n.t("action.upload")}
    //         tooltipPlacement="bottomRight"
    //         onClick={onUpload}
    //       />
    //     )}
    //   </React.Fragment>
    // );
    const content = (
      <div className="rde-editor">
        <ImageMapItems
          ref={(c) => {
            this.itemsRef = c;
          }}
          canvasRef={this.canvasRef}
          descriptors={descriptors}
          readOnly={readOnly}
        />
        <div className="rde-editor-canvas-container">
          {!!this.state.selectedItem && !readOnly && (
            <div className="rde-editor-header-toolbar">
              <ImageMapHeaderToolbar
                onDownload={onExport}
                onImport={onPDFX}
                canvasRef={this.canvasRef}
                selectedItem={selectedItem}
                onSelect={onSelect}
              />
            </div>
          )}
          <div
            ref={(c) => {
              this.container = c;
            }}
            className="rde-editor-canvas"
          >
            <Canvas
              ref={(c) => {
                this.canvasRef = c;
              }}
              canvasOption={{
                width: workarea.width,
                height: workarea.height,
                backgroundColor: "rgba(210, 210, 210, 0)",
                selection: true,
              }}
              minZoom={30}
              defaultOptions={defaultOptions}
              propertiesToInclude={propertiesToInclude}
              totalPage={this.props.totalPage}
              currentPage={this.props.currentPage}
              onChangePage={this.handlers.onChangePage}
              onModified={onModified}
              onAdd={onAdd}
              afterAdd={this.props.onCreateObject}
              onRemove={onRemove}
              onSelect={onSelect}
              onZoom={onZoom}
              onTooltip={onTooltip}
              onLink={onLink}
              onContext={onContext}
            />
          </div>
          <div className="rde-editor-footer-toolbar">
            <ImageMapFooterToolbar
              canvasRef={this.canvasRef}
              preview={preview}
              onChangePreview={onChangePreview}
              zoomRatio={zoomRatio}
              firstPage={this.props.firstPage}
              lastPage={this.props.lastPage}
              totalPage={this.props.totalPage}
              currentPage={this.props.currentPage}
              onChangePage={this.handlers.onChangePage}
            />
          </div>
        </div>
        <ImageMapConfigurations
          canvasRef={this.canvasRef}
          onChange={onChange}
          onDownload={onExport}
          selectedItem={selectedItem}
          onChangeAnimations={onChangeAnimations}
          onChangeStyles={onChangeStyles}
          onChangeDataSources={onChangeDataSources}
          animations={animations}
          styles={styles}
          readOnly={readOnly}
          dataSources={dataSources}
        />
      </div>
    );
    return (
      <div className="rde-main">
        <Container content={content} loading={loading} className="" />
      </div>
    );
  }
}

export default ImageMapEditor;
