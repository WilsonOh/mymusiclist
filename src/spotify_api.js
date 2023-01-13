import { Buffer } from "buffer";

export default async function GetTrack(track_name) {
  const api_url = "https://api.spotify.com/v1";
  const token = await get_token();
  const query = new URLSearchParams();
  query.append("q", track_name);
  query.append("type", "track");
  query.append("limit", 1);
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${api_url}/search?${query}`, {
    headers: headers,
  });

  const res_json = await res.json();

  const artist = await fetch(res_json["tracks"]["items"][0]["href"], {
    headers: headers,
  });

  const artist_json = await artist.json();

  const ret = {
    name: artist_json["name"],
    url: artist_json["external_urls"]["spotify"],
    popularity: artist_json["popularity"],
    artists: artist_json["artists"],
    duration: artist_json["duration_ms"],
    image: artist_json["album"]["images"],
  };
  return ret;
}

async function get_token() {
  const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;

  const CLIENT_CRED = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  const url = "https://accounts.spotify.com/api/token";

  let data = new URLSearchParams();
  data.append("grant_type", "client_credentials");

  const res = await fetch(url, {
    method: "post",
    headers: {
      Authorization: `Basic ${CLIENT_CRED}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data.toString(),
  });
  const res_json = await res.json();
  return res_json["access_token"];
}
