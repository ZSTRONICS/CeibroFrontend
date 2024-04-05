import type { MouseTracker, Rect, Viewer } from "openseadragon";
import OpenSeadragon from "openseadragon";
import React, { useEffect, useRef, useState } from "react";

export type AnnotationInit = {
  removable?: any;
  resizable?: any;
  id: string;
  location: [x: number, y: number, w: number, h: number];
};

export type NotifyMessage = {
  type:
    | "host:click"
    | "host:dragEnd"
    | "removeHandle:click"
    | "resizeHandle:dragEnd";
  id: string;
};

export type AnnotationActivateOptions = {
  selectable: boolean;
  removable: boolean;
  draggable: boolean;
  resizable: boolean;
};

const BASE_CLASSNAME = "osdasl";

const Annotation: React.FC<{
  viewer: Viewer;
  port: MessagePort;
  annotationInit: AnnotationInit;
}> = ({ viewer, port, annotationInit }) => {
  const [selected, setSelected] = useState(false);
  const [location, setLocation] = useState<Rect>(
    new OpenSeadragon.Rect(...annotationInit.location)
  );
  const hostElementRef = useRef<HTMLDivElement>(null);
  const mouseTrackersRef = useRef<Map<string, MouseTracker>>(new Map());

  useEffect(() => {
    const notify = (type: NotifyMessage["type"]) =>
      port.postMessage({ type, id: annotationInit.id });
    const overlay = viewer.getOverlayById(annotationInit.id);

    const mouseTrackers = new Map<string, MouseTracker>();

    const handleDrag = (ev: any) => {
      hostElementRef.current?.classList.add("-dragging");
      const delta = viewer.viewport.deltaPointsFromPixels(ev.delta);
      const loc = overlay.getBounds(viewer.viewport);
      const nextLoc = loc.translate(delta);
      setLocation(nextLoc);
      if (hostElementRef.current) {
        viewer.updateOverlay(hostElementRef.current, nextLoc);
      }
    };

    const handleDragEnd = () => {
      hostElementRef.current?.classList.remove("-dragging");
      notify("host:dragEnd");
    };

    if (hostElementRef.current) {
      mouseTrackers.set(
        "overlay",
        new OpenSeadragon.MouseTracker({
          element: hostElementRef.current,
          clickHandler: () => notify("host:click"),
          dragHandler: handleDrag,
          dragEndHandler: handleDragEnd,
        })
      );
    }

    if (annotationInit.removable) {
      const removeHandle = document.createElement("div");
      removeHandle.className = `${BASE_CLASSNAME}-remove-handle`;
      hostElementRef.current?.appendChild(removeHandle);
      mouseTrackers.set(
        "removeHandle",
        new OpenSeadragon.MouseTracker({
          element: removeHandle,
          clickHandler: () => notify("removeHandle:click"),
        })
      );
    }

    if (annotationInit.resizable) {
      // Implement resize handles logic
    }

    mouseTrackersRef.current = mouseTrackers;
    if (hostElementRef.current) {
      viewer.addOverlay({
        element: hostElementRef.current,
        location: location.getTopLeft(),
        width: location.width,
        height: location.height,
      });
    }

    return () => {
      viewer.removeOverlay(hostElementRef.current!);
      mouseTrackers.forEach((tracker) => tracker.destroy());
    };
  }, []);

  useEffect(() => {
    if (hostElementRef.current) {
      hostElementRef.current.id = annotationInit.id;
      hostElementRef.current.className = `${BASE_CLASSNAME}-host ${
        selected ? "-selected" : ""
      }`;
    }
  }, [selected]);

  const toJSON = (): AnnotationInit => {
    return {
      id: annotationInit.id,
      removable: false,
      resizable: false,
      location: [location.x, location.y, location.width, location.height],
    };
  };

  const select = (bool: boolean) => {
    setSelected(bool);
  };

  const activate = (options: AnnotationActivateOptions) => {
    // Implement activation logic
  };

  return <div ref={hostElementRef}></div>;
};

export default Annotation;
