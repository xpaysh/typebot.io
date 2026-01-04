import { createBlock } from "@typebot.io/forge";
import { createCheckout } from "./actions/createCheckout";
import { auth } from "./auth";
import { XPayLogo } from "./logo";

export const xpayBlock = createBlock({
  id: "xpay",
  name: "xpay",
  tags: ["payments", "usdc", "crypto", "web3"],
  LightLogo: XPayLogo,
  auth,
  actions: [createCheckout],
  docsUrl: "https://docs.xpay.sh",
});
