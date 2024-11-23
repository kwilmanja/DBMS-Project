import {createAsyncThunk} from "@reduxjs/toolkit";
import * as trailService from "./trail-service";
import {trailSearchLatLng} from "./trail-service";

export const trailSearchIDThunk = createAsyncThunk(
    "trailSearchID", async (trailID) => {
        return await trailService.trailSearchID(trailID);
    }
);

export const trailSearchLatLngThunk = createAsyncThunk(
    "trailSearchLatLng", async ({lat, lng}) => {
        return await trailService.trailSearchLatLng(lat, lng);
    }
);




