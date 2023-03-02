import { Fragment } from "react";

// modified from https://medium.com/@code-flow/how-to-write-a-simple-and-reusable-overlay-component-using-react-7830dc4519a6
export function Overlay({ isOpen, onClose, children }) {
  return (
    <Fragment>
      {isOpen && (
        <div className="Overlay">
          <div className="Overlay-Background" onClick={onClose} />
          <div className="Overlay-Container">
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Overlay;