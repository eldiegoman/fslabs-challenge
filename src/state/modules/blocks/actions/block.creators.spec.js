import configureStore from "redux-mock-store";

import * as ActionTypes from "../../../../constants/actionTypes";
import * as ActionCreators from "./blocks.creators";

const mockStore = configureStore();
const store = mockStore();

describe("Actions", () => {
  beforeAll(() => {});
  afterAll(() => {});

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  it("should create an action to get block by node", () => {
    const expected = [
      {
        type: ActionTypes.GET_BLOCK_START,
        payload: {
          node,
        },
      },
    ];
    store.dispatch(ActionCreators.getBlockStart(node));
    expect(store.getActions()).toEqual(expected);
    store.clearActions();
  });

  it("should create an action when get blocks fails", () => {
    const expected = [
      {
        type: ActionTypes.GET_BLOCK_FAILURE,
        payload: {
          error: "error",
        },
      },
    ];
    store.dispatch(ActionCreators.getBlockFailure("error"));
    expect(store.getActions()).toEqual(expected);
    store.clearActions();
  });
});
