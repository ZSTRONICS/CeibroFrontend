import { Button } from "@mui/material";
import { CustomStack } from "components/CustomTags";
import CustomModal from "components/Modal";
import { Drawing, PinData } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import _, { debounce } from "lodash";
import OpenSeadragon, {
  CanvasClickEvent,
  default as OpenSeaDragon,
} from "openseadragon";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { docsAction } from "redux/action";
import { isValidURL, openFormInNewWindow } from "utills/common";
import PinVewer from "./PinVewer";
import ZoomButton from "./ZoomButtons/ZoomButton";

export interface LocalDZISource {
  dziHandle: FileSystemFileHandle;
  filesHandle: FileSystemDirectoryHandle;
}

export interface RemoteDZISource {
  dziURL: string;
  filesURL?: string;
  title?: string;
  description?: string;
}
interface XMLDZIObject {
  Image: {
    xmlns: string | null;
    Url?: string | null;
    Format: string | null;
    Overlap: number | null;
    TileSize: number | null;
    Size: {
      Height: number | null;
      Width: number | null;
    };
  };
}
interface NavCoordinates {
  x?: number;
  y?: number;
  level?: number;
}

const HOME_BUTTON_ID = "homeButton";
const ZOOM_IN_BUTTON_ID = "zoomInButton";
const ZOOM_OUT_BUTTON_ID = "zoomOutButton";
const FULLSCREEN_BUTTON_ID = "fullscreenButton";

const DEFAULT_OSD_SETTINGS: OpenSeaDragon.Options = {
  //homeFillsViewer: true,
  minZoomLevel: 0.65,
  defaultZoomLevel: 0.45,
  zoomPerClick: 1.75,
  zoomPerSecond: 4,
  zoomPerScroll: 1.175,

  showNavigator: true,
  navigatorPosition: "TOP_RIGHT",
  navigatorBackground: "#fff",
  navigatorDisplayRegionColor: "#ff0000",
  navigatorSizeRatio: 0.15,
};

function getAttrOrDie(el: Element, attrName: string) {
  const res = el.getAttribute(attrName);
  if (res === null) throw new Error(`No such attribute ${attrName}`);
  return res;
}

function parseOrDie(numeric: string | undefined) {
  const res = Number(numeric);
  if (isNaN(res)) throw new Error(`"${numeric}" cannot be parsed as Number`);
  return res;
}

// parses XML-format dzi string, and translates it into an object
function parseXMLDziString(dziString: string): XMLDZIObject {
  const xml = new DOMParser().parseFromString(dziString, "text/xml");
  const imageTags = xml.getElementsByTagName("Image");
  const sizeTags = xml.getElementsByTagName("Size");

  if (imageTags.length < 1 || sizeTags.length < 1) {
    throw new Error("Bad XML schema");
  }

  const imageTag = imageTags[0];
  const sizeTag = sizeTags[0];

  return {
    Image: {
      xmlns: getAttrOrDie(imageTag, "xmlns"),
      Format: getAttrOrDie(imageTag, "Format"),
      Overlap: parseOrDie(getAttrOrDie(imageTag, "Overlap") ?? undefined),
      TileSize: parseOrDie(getAttrOrDie(imageTag, "TileSize") ?? undefined),
      Size: {
        Height: parseOrDie(getAttrOrDie(sizeTag, "Height") ?? undefined),
        Width: parseOrDie(getAttrOrDie(sizeTag, "Width") ?? undefined),
      },
    },
  };
}

function DeepZoomImgViewer({
  imageToOpen,
  selectedDrawing,
  allPins,
}: {
  imageToOpen?: RemoteDZISource;
  selectedDrawing: Drawing;
  allPins?: PinData[];
}) {
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const viewerRef = useRef<OpenSeaDragon.Viewer | undefined>(undefined);
  const dispatch = useDispatch();
  const annotationsRef = React.useRef<Map<string, any>>(new Map());
  const [panningAllowed, setPanningAllowed] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);
  let panningTimeoutRef: any = useRef(null);

  const [image, setImage] = useState<
    RemoteDZISource | LocalDZISource | undefined
  >({
    dziURL: selectedDrawing?.dziFileURL,
    filesURL: selectedDrawing?.dziTileURL,
  });

  const transformedPins = _.chain(allPins)
    .filter((pin) => pin.drawingId === selectedDrawing._id)
    .map((pin) => {
      return {
        x: pin.x_coord,
        y: pin.y_coord,
        taskUid: pin.taskData?.taskUID || "",
        _id: pin._id || "",
        rootState: pin.taskData?.rootState || "",
      };
    })
    .value();
  // console.log("transformedPins", transformedPins);
  const [markers, setMarkers] = useState<any[]>(transformedPins);

  useEffect(() => {
    if (!isValidURL(selectedDrawing.dziFileURL)) {
      dispatch(
        docsAction.getDrawingFileDZIUrls({
          other: selectedDrawing._id,
        })
      );
    }

    setImage({
      dziURL: selectedDrawing.dziFileURL,
      filesURL: selectedDrawing.dziTileURL,
    });
  }, [selectedDrawing.fileUrl]);

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // console.log("markers", markers);
  // open image by URL
  const openRemoteImage = async (
    viewer: OpenSeaDragon.Viewer,
    image: RemoteDZISource
  ) => {
    const res = await fetch(image.dziURL);
    if (!res.ok)
      throw new Error(
        `Error ${res.status} requesting .dzi file: ${res.statusText}`
      );
    const xml = await res.text();

    let filesURL =
      // If no "_files" URL specified, assume "name_files" for "name.dzi"
      image.filesURL?.trim() ??
      (() => {
        if (!image.dziURL.match(/\.dzi\/?\s*$/i)) {
          throw new Error("Cannot infer tile URL from .dzi URL!");
        }
        return image.dziURL.replace(/\.dzi\/?\s*$/i, "_files/");
      })();

    if (!filesURL.endsWith("/")) {
      filesURL += "/";
    }

    let dzi = parseXMLDziString(xml);
    dzi.Image.Url = filesURL;

    // console.log(`opening remote image with dzi spec ${JSON.stringify(dzi)}`);

    viewer.open(dzi);
  };

  useEffect(() => {
    // toggle fullscreen button appearance when fullscreen
    let fullscreenListener = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", fullscreenListener);

    return () => {
      console.log("cleaning up.");
      document.removeEventListener("fullscreenchange", fullscreenListener);
    };
  }, []);

  useEffect(() => {
    // Create the viewer on initial render.
    if (viewerRef.current === undefined) {
      // @ts-ignore
      OpenSeaDragon.setImageFormatsSupported({
        png: true,
        jpeg: true,
        jpg: true,
      });
      // only one viewer object is used throughout.
      const viewer: any = OpenSeaDragon({
        id: "osd-viewer",
        homeButton: HOME_BUTTON_ID,
        zoomInButton: ZOOM_IN_BUTTON_ID,
        zoomOutButton: ZOOM_OUT_BUTTON_ID,
        fullPageButton: FULLSCREEN_BUTTON_ID,
        ...DEFAULT_OSD_SETTINGS,
        gestureSettingsMouse: { clickToZoom: false },
        overlays: markers,
      });
      // nav to initial coordinates once.
      viewer.addOnceHandler("open", () => {
        let navTo: NavCoordinates | undefined = undefined;
        if (window.location.hash.length > 0) {
          const coords = window.location.hash.substring(2).split("/");

          if (coords.length === 3) {
            navTo = {
              x: parseOrDie(coords[0]),
              y: parseOrDie(coords[1]),
              level: parseOrDie(coords[2]),
            };
          }
        }

        // console.log(`initial navto ${JSON.stringify(navTo)}`);

        if (navTo?.x !== undefined && navTo?.y !== undefined) {
          console.log(`panning to ${JSON.stringify(navTo)}`);
          viewerRef.current?.viewport.panTo(
            new OpenSeaDragon.Point(navTo.x, navTo.y),
            true
          );
        }
        if (navTo?.level !== undefined) {
          viewerRef.current?.viewport.zoomTo(navTo.level, undefined, true);
        }
      });

      // updates route with image coordinates
      const updateHashRoute = debounce(() => {
        // console.log("updating coords.");
        const center = viewer.viewport.getCenter();
        const zoom = viewer.viewport.getZoom();

        const navHash =
          "/" +
          center.x.toFixed(4) +
          "/" +
          center.y.toFixed(4) +
          "/" +
          zoom.toFixed(4);

        // prevent navigation loop, or updating when no image
        if (navHash !== window.location.hash.substring(1) && viewer.isOpen()) {
          window.location.hash = navHash;
        }
      }, 500);

      viewerRef.current = viewer;
      viewer.addHandler("pan", updateHashRoute);
      viewer.addHandler("zoom", updateHashRoute);
    }
    setImage(imageToOpen);
  }, []);

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = viewerRef.current;
      setMarkers(transformedPins);
      transformedPins.forEach((marker) => {
        // let viewportPxToPoint = viewer.viewport.pixelFromPoint(
        //   new OpenSeadragon.Point(marker.x, marker.y)
        // );
        const viewportPoint =
          viewer.viewport.viewerElementToViewportCoordinates(
            new OpenSeadragon.Point(marker.x, marker.y)
          );
        // console.log("viewportPxToPoint", viewportPxToPoint, viewportPoint);
        const newMarker = {
          id: marker._id,
          element: createMarkerElement(String(Date.now())),
          location: viewportPoint,
          placement: OpenSeaDragon.Placement.CENTER,
          checkResize: false,
        };
        // return viewer.addOverlay(newMarker);
      });
      // viewer.forceRedraw();
    }
  }, [transformedPins?.length, viewerRef]);

  const handleClose = () => {
    if (viewerRef.current) {
      const viewer = viewerRef.current;
      viewer.removeOverlay(selectedMarker.element);
      viewer.forceRedraw();
      setSelectedMarker(null);
      closeModal();
    }
  };

  useEffect(() => {
    if (viewerRef && viewerRef.current && panningAllowed) {
      const canvasClickHandler = (event: CanvasClickEvent) => {
        if (!event.quick) {
          return;
        }
        const markerId = "overlay" + Date.now();
        const viewportPoint = viewer.viewport.pointFromPixel(event.position);
        const newMarker = {
          id: markerId,
          element: createMarkerElement(String(Date.now())),
          location: viewportPoint,
          placement: OpenSeaDragon.Placement.CENTER,
          checkResize: false,
        };
        openModal();
        annotationsRef.current.set(markerId, newMarker);
        setMarkers([...markers, newMarker]);
        setSelectedMarker(newMarker);
        // viewer.addOverlay(newMarker);
      };
      const viewer = viewerRef.current;
      // viewer.addHandler("canvas-click", canvasClickHandler);
      // Cleanup event handler on component unmount
      return () => {
        viewer.removeHandler("canvas-click", canvasClickHandler);
      };
    }
  }, [viewerRef, panningAllowed]);

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = viewerRef.current;
      const updateOverlayPositions = () => {
        const zoom = viewer.viewport.getZoom(true);
        const bounds = viewer.viewport.getBounds(true);
        markers.forEach((marker) => {
          const annotation = annotationsRef.current.get(marker.id);
          const transformedX = (marker.x - bounds.x) * zoom;
          const transformedY = (marker.y - bounds.y) * zoom;
          // console.log(`annotation`, annotation);
          const element = document.getElementById(marker.id);
          if (element) {
            const viewportPoint = viewer.viewport.pixelFromPoint(
              new OpenSeaDragon.Point(transformedX, transformedY)
            );
            viewer.updateOverlay(
              element,
              viewportPoint,
              OpenSeaDragon.Placement.CENTER
            );
          }
        });
      };

      viewer.addHandler("zoom", updateOverlayPositions);

      return () => {
        viewer.removeHandler("zoom", updateOverlayPositions);
      };
    }
  }, [viewerRef, markers]);

  useEffect(() => {
    // Initialize pan event handler when viewerRef is available
    if (viewerRef.current) {
      const viewer = viewerRef.current;
      const panHandler = function () {
        // Disable panningAllowed when panning starts
        setPanningAllowed(false);

        // Clear any existing timeout
        if (panningTimeoutRef.current) {
          clearTimeout(panningTimeoutRef.current);
        }

        // Set a timeout to enable panningAllowed after a delay
        panningTimeoutRef.current = setTimeout(() => {
          setPanningAllowed(true);
        }, 300); // Adjust the delay as needed
      };

      viewer.addHandler("pan", panHandler);
      // Cleanup event handler on component unmount
      return () => {
        viewer.removeHandler("pan", panHandler);
      };
    }
  }, [viewerRef]);

  // update image state when prop is updated
  // never actually used in this application, I think?
  useEffect(() => {
    setImage(imageToOpen);
  }, [imageToOpen]);
  // open image when state is changed
  useEffect(() => {
    const viewer = viewerRef.current;
    if (image && viewer) {
      // console.log("opening image.");
      if ("dziURL" in image) openRemoteImage(viewer, image);
    } else {
      viewer?.close();
    }
  }, [image]);

  const createMarkerElement = (markerId: string) => {
    const markerElement = document.createElement("div");
    markerElement.className = "marker";
    markerElement.setAttribute("id", markerId);
    return markerElement;
  };

  // console.log("markers", markers);
  return (
    <div
      id="osd-viewer"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <ZoomButton
        idZoomIn={ZOOM_IN_BUTTON_ID}
        idZoomOut={ZOOM_OUT_BUTTON_ID}
        homeBtnId={HOME_BUTTON_ID}
      />
      <PinVewer markers={markers} />
      {isOpen && (
        <CustomModal
          maxWidth={"sm"}
          showFullWidth={true}
          showDivider={true}
          showCloseBtn={false}
          showTitleWithLogo={true}
          title="Select pin type"
          isOpen={isOpen}
          handleClose={handleClose}
          children={
            <CustomStack sx={{ gap: 1.2, justifyContent: "center", py: 1.25 }}>
              <Button
                sx={{ textTransform: "unset" }}
                variant="outlined"
                onClick={() => {
                  openFormInNewWindow("/create-new-task", "Create New Task");
                  handleClose();
                }}
              >
                New task
              </Button>
              <Button
                sx={{ textTransform: "unset" }}
                disabled
                variant="outlined"
              >
                Add image
              </Button>
            </CustomStack>
          }
        />
      )}
    </div>
  );
}

export default DeepZoomImgViewer;
