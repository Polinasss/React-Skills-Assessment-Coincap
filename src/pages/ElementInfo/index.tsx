import React, { Suspense } from "react";
import { useNavigate, useLoaderData, Await } from "react-router-dom";
import { IElementInfo } from "../../types";

const ElementInfo: React.FC = () => {
  const { data } = useLoaderData() as IElementInfo;
  const navigate = useNavigate();
  return (
    <>
      <Suspense fallback={<h2>loading...</h2>}>
        <Await resolve={data}>
          {({ data }) => (
            <>
              <p>{data.id}</p>
              <p>{data.name}</p>
              <button onClick={() => navigate(-1)}>go Back</button>
              {/* <Chart/> */}
            </>
          )}
        </Await>
      </Suspense>
      
    </>
  );
};

export const elementInfoLoader = async ({ params }: any) => {
  const id = params.id;
  const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
  const data = await response.json();
  return { data, id };
};

export default ElementInfo;
