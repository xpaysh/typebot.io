import { createActionHandler } from "@typebot.io/forge";
import { createCheckout } from "../actions/createCheckout";

const API_BASE = "https://cja09z457f.execute-api.us-east-1.amazonaws.com/dev";

export const createCheckoutHandler = createActionHandler(createCheckout, {
  server: async ({
    credentials: { apiKey },
    options: {
      productName,
      description,
      price,
      environment,
      collectEmail,
      recipientWallet,
      redirectUrl,
      saveCheckoutUrlTo,
    },
    variables,
  }) => {
    if (!productName || !price || apiKey === undefined) {
      return;
    }

    // Derive network and testMode from environment
    let testMode = true;
    let network = "base-sepolia";
    if (environment === "staging") {
      testMode = false;
      network = "base-sepolia";
    } else if (environment === "production") {
      testMode = false;
      network = "base";
    }

    // Validate recipient wallet if provided
    if (recipientWallet && !/^0x[a-fA-F0-9]{40}$/.test(recipientWallet)) {
      console.error("Invalid wallet address format");
      return;
    }

    // Build fields array
    const fields: Array<{
      name: string;
      label: string;
      type: string;
      required: boolean;
    }> = [];

    if (collectEmail !== false) {
      fields.push({
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
      });
    }

    try {
      const response = await fetch(`${API_BASE}/v1/webhooks/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          callback_url: "",
          config: {
            product_name: productName,
            description: description || "",
            price: parseFloat(price),
            currency: "USDC",
            network: network,
            recipient_wallet: recipientWallet || "",
            fields: fields,
            redirect_url: redirectUrl || "",
            test_mode: testMode,
            bundles_enabled: false,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to create checkout: ${errorText}`);
        return;
      }

      const data = await response.json();

      // Save checkout URL to the specified variable
      if (saveCheckoutUrlTo) {
        variables.set(saveCheckoutUrlTo, data.checkout_url);
      }
    } catch (error) {
      console.error("Failed to create checkout:", error);
    }
  },
});
