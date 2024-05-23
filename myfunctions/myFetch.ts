export type ReturnType = "json" | "text";

const myFetch = async <T>(
  base_url: string,
  url_path: string,
  queryParams = "",
  method = "GET",
  body_data = {},
  return_type: ReturnType = "json",

  is_blob = false
) => {
  try {
    const url = `${base_url}/${url_path}?${queryParams}`;
    const headers = {
      "Content-Type":
        return_type === "json" ? "application/json" : "text/plain",
    };

    const res = await fetch(url, {
      method,
      headers,
      body: method !== "GET" ? JSON.stringify(body_data) : undefined,
    });

    const data = (is_blob
      ? await res.blob()
      : return_type === "json"
      ? await res.json()
      : await res.text()) as T;
    // console.log(`FETCHED ${base_url}: ${JSON.stringify(data)}`);
    return data;
  } catch (_e) {
    console.log("ERROR FETCHING");
    console.log(_e);
    return null;
  }
};

export default myFetch;
