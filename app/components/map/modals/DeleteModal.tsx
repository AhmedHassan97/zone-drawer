import Modal from "./Modal";

const DeleteModal = (props: any) => {
  return (
    <Modal
      title="Delete Region"
      isModalOpen={props.isDeleteModalOpen}
      closeModal={props.closeDeleteModal}
    >
      <div className="mt-2 flex flex-col">
        <p className="text-lg font-medium ml-2">
          Are you sure you want to delete this region?{" "}
        </p>
      </div>

      <div className="flex flex-row justify-center my-4 space-x-2">
        <button
          type="submit"
          aria-label="submitbutton"
          onClick={() => props.onSubmitDeleteModal(true)}
          className="justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          Delete Zone
        </button>
        <button
          onClick={() => props.onSubmitDeleteModal(false)}
          type="submit"
          aria-label="submitbutton"
          className=" justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
