import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

/**
 * Asynchronously retrieves a PDF document from the specified URL.
 *
 * @param {string} url - The URL of the PDF document
 * @return {Promise<any>} A promise that resolves with the PDF document
 */
export async function getPDFDocument(url: string): Promise<any> {
    const pdfLoadingTask = pdfjs.getDocument(url);
    return pdfLoadingTask.promise;
}

/**
 * Retrieves the dimensions of the first page of a PDF document.
 *
 * @param {string} src - the URL or file path of the PDF document
 * @return {Object} an object containing the width and height of the first page
 */
export async function getPDFPageDimensions(src: string) {
    const loadingTask = pdfjs.getDocument(src);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    return {
        width: viewport.width,
        height: viewport.height,
    };
}