import {
  CHECK_NODE_STATUS_START,
  CHECK_NODE_STATUS_SUCCESS,
  CHECK_NODE_STATUS_FAILURE,
  GET_BLOCK_START,
  GET_BLOCK_SUCCESS,
  GET_BLOCK_FAILURE,
} from "../../../../constants/actionTypes";

import initialState from "../../../initialState";

const loadingHandler = (state, action) => {
  if (action.payload && action.payload.node) {
    const {
      payload: { node },
    } = action;
    const newState = state.reduce((acc, cur) => {
      if (cur.url === node.url) {
        const newNode = {
          ...cur,
          loading: !cur.loading,
        };
        acc.push(newNode);
        return acc;
      }
      acc.push(cur);
      return acc;
    }, []);
    return newState;
  }

  return state;
};

const successBlocksHandler = (state, action) => {
  const {
    payload: { node, data },
  } = action;
  const newState = state.reduce((acc, cur) => {
    if (cur.url === node.url) {
      const newNode = {
        ...cur,
        blocks: data,
        loading: false,
      };
      acc.push(newNode);
      return acc;
    }
    acc.push(cur);
    return acc;
  }, []);

  return newState;
};

export default function nodesReducer(
  state = initialState.toJS().nodes,
  action
) {
  let list, nodeIndex;
  switch (action.type) {
    case GET_BLOCK_START:
      list = loadingHandler(state.list, action);
      return {
        ...state,
        list,
      };
    case GET_BLOCK_SUCCESS:
      list = successBlocksHandler(state.list, action);
      return {
        ...state,
        list,
      };
    case GET_BLOCK_FAILURE:
      list = loadingHandler(state.list, action);
      return {
        ...state,
        list,
      };
    case CHECK_NODE_STATUS_START:
      list = state.list;
      nodeIndex = state.list.findIndex((p) => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            loading: true,
          },
          ...state.list.slice(nodeIndex + 1),
        ];
      }
      return {
        ...state,
        list,
      };
    case CHECK_NODE_STATUS_SUCCESS:
      list = state.list;
      nodeIndex = state.list.findIndex((p) => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: true,
            name: action.res.node_name,
            loading: false,
          },
          ...state.list.slice(nodeIndex + 1),
        ];
      }
      return {
        ...state,
        list,
      };
    case CHECK_NODE_STATUS_FAILURE:
      list = state.list;
      nodeIndex = state.list.findIndex((p) => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: false,
            loading: false,
          },
          ...state.list.slice(nodeIndex + 1),
        ];
      }
      return {
        ...state,
        list,
      };
    default:
      return state;
  }
}
