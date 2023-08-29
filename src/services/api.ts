export const fetchCoincapApi = async (id: string = "") => {
  const response = await fetch(`https://api.coincap.io/v2/assets/${id}`); //*
  if (!response) {
    throw new Response("", { status: 404, statusText: "Error" });
  }
  const result = await response.json();
  return result;
};

export const fetchData = async (page: number) => {
  const response = await fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${(page-1)*10}`);
  const json = await response.json();
  return json.data
}

export const fetchCurrentCoints = async(ids: string[]) => {
  const response = await fetch(`https://api.coincap.io/v2/assets?ids=${ids.join()}`);
  const json = await response.json();
  return json.data
}