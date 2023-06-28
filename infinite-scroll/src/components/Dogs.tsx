// other APIs: https://portal.thatapicompany.com/pages/dog-api
// how to use The Dog API : https://documenter.getpostman.com/view/5578104/2s935hRnak

import React, { useEffect, useState } from "react";
import axios from "axios";

interface dogImgInterface {
  id: string;
  dogUrl: string;
}

export default function Dogs() {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dogImgArr, setDogImgArr] = useState<dogImgInterface[]>([]);

  // Intersection Observer 설정

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  /*
  handleObserver: 교차점이 발생했을 때 실행되는 콜백 함수.
  entries: 교차점 정보를 담는 배열
  isIntersecting: 교차점(intersection)이 발생한 요소의 상태
  교차점이 발생하면 page 1 증가
  */

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });
    // 최하단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById("observer");
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  // page 변경 감지에 따른 API호출
  useEffect(() => {
    fetchData();
    // console.log(page);
  }, [page]);

  // API를 호출하는 부분
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const API_URL = `https://api.thedogapi.com/v1/images/search?size=small&format=json&has_breeds=true&order=ASC&page=${page}&limit=10`;
      console.log(page);
      const response = await axios.get(API_URL);
      const newData = response.data.map(
        (dogImg: { id: string; url: string }) => ({
          id: dogImg.id,
          dogUrl: dogImg.url,
        })
      );
      // 불러온 데이터를 배열에 추가
      setDogImgArr((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="dog-imgs-container">
      {dogImgArr &&
        dogImgArr.map((dogImg: dogImgInterface) => (
          <div key={dogImg.id} className="dog-img-card">
            <img src={dogImg.dogUrl} />
            {/* <h4>HELLO | cute_{dogImg.id}</h4> */}
          </div>
        ))}
      <div id="observer" style={{ height: "10px" }}></div>
      {/* {isLoading && <p>Loading...</p>} */}
    </div>
  );
}
