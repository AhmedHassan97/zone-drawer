import Modal from "./Modal";
import { useForm } from "react-hook-form";

const AddModal = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Modal
      title="Add new Region"
      isModalOpen={props.isAddModalOpen}
      closeModal={props.closeAddModal}
    >
      <div className="mt-2 flex flex-col">
        <div className="flex flex-row p-2">
          <label className="space-x-8">Region Name</label>
          <div className="flex flex-col ml-auto w-3/4">
            <input
              type="text"
              className="border-2  px-4 border-gray-400 rounded-box"
              {...register("zone", {
                required: true,
              })}
            />
            {errors.zone && (
              <div className="mb-3 text-normal text-error">
                zone name is required
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row p-2">
          <label className="space-x-8">Region Color</label>
          <input
            type="color"
            value={props.color}
            className="border-2 ml-auto w-3/4 px-4 border-gray-400 rounded-box"
            {...register("color", {
              required: true,
            })}
            onChange={props.colorHandler}
          />
        </div>
      </div>

      <div className="flex flex-row justify-center my-4">
        <button
          type="submit"
          aria-label="submitbutton"
          onClick={handleSubmit(props.onSubmitAddModal)}
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          Add Zone
        </button>
      </div>
    </Modal>
  );
};

export default AddModal;
