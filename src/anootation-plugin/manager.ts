import type { CanvasClickEvent, CanvasKeyEvent, Viewer } from "openseadragon";
import React, { useEffect } from "react";
import { AnnotationInit, NotifyMessage } from "./annotation";

type AnnotationAddedEvent = {
  type: "annotation:added";
  data: AnnotationInit;
};

type AnnotationUpdatedEvent = {
  type: "annotation:updated";
  data: AnnotationInit;
};
type AnnotationRemovedEvent = {
  type: "annotation:removed";
  data: Pick<AnnotationInit, "id">;
};
type AnnotationSelectedEvent = {
  type: "annotation:selected";
  data: Pick<AnnotationInit, "id">;
};
type AnnotationDeselectedEvent = {
  type: "annotation:deselected";
  data: null;
};
export type AnnotationEvent =
  | AnnotationAddedEvent
  | AnnotationRemovedEvent
  | AnnotationUpdatedEvent
  | AnnotationSelectedEvent
  | AnnotationDeselectedEvent;

const defaultManagerOptions = {
  channelName: "osdasl",
};
const defaultAnnotationOptions = {
  activate: {
    selectable: true,
    removable: true,
    draggable: true,
    resizable: true,
  },
};

interface AnnotationManagerProps {
  viewer: Viewer;
  options?: { channelName?: string };
}

const AnnotationManager: React.FC<AnnotationManagerProps> = ({
  viewer,
  options = {},
}) => {
  const {
    channelName = defaultManagerOptions.channelName,
  } = options;

  const annotationOptionsRef = React.useRef(defaultAnnotationOptions);
  const annotationsRef = React.useRef<Map<string, any>>(new Map());
  const disposersRef = React.useRef<(() => void)[]>([]);
  const notifyRef = React.useRef<(event: AnnotationEvent) => void>(() => { });

  useEffect(() => {
    const events = new BroadcastChannel(channelName);
    notifyRef.current = (event) => events.postMessage(event);

    return () => events.close();
  }, [channelName]);

  const onAnnotationNotifyMessage = ({
    data: { type, id },
  }: {
    data: NotifyMessage;
  }) => {
    const annotation = annotationsRef.current.get(id);
    if (!annotation) {
      return;
    }

    switch (type) {
      case "removeHandle:click": {
        if (annotation.selected)
          notifyRef.current({
            type: "annotation:deselected",
            data: null,
          });

        deleteAnnotation(id);
        notifyRef.current({
          type: "annotation:removed",
          data: annotation.toJSON(),
        });
        break;
      }
      case "host:click": {
        selectAnnotation(id);
        notifyRef.current({
          type: "annotation:selected",
          data: { id },
        });
        break;
      }
      case "resizeHandle:dragEnd": {
        notifyRef.current({
          type: "annotation:updated",
          data: annotation.toJSON(),
        });
        break;
      }
      case "host:dragEnd": {
        notifyRef.current({
          type: "annotation:updated",
          data: annotation.toJSON(),
        });
        break;
      }
    }
  };

  const addAnnotation = (init: AnnotationInit) => {
    console.log("adding annotation  ", init);
    // const annotation = new Annotation(
    //   {
    //     viewer: viewer,
    //     port: channel.port2,
    //   },
    //   init
    // )
    //   .render()
    //   .activate(annotationOptionsRef.current.activate);

    // annotationsRef.current.set(init.id, annotation);
    // return annotation;
  };

  const deleteAnnotation = (targetId: string) => {
    const annotation = annotationsRef.current.get(targetId);
    if (!annotation) {
      return;
    }

    annotationsRef.current.delete(targetId);
    annotation.destroy();
  };

  const selectAnnotation = (targetId: string | null) => {
    for (const [id, annotation] of annotationsRef.current) {
      annotation.select(id === targetId);
    }
  };

  const onViewerCanvasClick = (ev: CanvasClickEvent) => {
    if (!ev.quick) {
      return;
    }

    // Just deselect if any annotation is selected
    if (
      [...annotationsRef.current.values()].some((a) => a.selected)
    ) {
      selectAnnotation(null);
      notifyRef.current({
        type: "annotation:deselected",
        data: null,
      });
      return;
    }

    // Otherwise add new annotation and select it
    const id = `osdasl_${Date.now()}`;
    const point = viewer.viewport.pointFromPixel(ev.position);
    const location: AnnotationInit["location"] = [
      point.x - 0.02, // centering
      point.y - 0.02, // centering
      0.04,
      0.04,
    ];

    const annotation: any = addAnnotation({ id, location });
    notifyRef.current({
      type: "annotation:added",
      data: annotation,
    });

    selectAnnotation(id);
    notifyRef.current({
      type: "annotation:selected",
      data: { id },
    });
  };

  const onViewerCanvasKey = (ev: CanvasKeyEvent | any) => {
    switch (ev.originalEvent.key) {
      case "Backspace":
      case "Delete": {
        for (const [id, annotation] of annotationsRef.current) {
          if (annotation.selected) {
            notifyRef.current({
              type: "annotation:deselected",
              data: null,
            });

            deleteAnnotation(id);
            notifyRef.current({
              type: "annotation:removed",
              data: { id },
            });
          }
        }
        ev.originalEvent.preventDefault();
        break;
      }
      case "Escape": {
        selectAnnotation(null);
        notifyRef.current({
          type: "annotation:deselected",
          data: null,
        });
        break;
      }
    }
  };

  useEffect(() => {
    viewer.addHandler("canvas-click", onViewerCanvasClick);
    viewer.addHandler("canvas-key", onViewerCanvasKey);

    return () => {
      viewer.removeHandler("canvas-click", onViewerCanvasClick);
      viewer.removeHandler("canvas-key", onViewerCanvasKey);
    };
  }, [viewer]);

  return null; // or whatever you want to return as JSX
};

export default AnnotationManager;
