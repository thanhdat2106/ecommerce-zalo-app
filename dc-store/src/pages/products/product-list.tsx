import React, { memo, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Product from "./product";
import { getProducts } from "@/apis/product.api";
import Skeleton from "@/components/skeletonProduct";

// Hàm fetch API với phân trang
const fetchProducts = async ({ pageParam = 1 }) => {
  const data = await getProducts();
  const itemsPerPage = 5;
  const start = (pageParam - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);

  return {
    data: paginatedData,
    nextPage: paginatedData.length ? pageParam + 1 : null,
  };
};

// Component ProductList
const ProductList = memo(() => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: fetchProducts,
      initialPageParam: 1, // Thêm initialPageParam để xác định trang đầu tiên
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined, // Sử dụng undefined khi không có trang tiếp theo
    });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductRef = useCallback(
    (node: HTMLDivElement) => {
      if (!hasNextPage || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Hiển thị Skeleton khi loading */}
      {isLoading ? (
        <div>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : (
        data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.data.map((product, index) => (
              <div
                ref={
                  i === data.pages.length - 1 && index === page.data.length - 1
                    ? lastProductRef
                    : null
                }
                key={product.id}
              >
                <Product product={product} />
              </div>
            ))}
          </React.Fragment>
        ))
      )}

      {/* Hiển thị Skeleton khi tải trang mới */}
      {isFetchingNextPage && (
        <div>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      )}
    </div>
  );
});

export default ProductList;
