import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { useState } from "react";

const EditModal = (props: any) => {
  const { register, handleSubmit } = useForm();

  return (
    <Modal
      title="Edit Zone"
      isModalOpen={props.isEditModalOpen}
      closeModal={props.closeEditModal}
    >
      <div className="mt-2 flex flex-col">
        <div className="flex flex-row p-2">
          <label className="space-x-8">Region Name</label>
          <div className="flex flex-col ml-auto w-3/4">
            <input
              type="text"
              className="border-2  px-4 border-gray-400 rounded-box"
              {...register("zone", {})}
            />
          </div>
        </div>

        <div className="flex flex-row p-2">
          <label className="space-x-8">Region Color</label>
          <input
            value={props.color}
            type="color"
            className="border-2 ml-auto w-3/4 px-4 border-gray-400 rounded-box"
            {...register("color", {})}
            onChange={(e) => props.setColor(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row justify-center my-4">
        <button
          type="submit"
          aria-label="submit button"
          onClick={handleSubmit(props.onSubmitEditModal)}
          className="justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          Edit Zone
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;
