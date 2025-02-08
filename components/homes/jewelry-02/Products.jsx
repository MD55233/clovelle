"use client";
import React, { useEffect, useState } from "react";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Products4({ parentClass = "" }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const IMAGE_HOST_LINK = process.env.NEXT_PUBLIC_IMAGE_HOST_LINK || "";

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch("/api/products"); // Fetch products from API
        const data = await res.json();

        // Filter only featured products
        const filteredProducts = data.filter((product) => product.isFeatured);
        setFeaturedProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Today's Top Picks</h3>
          <p className="subheading text-secondary">
            Fresh styles just in! Elevate your look.
          </p>
        </div>
        <Swiper
          className="swiper tf-sw-latest"
          dir="ltr"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 4, spaceBetween: 30 },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd58",
          }}
        >
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <SwiperSlide key={product._id} className="swiper-slide">
              <ProductCard1 
                product={{ 
                  ...product, 
                  image: product.images?.length > 0 ? `${IMAGE_HOST_LINK}${product.images[0].url}` : "/default-image.jpg" 
                }} 
              />
            </SwiperSlide>
            
            ))
          ) : (
            <p className="text-center">No featured products available.</p>
          )}
          <div className="sw-pagination-latest sw-dots type-circle justify-content-center spd58" />
        </Swiper>
      </div>
    </section>
  );
}
