import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dogs() {
  const [dogUrl, setDogUrl] = useState("");

  // other APIs: https://portal.thatapicompany.com/pages/dog-api
  // how to use The Dog API : https://documenter.getpostman.com/view/5578104/2s935hRnak

  // key가 없으면 응답은 10개씩

  useEffect(() => {
    console.log("로드");

    const API_URL =
      "https://api.thedogapi.com/v1/images/search?size=small&format=json&has_breeds=true&order=ASC&page=0&limit=10";
    axios.get(API_URL).then((res) => {
      console.log(res);
      setDogUrl(res.data[0].url);
    });
  }, []);

  return (
    <div>
      <p>하이</p>
      {dogUrl && <img src={dogUrl} />}
    </div>
  );
}
