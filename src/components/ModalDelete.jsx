import '../styles/modal.css';

const ModalDelete = ({ showModal, setShowModal, deleteItem }) => {

  return (
    <div className="modal-background" style={{ display: showModal ? "flex" : "none" }}>
      <div className="modal-container">
        <div className="modal-message">
          <p className="message">Are you sure you want to delete this item?</p>
        </div>
        <div className="modal-buttons">
          <button className="button-delete" onClick={() => deleteItem()}>Delete Item</button>
          <button className="button-cancel" onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;