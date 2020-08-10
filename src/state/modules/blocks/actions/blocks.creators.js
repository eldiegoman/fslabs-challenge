import {
  GET_BLOCK_START,
  GET_BLOCK_SUCCESS,
  GET_BLOCK_FAILURE,
} from "../../../../constants/actionTypes";
import { createAction } from "redux-actions";

export const getBlockStart = createAction(GET_BLOCK_START, (node) => ({
  node,
}));

export const getBlockSuccess = createAction(GET_BLOCK_SUCCESS, (response) => {
  return response;
});

export const getBlockFailure = createAction(GET_BLOCK_FAILURE, (error) => ({
  error,
}));

export const getBlockStatus = createAction(GET_BLOCK_START);
