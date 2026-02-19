import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { routes } from "@/config/routes";
import { IProdutsData } from "@/config/types";
import { Apple, ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductList = ({
  products,
  title,
  limit,
}: {
  products: IProdutsData[];
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? products.slice(0, limit) : products;

  return (
    <div className="my-10">
      <h2 className="mb-4 text-center text-2xl font-semibold">{title}</h2>
      {limitedData.length > 0 ? (
        <div className="xs:grid-cols-2 3xl:grid-cols-6 grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {limitedData.map((product) => {
            return (
              <div key={product.id} className="gap-4 border border-blue-500">
                <div className="border">
                  <h2>{product.name}</h2>
                  <Image
                    width={100}
                    height={100}
                    src={product.images[0]}
                    alt={product.name}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Empty className="border-muted mt-8 max-w-sm border border-solid">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Apple />
              </EmptyMedia>
              <EmptyTitle>No Products to Show</EmptyTitle>
              <EmptyDescription>
                Please browse our entire catalog
              </EmptyDescription>
            </EmptyHeader>

            <Button
              variant="default"
              nativeButton={false}
              render={
                <Link href={routes.products}>
                  Browse All Products <ArrowUpRightIcon />
                </Link>
              }
              className="text-foreground"
              size="sm"
            ></Button>
          </Empty>
        </div>
      )}
    </div>
  );
};

export default ProductList;
