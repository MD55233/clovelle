"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_NODE_BACKEND_HOST_LINK + "/api/banners";
const IMAGE_HOST = process.env.NEXT_PUBLIC_NODE_BACKEND_HOST_LINK;

export default function Hero() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch banners");
        const data = await response.json();
        const filteredBanners = data.filter(banner => ["item1", "item2", "item3"].includes(banner.className));
        setBanners(filteredBanners);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (loading) return (
    <section>
      <div className="container">
        <div className="loading-placeholder">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="skeleton-banner"></div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .loading-placeholder {
          display: flex;
          gap: 15px;
        }
        .skeleton-banner {
          width: 100%;
          height: 400px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </section>
  );

  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <div className="container">
        <div className="swiper tf-sw-mobile" data-screen={767} data-preview={1} data-space={15}>
          <div className="swiper-wrapper grid-cls-v2">
            {banners.map((banner) => (
              <div key={banner._id} className={`swiper-slide ${banner.className}`}>
                <div className="banner-cls hover-img">
                  <div className="img-style">
                    <Image
                      src={`${IMAGE_HOST}${banner.imgSrc}`}
                      alt={banner.alt || "banner"}
                      width={banner.imgWidth || 946}
                      height={banner.imgHeight || 1260}
                    />
                  </div>
                  <div className="cls-content">
                    <div className="box-title-cls wow fadeInUp">
                      <h3>
                        <Link href={banner.link} className="text-white link">
                          {banner.title}
                        </Link>
                      </h3>
                      <p className="text-white">{banner.description}</p>
                    </div>
                    <div className="wow fadeInUp" data-wow-delay={banner.wowDelay}>
                      <Link href={banner.link} className="tf-btn btn-fill btn-white radius-4">
                        <span className="text">{banner.btnText || "Shop Now"}</span>
                        <i className="icon icon-arrowUpRight" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="sw-pagination-mb sw-dots type-circle justify-content-center d-md-none d-flex" />
        </div>
      </div>
    </section>
  );
}