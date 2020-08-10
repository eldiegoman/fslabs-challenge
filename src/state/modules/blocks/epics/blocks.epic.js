import { catchError, map, switchMap, takeUntil } from "rxjs/operators";
import { of } from "rxjs";
import { ofType } from "redux-observable";

import * as blocksActions from "../../blocks/actions/blocks.creators";
import {
  GET_BLOCK_START,
  GET_BLOCK_FAILURE,
} from "../../../../constants/actionTypes";

import getBlocks from "../blocks.api";

function blocksEpic(action$) {
  return action$.pipe(
    ofType(GET_BLOCK_START),
    switchMap((action) =>
      getBlocks(action.payload.node).pipe(
        map((response) => {
          return blocksActions.getBlockSuccess({
            node: action.payload.node,
            data: response.data,
          });
        }),
        map((stm) => {
          return {
            ...stm,
            payload: {
              ...stm.payload,
              data: stm.payload.data.map((block) => {
                const newBlock = {
                  id: block.id,
                  description: block.attributes.data,
                };
                return newBlock;
              }),
            },
          };
        }),
        catchError((error) =>
          of(
            blocksActions.getBlockFailure({
              node: action.payload.node,
              error: error,
            })
          )
        ),
        takeUntil(action$.pipe(ofType(GET_BLOCK_FAILURE)))
      )
    )
  );
}

export default blocksEpic;
