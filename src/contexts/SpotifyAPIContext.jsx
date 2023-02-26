import { Buffer } from "buffer";
import { createContext, useContext, useEffect, useState } from "react";

const SpotifyAPIContext = createContext();

export function useSpotifyAPI() {
  return useContext(SpotifyAPIContext);
}

export default function SpotifyAPIProvider({ children }) {
  const [token, setToken] = useState();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function get_token() {
      const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
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
      const access_token = res_json["access_token"];
      setToken(access_token);
      const featured_playlists = await getFeaturedPlaylists(access_token);
      setPlaylists(featured_playlists);
    }
    get_token();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getTrackIDFromSearch(searchVal) {
    const api_url = "https://api.spotify.com/v1";
    const query = new URLSearchParams();
    query.append("q", searchVal);
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
    const track_json = await artist.json();
    return track_json["id"];
  }

  async function getTrackFromSearch(track_name) {
    const api_url = "https://api.spotify.com/v1";
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
    const track_json = await artist.json();
    const ret = {
      name: track_json["name"],
      url: track_json["external_urls"]["spotify"],
      popularity: track_json["popularity"],
      artists: track_json["artists"],
      duration: track_json["duration_ms"],
      image: track_json["album"]["images"],
    };
    return ret;
  }

  async function getTrackFromID(track_id) {
    const api_url = `https://api.spotify.com/v1/tracks/${track_id}`;
    const track = await fetch(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const track_json = await track.json();
    const ret = {
      id: track_id,
      name: track_json["name"],
      url: track_json["external_urls"]["spotify"],
      popularity: track_json["popularity"],
      artists: track_json["artists"],
      duration: track_json["duration_ms"],
      image: track_json["album"]["images"],
    };
    return ret;
  }

  async function getPlaylist(playlist_id, curr_token) {
    const api_url = `https://api.spotify.com/v1/playlists/${playlist_id}`;
    const res = await fetch(api_url, {
      headers: {
        Authorization: `Bearer ${curr_token}`,
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }

  async function getFeaturedPlaylists(curr_token) {
    const api_url = `https://api.spotify.com/v1/browse/featured-playlists`;
    const query = new URLSearchParams();
    query.append("country", "US");
    query.append("limit", 5);
    const headers = {
      Authorization: `Bearer ${curr_token}`,
      "Content-Type": "application/json",
    };
    const res = await fetch(`${api_url}?${query}`, {
      headers: headers,
    });
    const res_json = await res.json();
    let playlists = res_json["playlists"]["items"];
    playlists = await Promise.all(
      playlists.map(({ id }) => getPlaylist(id, curr_token))
    );
    return playlists;
  }

  const value = {
    playlists,
    getTrackFromSearch,
    getTrackFromID,
    getTrackIDFromSearch,
    getFeaturedPlaylists,
  };
  return (
    <SpotifyAPIContext.Provider value={value}>
      {children}
    </SpotifyAPIContext.Provider>
  );
}
