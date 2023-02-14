import { Fragment } from "react";

export function Overlay({ isOpen, onClose, children }) {
  return (
    <Fragment>
      {isOpen && (
        <div className="Overlay">
          <div className="Overlay-Background" onClick={onClose} />
          <div className="Overlay-Container">
            <div className="Overlay-Controls">
              <button
                className="Overlay-Close"
                type="button"
                onClick={onClose}
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Overlay;