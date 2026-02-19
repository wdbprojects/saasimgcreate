"use client";

import ProductList from "../products/product-list";
import { IProdutsData } from "@/config/types";

const FeaturedProducts = ({ products }: { products: IProdutsData[] }) => {
  return (
    <ProductList products={products} title="Featured Products" limit={4} />
  );
};

export default FeaturedProducts;
