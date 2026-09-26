import React from "react";
import ChecKoutComp from "../checKoutComp";
type props = {
  params: {
    cartId: string;
  };
};
export default async function checkout(props: props) {
  const params = await props.params;
  const { cartId } = params;
  console.log("params....", params);

  return (
    <>
      <ChecKoutComp cartId={cartId} />
    </>
  );
}
