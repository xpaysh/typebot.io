import { createAuth, option } from "@typebot.io/forge";

export const auth = createAuth({
  type: "encryptedCredentials",
  name: "xpay account",
  schema: option.object({
    apiKey: option.string.layout({
      label: "API Key",
      isRequired: true,
      inputType: "password",
      helperText: "Get your API key from app.xpay.sh",
      withVariableButton: false,
      isDebounceDisabled: true,
    }),
  }),
});
