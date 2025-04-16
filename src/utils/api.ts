const myHeaders = new Headers();
myHeaders.append(
  "Cookie",
  "_us=1744905554; ad-con=%7B%26quot%3Bdate%26quot%3B%3A%26quot%3B2025-04-16%26quot%3B%2C%26quot%3Bads%26quot%3B%3A%5B%5D%7D; PHPSESSID=9lbo6qann22m9gps8gh25bticu; mode=day"
);

const requestOptions: RequestInit = {
  method: "POST",
  headers: myHeaders,
  redirect: "follow",
};

export const getAccessToken = async () => {
  const formdata = new FormData();
  formdata.append("server_key", "105b1bb6bb635934dc758a8831a201ac");
  formdata.append("username", "admin");
  formdata.append("password", "Possible@2024");
  formdata.append("device_type", "windows");

  try {
    const response = await fetch("https://waocard.co/app/api/auth", {
      ...requestOptions,
      body: formdata,
    });
    const result = await response.text();
     const data = JSON.parse(result);
     return data
  } catch (error) {
    console.error(error);
    return {};
  }
};




export interface Event {
  id: string;
  name: string;
  description: string;
  start_date: string;
  start_time: string;
  cover: string;
  url: string;
}


export const getEvents = async (accessToken: string): Promise<Event[]> => {
  const getEventsHeaders = new Headers(myHeaders);
  getEventsHeaders.append("Cookie", "_us=1744906075; ad-con=%7B%26quot%3Bdate%26quot%3B%3A%26quot%3B2025-04-16%26quot%3B%2C%26quot%3Bads%26quot%3B%3A%5B%5D%7D; PHPSESSID=9lbo6qann22m9gps8gh25bticu; mode=day");
  const formdata = new FormData();
  formdata.append("server_key", "105b1bb6bb635934dc758a8831a201ac");
  formdata.append("fetch", "events");
  try {

    const response = await fetch(
      `https://waocard.co/app/api/get-events?access_token=${accessToken}`,
      { ...requestOptions, headers: getEventsHeaders,body: formdata}
    );
    const result = await response.json();
    return result.events || [];
  } catch (error) {
    
    console.error("Error fetching events:", error);
    return [];
  }
};

