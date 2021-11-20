import create, { GetState, SetState } from "zustand";
import * as types from "../types/Types";
import { devtools, persist, StoreApiWithPersist } from "zustand/middleware";

interface GeoFencing {
  token: String;
  addToken: (token: String) => void;
  removeToken: () => void;
  zones: Array<types.ExportedZone>;
  addZones: (zone: Array<types.ExportedZone>) => void;
  removeZones: () => void;
}

export const useStore = create<
  GeoFencing,
  SetState<GeoFencing>,
  GetState<GeoFencing>,
  StoreApiWithPersist<GeoFencing>
>(
  persist(
    devtools((set) => ({
      // initial state
      zones: [],
      addZones: (zones: Array<types.ExportedZone>) => {
        set(() => ({
          zones: zones,
        }));
      },
      token: "",
      addToken: (token: String) => {
        set(() => ({
          token: token,
        }));
      },
      removeToken: () => {
        set(() => ({
          token: "",
        }));
      },
      removeZones: () => {
        set(() => ({
          zones: [],
        }));
      },
    })),
    {
      name: "geo-fencing", // unique name
    }
  )
);
