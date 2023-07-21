import { ReactNode, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

const styles = {
  button: {
    background: "black",
    padding: "1rem",
    fontSize: "2rem",
    cursor: "pointer",
    color: "white",
  },
  modalContent: {
    background: "blue",
    padding: "1rem",
    fontSize: "2rem",
    color: "white",
  },
};

export function WindowPortal(props: {
  children: ReactNode;
  onClose: (text: string) => void;
}) {
  const containerEl = document.createElement("div");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!props.children) return;
    const externalWindow = window.open(
      "",
      "",
      "width=600,height=400,left=200,top=200"
    );

    if (externalWindow) {
      externalWindow.document.body.appendChild(containerEl);

      const handlePortalClose = () => {
        props.onClose(inputRef.current?.value || "");
      };

      externalWindow.addEventListener("beforeunload", handlePortalClose);

      return () => {
        externalWindow.removeEventListener("beforeunload", handlePortalClose);
        externalWindow.close();
      };
    } else {
      console.error("Failed to open external window");
    }
  }, []);

  return ReactDOM.createPortal(props.children, containerEl);
}

// export default function App() {
//   const [open, setOpen] = useState(false);
//   const [portalClosedText, setPortalClosedText] = useState("");

//   const handleWindowPortalClose = (text: string) => {
//     setPortalClosedText(text);
//     setOpen(false);
//   };

//   const handleButtonClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//       <button style={styles.button} onClick={handleButtonClick}>
//         open modal
//       </button>

//       {open && (
//         <WindowPortal onClose={handleWindowPortalClose}>
//           <div style={styles.modalContent}>
//             <h3>This is content in the portal</h3>
//           </div>
//         </WindowPortal>
//       )}

//       {portalClosedText && (
//         <div>
//           Text field value in JSON object when portal closed:
//           <pre>{JSON.stringify({ text: portalClosedText }, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }
