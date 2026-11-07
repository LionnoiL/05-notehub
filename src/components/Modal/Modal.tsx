import css from "./Modal.module.css";

const Modal = () => {
  return (
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>{/* */}</div>
    </div>
  );
};

export default Modal;
