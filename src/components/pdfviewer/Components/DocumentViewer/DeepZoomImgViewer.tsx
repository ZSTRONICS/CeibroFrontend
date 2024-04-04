import { Drawing } from "constants/interfaces";
import { debounce } from "lodash";
import { default as OpenSeaDragon } from "openseadragon";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { docsAction } from "redux/action";
import { isValidURL } from "utills/common";
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
  selectedDrawing, // navTo,
}: {
  imageToOpen?: RemoteDZISource;
  selectedDrawing: Drawing;
}) {
  const viewerRef = useRef<OpenSeaDragon.Viewer | undefined>(undefined);
  const dispatch = useDispatch();
  const [panningAllowed, setPanningAllowed] = useState(true);
  let panningTimeoutRef: any = useRef(null);
  const [image, setImage] = useState<
    RemoteDZISource | LocalDZISource | undefined
  >({
    dziURL: selectedDrawing?.dziFileURL,
    filesURL: selectedDrawing?.dziTileURL,
  });
  const [markers, setMarkers] = useState<
    { id: string; x: number; y: number }[]
  >([
    // {
    //   id: "overlay1712142519839",
    //   x: 0.5938,
    //   y: 0.2856,
    // },
  ]);

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

  // set initial viewport
  let initialNav: NavCoordinates | null = null;

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
      const viewer = OpenSeaDragon({
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

      viewer.addHandler("pan", updateHashRoute);
      viewer.addHandler("zoom", updateHashRoute);
      viewerRef.current = viewer;
    }
    setImage(imageToOpen);
  }, []);

  useEffect(() => {
    if (viewerRef && viewerRef.current && panningAllowed) {
      const viewer = viewerRef.current;
      const canvasClickHandler = (event: any) => {
        const webPoint = event.position;
        // Convert that to viewport coordinates, the lingua franca of OpenSeadragon coordinates.
        const viewportPoint = viewer.viewport.pointFromPixel(webPoint);

        setMarkers([
          ...markers,
          {
            id: "overlay" + Date.now(),
            x: parseFloat(viewportPoint.x.toFixed(4)),
            y: parseFloat(viewportPoint.y.toFixed(4)),
          },
        ]);
        viewer.addOverlay({
          element: createMarkerElement(), // Function to create a marker element
          location: viewportPoint, // Position of the marker
          placement: OpenSeaDragon.Placement.CENTER, // Placement of the marker
        });
      };
      viewer.addHandler("canvas-click", canvasClickHandler);
      // Cleanup event handler on component unmount
      return () => {
        viewer.removeHandler("canvas-click", canvasClickHandler);
      };
    }
  }, [viewerRef, panningAllowed]);

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = viewerRef.current;

      const zoomHandler = function () {
        const currentMarkers = markers.map((marker) => {
          const viewportPoint = viewer.viewport.pixelFromPoint(
            new OpenSeaDragon.Point(marker.x, marker.y),
            true
          );
          return {
            ...marker,
            x: viewportPoint.x,
            y: viewportPoint.y,
          };
        });
        setMarkers(currentMarkers);
      };

      viewer.addHandler("zoom", zoomHandler);

      return () => {
        viewer.removeHandler("zoom", zoomHandler);
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

  const createMarkerElement = () => {
    const marker = document.createElement("div");
    marker.className = "marker"; // Add marker CSS class
    // You can customize marker appearance here
    marker.style.width = "10px";
    marker.style.height = "10px";
    marker.style.backgroundColor = "red";
    marker.style.borderRadius = "50%";
    return marker;
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
      {/* <SquareButton
        className={style.homeButton}
        id={HOME_BUTTON_ID}
        icon="home"
      />
      {!imageToOpen && (
        <FileMenu setImageCallback={setImage} className={style.menuButton} />
      )}
      <SquareButton
        className={style.fullscreenButton}
        id={FULLSCREEN_BUTTON_ID}
        icon={!isFullscreen ? "fullscreen" : "exitFullscreen"}
      /> */}
    </div>
  );
}

export default DeepZoomImgViewer;
