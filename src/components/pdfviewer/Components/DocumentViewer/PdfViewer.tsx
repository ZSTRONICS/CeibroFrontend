import useWindowSize from "hooks/useWindowSize";
import { useCallback, useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import Canvas from "../Canvas";
import useDoubleClick, { getNewAppNode } from "../hooks/useDoubleClick";
import useDraw from "../hooks/useDraw";
import useNodeConnectionUtils from "../hooks/useNodeConnectionUtils";
import useOnMouseDown from "../hooks/useOnMouseDown";
import { ORIGIN, Point } from "../pointUtils";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
interface IProps {
  pdfUrl: string;
}
const PdfViewer = (props: IProps) => {
  const defaultCanvasViewState: CanvasViewState = {
    offset: ORIGIN,
    scale: 1,
  };
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageRendering, setPageRendering] = useState(false);
  const [pageNumPending, setPageNumPending] = useState<any>(null);
  const [drawingPins, setDrawingPins] = useState<any>([]);
  const [isMouseMove, setIsMouseMove] = useState<boolean>(false);
  const [addNewPin] = useNodeConnectionUtils(drawingPins, setDrawingPins);
  const [size, ratio] = useWindowSize();
  const [canvasViewState, setCanvasViewState] = useState(
    defaultCanvasViewState
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  //   const pdfUrl ="https://ceibro-development.s3.eu-north-1.amazonaws.com/task/2024-01-05/actual_compressed-compressed_1704452772103.pdf";
  // const pdfUrl =
  //   "https://ceibro-development.s3.eu-north-1.amazonaws.com/task/task/2023-12-19/CEIBRO-Test_run_2023_11_15__1__1701681729692__1__-_Copy_1702987503302.pdf";

  useEffect(() => {
    if (!canvasRef && !pdfDoc && !props.pdfUrl) {
      return;
    }
    const canvas = canvasRef.current;
    renderPDF(props.pdfUrl, canvas);

    return () => {
      cancelRender();
    };
  }, [
    pdfDoc,
    canvasViewState.scale,
    isMouseMove,
    drawingPins.length,
    props.pdfUrl,
  ]);

  const queueRenderPage = (num: any) => {
    if (pageRendering) {
      setPageNumPending(num);
    }
  };
  const onPrevPage = () => {
    if (pageNum <= 1) {
      return;
    }
    setPageNum((prevPageNum) => prevPageNum - 1);
    // queueRenderPage(pageNum - 1);
  };
  const onNextPage = () => {
    if (pdfDoc && pageNum < pdfDoc.numPages) {
      setPageNum((prevPageNum) => prevPageNum + 1);
      // queueRenderPage(pageNum + 1);
    }
  };

  let renderTask: any | null = null;
  const controller = new AbortController();

  async function renderPDF(url: string, canvas: any): Promise<void> {
    try {
      // Cancel the previous render task if it exists
      if (renderTask) {
        controller.abort();
      }
      if (!pdfDoc && !renderTask) {
        const pdfDocInstance = await getPDFDocument(url);
        setPdfDoc(pdfDocInstance);
      }
      const taskController = new AbortController();
      const taskSignal = taskController.signal;

      // const pdfDocInstance = await pdfjs.getDocument(url).promise;
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;

      const currentPage = 1;
      const scale = canvasViewState.scale;
      // Determine the current viewport based on the canvas size and scale
      if (pdfDoc) {
        const viewportPage = await pdfDoc.getPage(currentPage);
        const viewport = viewportPage.getViewport({ scale });
        // Start rendering the PDF page
        renderTask = viewportPage.render({
          canvasContext: context,
          viewport: viewport,
          // Use the controller's signal as an option for the rendering task
          // This allows us to cancel the rendering if needed
          ...(taskSignal ? { signal: taskSignal } : {}),
          onAfterDraw: () => {
            // drawPins(context, drawingPins);
            // console.log("draw circle after pdf render");
          },
        });

        // drawPins(context, drawingPins);
        // Use Promise.race to wait for either the rendering task to complete
        // or the controller's signal to be aborted
        await Promise.race([renderTask.promise, taskSignal]);
      }
      // Wait for the rendering task to complete
      // await renderTask.promise;
      // console.log("Rendering completed");
    } catch (error: any) {
      // Handle errors, check if the error is due to cancellation
      if (error.name === "AbortError") {
        // console.log("Rendering cancelled");
      } else {
        console.error("Error rendering PDF:", error);
      }
    }
  }
  async function getPDFDocument(url: string): Promise<any> {
    const pdfLoadingTask = pdfjs.getDocument(url);
    return pdfLoadingTask.promise;
  }

  function cancelRender(): void {
    if (renderTask) {
      controller.abort();
      renderTask.cancel();
      renderTask = null;
    }
  }
  // async function renderPDF(url: any, canvas: any) {
  //   const pdfDocInstance = await pdfjs.getDocument(url).promise;
  //   const context = canvas.getContext("2d");
  //   let currentPage = 1;
  //   let scale = canvasViewState.scale;
  //   // Determine the current viewport based on the canvas size and scale
  //   const viewportPage = await pdfDocInstance.getPage(currentPage);
  //   const viewport = viewportPage.getViewport({ scale });
  //   viewportPage.render({
  //     canvasContext: context,
  //     viewport: viewport,
  //   });
  // }
  function renderVisibleArea(
    pdf: any,
    canvas: any,
    pageNumber: any,
    viewport: any,
    context: any
  ) {
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    var renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    pdf.getPage(pageNumber).then(function (page: any) {
      page.render(renderContext);
    });
  }
  type PanelSizes = {
    editorWidthFraction: number;
    canvasHeightFraction: number;
    tableHeightFraction: number;
  };
  type CanvasViewState = {
    offset: Point;
    scale: number;
  };
  const savedCanvasState: CanvasViewState = {
    offset: ORIGIN,
    scale: 1,
  };
  // const setCanvasViewState = (newCanvasState: CanvasViewState) => {
  //   defaultCanvasViewState.offset = newCanvasState.offset;
  //   defaultCanvasViewState.scale = newCanvasState.scale;
  // };
  type CanvaState = {
    canvasViewState: CanvasViewState;
    savedCanvasState: CanvasViewState;
    panelSizes: PanelSizes;
  };

  const [windowWidth, windowHeight] = size;
  const canvasHeight = 650;
  // windowHeight * appState.panelSizes.canvasHeightFraction - headerHeight;
  const canvasWidth = 600;
  // windowWidth * (1 - appState.panelSizes.editorWidthFraction);
  const addNodeOnCanvas = useCallback(
    (node: any) => {
      addNewPin(getNewAppNode(node));
    },
    [addNewPin]
  );

  // const allPinsData: DrawingPinInterface[] = [];
  const [draw] = useDraw(drawingPins);
  const onMouseDown = useOnMouseDown(
    drawingPins,
    // clearAndRedraw,
    addNodeOnCanvas
  );
  // console.log("draw", draw);
  const handleDoubleClick = useDoubleClick(drawingPins, addNewPin);
  const handleZoomOut = () => {
    let scale = canvasViewState.scale - 0.01;
    setCanvasViewState({
      ...canvasViewState,
      ...{
        offset: {
          x: canvasViewState.offset.x * scale,
          y: canvasViewState.offset.y * scale,
        },
        scale: scale,
      },
    });
  };
  const handleZoomIn = () => {
    let scale = canvasViewState.scale + 0.01;
    setCanvasViewState({
      ...canvasViewState,
      ...{
        offset: {
          x: canvasViewState.offset.x * scale,
          y: canvasViewState.offset.y * scale,
        },
        scale: scale,
      },
    });
  };

  return (
    <div>
      <div>
        <button onClick={onPrevPage}>Previous</button>
        <button onClick={onNextPage}>Next</button>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
        &nbsp; &nbsp;
        <span>
          Page: <span id="page_num"></span> /{" "}
          <span id="page_count">{pdfDoc && pdfDoc.numPages}</span>
        </span>
      </div>
      <div style={{ height: canvasHeight, width: "100%" }}>
        <Canvas
          canvasRef={canvasRef}
          setIsMouseMove={setIsMouseMove}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          devicePixelRatio={ratio}
          draw={draw}
          onMouseDown={onMouseDown}
          handleDoubleClick={handleDoubleClick}
          canvasViewState={canvasViewState}
          setCanvasViewState={setCanvasViewState}
          savedCanvasViewState={savedCanvasState}
          setSavedCanvasViewState={() => {}}
          setKeyboardActive={() => {}}
        />
      </div>
    </div>
  );
};

export default PdfViewer;
