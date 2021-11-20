import Map from "./Map";
import { useState, useEffect } from "react";
import * as types from "../../types/Types";
import { useStore } from "../../store";
import useApi from "../../hooks/useApi";
import { useRouter } from "next/router";
import useLogin from "../../hooks/useLogin";
import toast, { Toaster } from "react-hot-toast";
import AddModal from "./modals/AddModal";
import DeleteModal from "./modals/DeleteModal";
import EditModal from "./modals/EditModal";

const MapComponent = () => {
  const [markers, setMarkers] = useState<Array<types.PathObject>>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<Boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<Boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<Boolean>(false);
  const [currentZone, setCurrentZone] = useState<types.Zone | null>();
  const [showInfoWindow, setShowInfoWindow] =
    useState<types.PathObject | null>();
  const [color, setColor] = useState<String>();

  const [zoneToBeEditedOrDeleted, setZoneToBeEditedOrDeleted] =
    useState<types.ExportedZone>({
      label: "",
      color: "",
      _id: "",
      points: [],
    });

  const router = useRouter();
  const { getZones, addZone, deleteZone, editZone } = useApi();
  const { token } = useStore();
  const { logout } = useLogin();

  useEffect(() => {
    if (isAddModalOpen === false && (markers || currentZone)) {
      setMarkers([]);
      setCurrentZone(null);
    }
    if (token === "") {
      router.push("/");
    }
  }, [isAddModalOpen, token]);

  const colorHandler = (event: any) => {
    if (currentZone) {
      const zoneInstance = {
        points: markers,
        color: event.target.value,
        label: "",
      };
      setCurrentZone(zoneInstance);
    }
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openEditModal = () => {
    setColor(zoneToBeEditedOrDeleted.color);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const onSubmitAddModal = async (data: types.FormValues) => {
    const newZone: types.Zone = {
      points: markers,
      color: data.color,
      label: data.zone,
    };
    const zoneAdded = await addZone(newZone, token);
    if (zoneAdded === true) {
      setMarkers([]);
      setCurrentZone(null);
      closeAddModal();
    } else {
      const zoneAdded = await addZone(newZone, token);
      if (zoneAdded === true) {
        setMarkers([]);
        setCurrentZone(null);
        closeAddModal();
      } else {
        toast.error("This name is used before");
      }
    }
  };

  const onSubmitDeleteModal = (deleteOrNot: Boolean) => {
    if (deleteOrNot) {
      deleteZone(zoneToBeEditedOrDeleted._id, token);
    } else
      setZoneToBeEditedOrDeleted({
        label: "",
        color: "",
        _id: "",
        points: [],
      });
    closeDeleteModal();
  };

  const onSubmitEditModal = (data: types.FormValues) => {
    const editedZone = {
      label: data.zone ? data.zone : zoneToBeEditedOrDeleted.label,
      color: data.color ? data.color : zoneToBeEditedOrDeleted.color,
      points: zoneToBeEditedOrDeleted.points,
    };

    editZone(zoneToBeEditedOrDeleted._id, token, editedZone);
  };

  return (
    <div>
      <button onClick={() => getZones(token)}>test</button>
      <button onClick={() => logout()}>logout</button>
      <div>
        <Toaster />
      </div>{" "}
      <AddModal
        isAddModalOpen={isAddModalOpen}
        openAddModal={openAddModal}
        closeAddModal={closeAddModal}
        colorHandler={colorHandler}
        onSubmitAddModal={onSubmitAddModal}
      />
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        openDeleteModal={openDeleteModal}
        closeDeleteModal={closeDeleteModal}
        onSubmitDeleteModal={onSubmitDeleteModal}
      />
      <EditModal
        isEditModalOpen={isEditModalOpen}
        openEditModal={openEditModal}
        closeEditModal={closeEditModal}
        onSubmitEditModal={onSubmitEditModal}
        color={color}
        setColor={setColor}
      />
      <Map
        markers={markers}
        setMarkers={setMarkers}
        setCurrentZone={setCurrentZone}
        openAddModal={openAddModal}
        currentZone={currentZone}
        openDeleteModal={openDeleteModal}
        setZoneToBeEditedOrDeleted={setZoneToBeEditedOrDeleted}
        setShowInfoWindow={setShowInfoWindow}
        showInfoWindow={showInfoWindow}
        openEditModal={openEditModal}
      />
    </div>
  );
};

export default MapComponent;