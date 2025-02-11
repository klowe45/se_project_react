import "./DeleteModal.css";

function DeleteModal({ activeModal, handleDeleteConfirmation, closeModal }) {
  <div className={`modal ${activeModal === "delete-modal" && "modal_opened"}`}>
    <div className="delete__confirmation">
      <button
        className="delete__close-btn"
        type="button"
        onClick={closeModal}
      ></button>
      <p className="delete__title">Are you sure you want to delele?</p>
      <p className="delete__title">This action is irreversible.</p>
      <button
        className="delete__confirm-btn"
        onClick={handleDeleteConfirmation}
      >
        Yes, delete item
      </button>
      <button className="delete__cancel-btn" onClick={closeModal}>
        Cancel
      </button>
    </div>
  </div>;
}

export default DeleteModal;
