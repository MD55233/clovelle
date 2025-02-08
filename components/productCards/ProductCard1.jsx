"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "../common/Countdown";
import { useContextElement } from "@/context/Context";

const IMAGE_HOST_LINK = process.env.NEXT_PUBLIC_IMAGE_HOST || "";

export default function ProductCard1({ product, gridClass = "" }) {
  const defaultImage = "/default-image.jpg";
  const initialImage = product.image ? `${IMAGE_HOST_LINK}${product.image}` : defaultImage;
  const [currentImage, setCurrentImage] = useState(initialImage);

  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(product.image ? `${IMAGE_HOST_LINK}${product.image}` : defaultImage);
  }, [product]);

  return (
    <div className={`card-product fadeInUp animated ${gridClass}`}>
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.id}`} className="product-img">
          <Image
            className="img-product"
            src={currentImage}
            alt={product.name || "Product Image"}
            width={600}
            height={800}
            layout="intrinsic"
            priority
          />
          {product.imgHover && (
            <Image
              className="img-hover fadeIn animated"
              src={`${IMAGE_HOST_LINK}${product.imgHover}`}
              alt={product.name || "Product Hover Image"}
              width={600}
              height={800}
              layout="intrinsic"
            />
          )}
        </Link>
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${product.id}`} className="title link fadeIn animated">
          {product.name}
        </Link>
        <span className="price fadeIn animated">
          {product.oldPrice && <span className="old-price">${product.oldPrice.toFixed(2)}</span>}
          ${product.price?.toFixed(2)}
        </span>
        <div className="list-product-btn fadeIn animated">
          <button onClick={() => addToWishlist(product.id)} className="btn-icon-action">
            <span className="icon icon-heart" />
            {isAddedtoWishlist(product.id) ? "Wishlisted" : "Wishlist"}
          </button>
          <button onClick={() => addToCompareItem(product.id)} className="btn-icon-action">
            <span className="icon icon-gitDiff" />
            {isAddedtoCompareItem(product.id) ? "Compared" : "Compare"}
          </button>
          <button onClick={() => setQuickViewItem(product)} className="btn-icon-action">
            <span className="icon icon-eye" /> Quick View
          </button>
        </div>
        <button className="btn-main-product fadeIn animated" onClick={() => addProductToCart(product.id)}>
          {isAddedToCartProducts(product.id) ? "Already Added" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}
