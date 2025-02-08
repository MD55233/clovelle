"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const IMAGE_HOST_LINK = process.env.NEXT_PUBLIC_IMAGE_HOST_LINK || "";

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories"); // Fetch categories from API
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center">
          <h3 className="heading">Popular Categories</h3>
        </div>
        <div className="flat-collection-circle">
          <Swiper
            slidesPerView={6}
            breakpoints={{
              1024: { slidesPerView: 6 },
              768: { slidesPerView: 4 },
              576: { slidesPerView: 3 },
              0: { slidesPerView: 2 },
            }}
            spaceBetween={15}
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true, el: ".spd60" }}
            navigation={{ prevEl: ".snbp14", nextEl: ".snbn14" }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category._id}>
                <div className="collection-circle hover-img">
                  <Link href={`/shop/${category.slug}`} className="img-style radius-48">
                    <div className="image-container">
                      <Image 
                        src={`${IMAGE_HOST_LINK}${category.image}`} 
                        alt={category.name} 
                        width={150} 
                        height={150} 
                        style={{ objectFit: "cover" }} 
                      />
                    </div>
                  </Link>
                  <p className="category-name">{category.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <style jsx>{`
        .image-container {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto; /* Centers the container */
        }

        .category-name {
          text-align: center;
          margin-top: 10px;
          font-weight: bold;
          font-size: 14px;
        }

        .collection-circle {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </section>
  );
}
