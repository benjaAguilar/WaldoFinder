import { useEffect, useState } from "react";
import { WaldoCard } from "../components/WaldoCard";
import { fetchData } from "../utils/fetchData";
import { ImagesDataArr } from "../types/waldoImages";

export function Home() {
  const [images, setImages] = useState<ImagesDataArr | null>(null);

  useEffect(() => {
    async function getWaldoImages() {
      const images = await fetchData("/image", "GET");

      if (images.success) setImages(images);
    }

    getWaldoImages();
  }, []);

  return (
    <div className="home">
      <h1>Waldo finder</h1>
      <p>Lets find waldo</p>
      <div className="grid">
        {images ? (
          images.images.map((image) => {
            return <WaldoCard imageData={image} key={image.id} />;
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
