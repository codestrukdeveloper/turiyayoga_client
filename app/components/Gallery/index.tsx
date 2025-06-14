"use client";

import React, { useEffect, useState } from "react";
import { fetchGalleryImages } from "@/app/services/galleryService";
import { BASE_URL_IMAGE } from "@/app/utils/config";

interface GalleryImage {
  id?: number;
  file: string;
}

const Gallery: React.FC = () => {
  const [galleryData, setGalleryData] = useState<GalleryImage[]>([]);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getImages = async () => {
      try {
        const data = await fetchGalleryImages();
        setGalleryData(data);
      } catch (err) {
        console.error("Failed to fetch gallery images", err);
      }
    };
    getImages();
  }, []);

  const handleImgDialog = (index: number) => {
    setCurrentIndex(index);
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === galleryData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="gallery" className="global_wrapper">
      <div className="container-fluid">
        <div id="image-gallery">
          <div className="row">
            {galleryData.map((image, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12 image"
              >
                <div
                  className="img-wrapper"
                  onClick={() => handleImgDialog(index)}
                >
                  <img
                    src={`${BASE_URL_IMAGE}/images/gallery/${image.file}`}
                    alt={`Gallery image ${index + 1}`}
                    className="img-responsive"
                  />
                  <div className="img-overlay">
                    <i className="fa fa-plus-circle" aria-hidden="true" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOverlayVisible && (
        <div id="overlay">
          <div id="prevButton">
            <i className="bx bx-chevron-left" onClick={handlePrev} />
          </div>
          <img
            src={`${BASE_URL_IMAGE}/images/gallery/${galleryData[currentIndex]?.file}`}
            style={{ width: "60%" }}
            alt={`Gallery Image ${currentIndex + 1}`}
          />
          <div id="nextButton">
            <i className="bx bxs-chevron-right" onClick={handleNext} />
          </div>
          <div id="exitButton">
            <i className="bx bx-x" onClick={handleCloseOverlay} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
