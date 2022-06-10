import { base_url, eventManager, homePage } from "../../constants/urls";
import { STATUS_FAILED, STATUS_SUCCESS } from "../../constants/errorHandler";
import Log, { logApiRequest } from "../../constants/logger";
import { logAndCreateErrorMessage } from "../../validations/validations";

export async function postEventManager(myContext) {
  const { id, token } = myContext;
  let functionName = "Post Event Manager";
  let url = base_url + eventManager(id);
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  logApiRequest(functionName, url, request, myContext);
  await fetch(url, request, { timeout: 2000 })
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        logAndCreateErrorMessage(data, functionName);
      } else if (STATUS_SUCCESS(res.status)) {
        console.log("POST is-event-manager SUCCESS");
      }
    })
    .catch((error) => console.log("postEventManager catch error", error));
}

export async function getIsEventManager(myContext) {
  const { id, token } = myContext;
  let functionName = "Get Is Event Manager";
  let url = base_url + eventManager(id);
  let request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  logApiRequest(functionName, url, request, myContext);
  await fetch(url, request, { timeout: 2000 })
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        logAndCreateErrorMessage(data, functionName);
      } else if (STATUS_SUCCESS(res.status)) {
        if (!data.is_event_manager) {
          await postEventManager(myContext);
        } else {
          //console.log("GET is-event-manager SUCCESS >> already event-manager");
        }
      }
    })
    .catch((error) => console.log("onPressRegister error", error));
}

export async function getHomePageData(myContext, setEventsPreview) {
  const { id, token, setIsLoading } = myContext;
  let functionName = "getHomePageData";
  let url = base_url + homePage(id);
  let request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  };
  logApiRequest(functionName, url, request, myContext);
  await fetch(url, request, { timeout: 2000 })
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        logAndCreateErrorMessage(data, functionName);
      } else if (STATUS_SUCCESS(res.status)) {
        if (!data.events) {
          Log.error("getHomePageData error", error);
        } else {
          Log.info("GET home page SUCCESS >> already event-manager");
          setEventsPreview(data.events);
        }
        setIsLoading(false);
      }
    })
    .catch((error) => console.log("onPressRegister error", error));
}
