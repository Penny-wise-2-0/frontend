import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Overview() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let parsedRes;
  const res = await fetch(`http://localhost:4000/plaid-product/get-transactions/${user?.id}`);
  if (!res.ok) {
    console.error(res);
  } else {
    parsedRes = await res.json();
    console.log(parsedRes);
  }
    console.log(parsedRes)

    
  return <div></div>;
}
