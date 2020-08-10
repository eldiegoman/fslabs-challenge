import { combineEpics } from "redux-observable";
import blocks from "../state/modules/blocks/epics/blocks.epic";

export const rootEpic = combineEpics(blocks);
