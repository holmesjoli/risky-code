import { Fragment } from "react";

export function Overlay({ isOpen, onClose, children }) {
  return (
    <Fragment>
      {isOpen && (
        <div className="Overlay">
          <div className="Overlay__background" onClick={onClose} />
          <div className="Overlay__container">
            <div className="Overlay__controls">
              <button
                className="Overlay__close"
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