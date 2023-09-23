
import { serve } from "./deps.js";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as addressService from "./services/addressService.js";

configure({
    views: `${Deno.cwd()}/views/`,
  });
const responseDetails = {
headers: { "Content-Type": "text/html;charset=UTF-8" },
};
const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
      status: 303,
      headers: {
      "Location": path,
      },
  });
  };

/** Adding messages to the list */
const addmessages = async (request) => {
    const formData = await request.formData();
    let userName = formData.get("sender");
    let message = formData.get("message");
    if (message === "" || userName === "") {
      return redirectTo("/");
    } else
    await addressService.create(userName, message);
    return redirectTo("/");
  };

/** list all the messages  */
const listMessages = async (request) => {
const data = {messages: await addressService.findAll(),};
return new Response(await renderFile("index.eta", data), responseDetails);
};


const handleRequest = async (request) => {
    const url = new URL(request.url);
    if (request.method === "POST") {
      return await addmessages(request);
    } else {
      return await listMessages(request);
    }
  };

serve(handleRequest, { port: 7777 });
