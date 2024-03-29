import { DZIAnnotaionManager } from "anootation-plugin";
import { debounce } from "lodash";
import OpenSeaDragon from "openseadragon";
import { useEffect, useRef, useState } from "react";
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
  animationTime: 0.1,
  showNavigator: true,
  // navigatorId: "osd-navigator",
  navigatorPosition: "TOP_RIGHT",
  navigatorBackground: "#fff",
  navigatorDisplayRegionColor: "#ff0000", //  "transparent",
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

function DZIViewerAnootation({
  imageToOpen, // navTo,
}: {
  imageToOpen?: RemoteDZISource;
  // navTo?: NavCoordinates;
}) {
  // DZI Annotaiton INITs

  const [annotations, setAnnotations] = useState<any>({});
  const [selected, setSelected] = useState<any>(null);
  const [draft, setDraft] = useState({ label: "", color: "" });

  // DZI Viewer Inits
  const viewerRef = useRef<OpenSeaDragon.Viewer | undefined>(undefined);

  const [image, setImage] = useState<
    RemoteDZISource | LocalDZISource | undefined
  >({
    dziURL:
      "https://ceibro-development.s3.eu-north-1.amazonaws.com/drawingdzi/2024-03-26/mg3_1711439874038.dzi",
    filesURL:
      "https://ceibro-development.s3.eu-north-1.amazonaws.com/drawingdzi/2024-03-26/mg3_1711439874038/",
  });

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

    console.log(`opening remote image with dzi spec ${JSON.stringify(dzi)}`);

    viewer.open(dzi);
  };

  // setup and teardown
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

  // DZI Viewer Initialization Effect
  useEffect(() => {
    // Create the viewer on initial render.
    if (viewerRef.current === undefined) {
      // @ts-ignore
      OpenSeaDragon.setImageFormatsSupported({
        png: true,
        jpeg: true,
        jpg: true,
      });

      console.log("creating viewer.");

      // only one viewer object is used throughout.
      const viewer: any = OpenSeaDragon({
        id: "osd-viewer",
        homeButton: HOME_BUTTON_ID,

        zoomInButton: ZOOM_IN_BUTTON_ID,
        zoomOutButton: ZOOM_OUT_BUTTON_ID,
        fullPageButton: FULLSCREEN_BUTTON_ID,
        ...DEFAULT_OSD_SETTINGS,
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

        console.log(`initial navto ${JSON.stringify(navTo)}`);

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
        console.log("updating coords.");
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

      console.log("DZI Viewer Init Success ! ");
      console.log("Init DZI Annotations ");

      const myAnno: any = new DZIAnnotaionManager(viewer, {
        channelName: "my-anno",
      })
        .restore(Object.values(annotations))
        .activate();

      for (const { id, color } of Object.values<any>(annotations)) {
        const hostElement = document.getElementById(id);
        hostElement?.style.setProperty("--COLOR", color);
      }

      const channel = new BroadcastChannel("my-anno");
      channel.onmessage = ({ data: message }) => {
        const { type, data } = message;
        switch (type) {
          case "annotation:added": {
            const item = { ...data, labels: [] };
            setAnnotations((prevAnnotations: any) => ({
              ...prevAnnotations,
              [data.id]: item,
            }));
            break;
          }
          case "annotation:updated": {
            const item = { ...annotations[data.id], ...data };
            setAnnotations((prevAnnotations: any) => ({
              ...prevAnnotations,
              [data.id]: item,
            }));
            if (selected?.id === data.id) setSelected(item);
            break;
          }
          case "annotation:removed": {
            const updatedAnnotations = { ...annotations };
            delete updatedAnnotations[data.id];
            setAnnotations(updatedAnnotations);
            break;
          }
          case "annotation:selected": {
            setSelected(annotations[data.id]);
            setDraft({
              label: annotations[data.id]?.labels.join(", "),
              color: annotations[data.id]?.color,
            });
            break;
          }
          case "annotation:deselected": {
            setSelected(null);
            setDraft({ label: "", color: "" });
            break;
          }
          default:
            break;
        }
      };
      setImage(imageToOpen);

      return () => {
        // channel.onmessage = null;
        // channel.close();
        // myAnno.destroy();
        // viewer.destroy();
      };
    }
  }, []);

  // }, []);

  // update image state when prop is updated
  // never actually used in this application, I think?
  useEffect(() => {
    setImage(imageToOpen);
  }, [imageToOpen]);

  // open image when state is changed
  useEffect(() => {
    console.log("running image effect.");
    const viewer = viewerRef.current;
    if (image && viewer) {
      console.log("opening image.");
      if ("dziURL" in image) openRemoteImage(viewer, image);
    } else {
      viewer?.close();
    }
  }, [image]);

  const handleLabelChange = (e: { target: { value: string } }) => {
    const labels = e.target.value
      .split(",")
      .map((label: string) => label.trim())
      .filter(Boolean);
    setDraft((prevDraft) => ({ ...prevDraft, label: e.target.value }));
    if (selected) {
      setAnnotations((prevAnnotations: { [x: string]: any }) => ({
        ...prevAnnotations,
        [selected.id]: { ...prevAnnotations[selected.id], labels },
      }));
      setSelected((prevSelected: any) => ({ ...prevSelected, labels }));
    }
  };

  const handleColorChange = (e: { target: { value: any } }) => {
    const color = e.target.value;
    setDraft((prevDraft) => ({ ...prevDraft, color }));
    if (selected) {
      setAnnotations((prevAnnotations: { [x: string]: any }) => ({
        ...prevAnnotations,
        [selected.id]: { ...prevAnnotations[selected.id], color },
      }));
      setSelected((prevSelected: any) => ({ ...prevSelected, color }));
      const hostElement = document.getElementById(selected.id);
      hostElement?.style.setProperty("--COLOR", color);
    }
  };

  const handleAddAnnotation = () => {
    const id = `anno-${Date.now()}`;
    const newItem = {
      id,
      location: [20, 20, 0, 0],
      labels: [],
      color: "tomato",
    };
    setAnnotations((prevAnnotations: any) => ({
      ...prevAnnotations,
      [id]: newItem,
    }));
    setSelected(newItem);
  };

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

      <div className="my-editor">
        {selected === null ? (
          <div>Not selected</div>
        ) : (
          <div>
            {/* <label htmlFor="labels">Labels</label>
            <input
              type="text"
              id="labels"
              placeholder="foo, bar"
              value={draft.label}
              onChange={handleLabelChange}
            />
            <hr />
            <div>Color</div> */}
            {/* <select value={draft.color} onChange={handleColorChange}>
              <option value="" disabled>
                Not selected
              </option>
              <option value="tomato">tomato</option>
              <option value="lime">lime</option>
              <option value="aqua">aqua</option>
            </select> */}
          </div>
        )}
        <pre>{JSON.stringify(selected, null, 2)}</pre>
      </div>
    </div>
  );
}

export default DZIViewerAnootation;
