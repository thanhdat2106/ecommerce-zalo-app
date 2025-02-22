const Skeleton = () => {
  return (
    <div className="relative bg-white rounded-2xl p-4 border mb-2 animate-pulse">
      {/* Ảnh Skeleton */}
      <div className="relative w-full h-[200px] bg-gray-300 rounded-lg"></div>

      {/* Danh mục sản phẩm */}
      <div className="absolute top-2 right-2 bg-gray-300 text-white text-sm px-4 py-2 rounded-full w-16 h-6"></div>

      {/* Tiêu đề */}
      <div className="h-5 bg-gray-300 rounded mt-4 w-3/4"></div>

      {/* Mô tả */}
      <div className="h-4 bg-gray-300 rounded mt-2 w-full"></div>
      <div className="h-4 bg-gray-300 rounded mt-2 w-5/6"></div>

      {/* Giá & Nút Mua Ngay */}
      <div className="relative flex justify-between items-center mt-4 bg-gray-200 p-4 rounded-lg">
        <div className="h-6 bg-gray-300 rounded w-20"></div>
        <div className="h-8 bg-gray-300 rounded-full w-24"></div>
      </div>
    </div>
  );
};

export default Skeleton;
