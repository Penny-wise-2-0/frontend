"use client";
import {
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOnExitMetadata,
  PlaidLinkError,
} from "react-plaid-link";
import { usePlaidLink } from "react-plaid-link";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { metadata } from "@/app/layout";
export default function PlaidLink() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { user } = useKindeBrowserClient();
  useEffect(() => {
    if (!user) return;
    const fetchLinkToken = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/plaid-link/link-token/${user.id}`
        );
        if (!res.ok) {
          console.error(res);
          throw new Error("Unable to fetch link token");
        }
        const parsedRes = await res.json();
        setLinkToken(parsedRes.link_token);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLinkToken();
  }, [user]);

  const config = {
    token: linkToken,
    onSuccess: async (
      publicToken: string,
      metadata: PlaidLinkOnSuccessMetadata
    ) => {
      const res = await fetch(
        "http://localhost:4000/plaid-link/exchange-public-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: user?.id,
            token: publicToken,
          }),
        }
      );
      if (!res.ok) {
        console.error(res);
        throw new Error("unable to exchange token");
      }
      const tokenExchangeRes = await res.json();
      setAccessToken(tokenExchangeRes);
    },
    onExit: (err: PlaidLinkError | null, metadata: PlaidLinkOnExitMetadata) => {
      if (err) {
        console.error("Plaid Link exited due to an error:", err);
      } else {
        console.log("Plaid Link exited without an error. Metadata:", metadata);
      }
    },
  };

  const { open, ready, error } = usePlaidLink(config);
  console.log(linkToken);
  console.log(accessToken);
  return (
    <div className="">
      <Button onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </Button>
    </div>
  );
}
