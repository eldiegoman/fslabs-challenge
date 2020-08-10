import { from } from "rxjs";
import fetch from "cross-fetch";

export default (node) => {
  const req = fetch(`${node.url}/api/v1/blocks`)
    .then((res) => res.json())
    .catch((err) => err);
  return from(req);
};
