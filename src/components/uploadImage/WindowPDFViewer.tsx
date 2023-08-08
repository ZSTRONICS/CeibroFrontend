import { useEffect, useState } from "react";

interface Props {
  src: string;
  onLoad: (value: boolean) => void;
  onError: (e: any) => void;
}

export default function PDFViewer({ src, onLoad, onError }: Props) {
  const [data, setData] = useState("");

  useEffect(() => {
    const req = new XMLHttpRequest();
    req.open("GET", src, true);
    req.responseType = "arraybuffer";
    req.onload = function (e) {
      if (req.status >= 300) {
        onError(e);
      } else {
        setData(
          window.URL.createObjectURL(
            new Blob([req.response], { type: "application/pdf" })
          )
        );
        onLoad(true);
      }
    };
    req.send();
    return () => {
      req.abort();
    };
  }, [src]);
  return (
    <object data={data} type="application/pdf" width="100%" height="500px">
      <p>
        Unable to display PDF. Please download the PDF to view it:{" "}
        <a href={src} download>
          Download PDF
        </a>
      </p>
    </object>
  );
}
