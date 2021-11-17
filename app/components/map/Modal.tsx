import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

const Modal = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <button onClick={props.openModal} className="z-50">
        toggle
      </button>
      <Transition appear show={props.isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={props.closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-lg">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="bg-black h-2"></div>
                  <div className="p-2 text-2xl py-4">Add region details</div>
                  <div className="divider m-0 px-2 text-gray-500"></div>
                </Dialog.Title>
                <div className="mt-2 flex flex-col">
                  <div className="flex flex-row p-2">
                    <label className="space-x-8">Region Name</label>
                    <div className="flex flex-col ml-auto w-3/4">
                      <input
                        type="text"
                        className="border-2  px-4 border-gray-400 rounded-box"
                        // placeholder="Zone"
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
                    onClick={handleSubmit(props.onSubmit)}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Add Zone
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
