import serverless from "serverless-http";
import { appPromise } from "../../server";

// Build the Express application once per warm function instance; don't open a listening socket.
const wrappedHandler = appPromise.then((app) => serverless(app));

export const handler = async (event: any, context: any) => {
  const handler = await wrappedHandler;
  return handler(event, context);
};
