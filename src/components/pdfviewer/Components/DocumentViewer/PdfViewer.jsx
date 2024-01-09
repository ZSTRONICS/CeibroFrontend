import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
const PdfViewer = () => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageRendering, setPageRendering] = useState(false);
  const [pageNumPending, setPageNumPending] = useState(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    // renderPage(pageNum,scale);
    RenderedPDFComp();
  }, []);
  const renderPage = (num, customScale = null) => {
    if (!pdfDoc) {
      console.error("PDF document is null.");
      return;
    }
    setPageRendering(true);
    pdfDoc.getPage(num).then((page) => {
      const originalViewport = page.getViewport({ scale: 1 });
      const scale =
        customScale || originalViewport.width / originalViewport.height;
      // Get the canvas element and its context
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      // Set the canvas size based on the viewport
      canvas.height = originalViewport.height;
      canvas.width = originalViewport.width;
      // Set the render context
      const renderContext = {
        canvasContext: ctx,
        viewport: page.getViewport({ scale }),
      };
      // Render only the visible area
      const renderTask = page.render(renderContext);
      renderTask.promise.then(() => {
        setPageRendering(false);
        if (pageNumPending !== null) {
          renderPage(pageNumPending, scale);
          setPageNumPending(null);
        }
      });
    });
    document.getElementById("page_num").textContent = 1;
  };
  const queueRenderPage = (num) => {
    if (pageRendering) {
      setPageNumPending(num);
    } else {
      renderPage(num);
    }
  };
  const onPrevPage = () => {
    if (pageNum <= 1) {
      return;
    }
    setPageNum((prevPageNum) => prevPageNum - 1);
    queueRenderPage(pageNum - 1);
  };
  const onNextPage = () => {
    if (pdfDoc && pageNum < pdfDoc.numPages) {
      setPageNum((prevPageNum) => prevPageNum + 1);
      queueRenderPage(pageNum + 1);
    }
  };
  const handleZoomIn = () => {
    console.log(scale, "scale");
    setScale(scale + 0.1);
  };
  async function renderPDF(url, canvas) {
    const pdfDocInstance = await pdfjs.getDocument(url).promise;
    var context = canvas.getContext("2d");
    // Initialize with the first page
    var currentPage = 1;
    var totalPages =await pdfDocInstance.numPages;
    async function render() {
      // Determine the current viewport based on the canvas size and scale
      var viewport = pdfDocInstance.getPage(currentPage).then(function (page) {
        return page.getViewport({ scale });
      });
      viewport.then(function (viewport) {
        // Render the visible area of the current page
        renderVisibleArea(pdfDocInstance, canvas, 1, viewport, context);
      });
      // Load and render the next page if available
      if (currentPage < totalPages) {
        currentPage++;
        requestAnimationFrame(render);
      }
    }
    render();
  }
  function renderVisibleArea(
    pdf,
    canvas,
    pageNumber,
    viewport,
    context
  ) {
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    var renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    pdf.getPage(pageNumber).then(function (page) {
      page.render(renderContext);
    });
  }
  function RenderedPDFComp() {
    const pdfUrl =
      "https://ceibro-development.s3.eu-north-1.amazonaws.com/task/task/2023-12-19/CEIBRO-Test_run_2023_11_15__1__1701681729692__1__-_Copy_1702987503302.pdf";
    const canvas = document.getElementById("pdfCanvas");
    renderPDF(pdfUrl, canvas, scale);
  }
  return (
    <div>
      <div>
        <button onClick={onPrevPage}>Previous</button>
        <button onClick={onNextPage}>Next</button>
        <button onClick={handleZoomIn}>Zoom In</button>
        &nbsp; &nbsp;
        <span>
          Page: <span id="page_num"></span> /{" "}
          <span id="page_count">{pdfDoc && pdfDoc.numPages}</span>
        </span>
      </div>
      <canvas id="pdfCanvas"></canvas>
    </div>
  );
};
export default PdfViewer;
