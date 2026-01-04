import { createAction, option } from "@typebot.io/forge";
import { auth } from "../auth";

export const createCheckout = createAction({
  auth,
  name: "Create Checkout",
  options: option.object({
    productName: option.string.layout({
      label: "Product Name",
      isRequired: true,
      helperText: "Name displayed on the checkout page",
    }),
    description: option.string.layout({
      label: "Description",
      isRequired: false,
      helperText: "Brief description shown on checkout",
    }),
    price: option.string.layout({
      label: "Price (USDC)",
      isRequired: true,
      helperText: "Amount in USD (e.g., 5.00)",
    }),
    environment: option
      .enum(["development", "staging", "production"])
      .layout({
        label: "Environment",
        isRequired: true,
        defaultValue: "development",
        helperText:
          "Development: simulated, Staging: testnet, Production: mainnet",
      }),
    collectEmail: option.boolean.layout({
      label: "Collect Email",
      isRequired: false,
      defaultValue: true,
      helperText: "Require email before payment",
    }),
    recipientWallet: option.string.layout({
      label: "Recipient Wallet",
      isRequired: false,
      helperText: "Custom wallet address (0x...). Leave empty for default.",
    }),
    redirectUrl: option.string.layout({
      label: "Redirect URL",
      isRequired: false,
      helperText: "Where to send customers after payment",
    }),
    saveCheckoutUrlTo: option.string.layout({
      label: "Save Checkout URL to",
      inputType: "variableDropdown",
      isRequired: true,
      helperText: "Variable to store the generated checkout URL",
    }),
  }),
});
