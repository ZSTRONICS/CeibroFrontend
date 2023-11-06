import CustomModal from "components/Modal";
import PDFViewer from "components/uploadImage/WindowPDFViewer";
import React from "react";
import ImageLazyLoad from ".";

interface ImagePreviewModalProps {
  isOpen: boolean;
  closeModal: () => void;
  fileToView: { fileUrl: string } | null;
  title: string;
  isPdfFile: boolean;
}
const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isOpen,
  closeModal,
  fileToView,
  title,
  isPdfFile,
}) => {
  const handleError = (e: any) => {
    console.error("Error loading PDF:", e);
  };
  return (
    <>
      <CustomModal
        maxWidth={"false"}
        isOpen={isOpen}
        handleClose={closeModal}
        showCloseBtn={true}
        title={title}
        children={
          <>
            {fileToView && (
              <>
                {isPdfFile ? (
                  <PDFViewer
                    src={fileToView.fileUrl}
                    onLoad={() => console.log("PDF loaded successfully")}
                    onError={handleError}
                  />
                ) : (
                  <ImageLazyLoad
                    maxWidth="100%"
                    src={fileToView.fileUrl}
                    alt="image"
                    imgZoomHandler={true}
                  />
                )}
              </>
            )}
          </>
        }
      />
    </>
  );
};

export default ImagePreviewModal;
