import { base_url, register } from "../../constants/urls";
import {
  createOneButtonAlert,
  STATUS_FAILED,
  STATUS_SUCCESS,
} from "../../constants/errorHandler";
import Log, { logApiRequest } from "../../constants/logger";
import { logAndCreateErrorMessage } from "../../validations/validations";

export async function registerUserRequest(
  user,
  emptyRegisterInputs,
  navigation
) {
  let functionName = "Register User Request";
  let url = base_url + register;
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  logApiRequest(functionName, url, request);
  await fetch(url, request, { timeout: 2000 })
    .then(async (res) => {
      const data = await res.json();
      if (STATUS_FAILED(res.status)) {
        logAndCreateErrorMessage(data, functionName);
      } else if (STATUS_SUCCESS(res.status)) {
        const message = "You have successfully registered!\nplease LOGIN";
        createOneButtonAlert(message, "OK", "Registration Succeeded", () =>
          navigation.navigate("Welcome")
        );
        emptyRegisterInputs();
      }
    })
    .catch((error) => {
      createOneButtonAlert("Server is soooo slow, you should check it...");
      Log.error("onPressRegister error", error);
    });
}
