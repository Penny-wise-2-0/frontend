const baseUrl = process.env.GATEWAY_BASE_URL;

export const fetchComparision = async (id: string) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/gateway/transactions/by-month/${id}`,
      {
        cache: "force-cache",
      }
    );
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

export const fetchTransactions = async (id: string) => {
  const res = await fetch(
    `${process.env.GATEWAY_BASE_URL}/api/gateway/transactions/${id}`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    console.error(res);
  }
  return await res.json();
};

export const ingestTransactions = async (id: string) => {
  const res = await fetch(
    `http://localhost:4000/plaid-product/sync-transactions/${id}`,
    {
      "cache": "no-cache"
    }
    
  );

  if (!res.ok) {
    console.error(res);
  }
  return await res.json();
};
