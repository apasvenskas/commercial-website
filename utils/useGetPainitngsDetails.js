const useGetPaintingDetails = (item) => {
    // Helper function to insert decimal
    const insertDecimal = (num) => {
        return (num / 100).toFixed(2);
    };

    // Safely accessing properties with optional chaining and nullish coalescing
    const isNewProduct = item?.isNewProduct ?? false;
    const isPromoProd = item?.promotion ?? false;
    const price = insertDecimal(item?.price ?? 0);
    const tempPrice = item?.price ?? 0;
    const discount = item?.discount ?? 0;
    const discountPrice = insertDecimal(tempPrice - tempPrice * (discount / 100));
    const imgSrc = isNewProduct ? '/new.jpg' : '/transp.jpg';
    
    const mainImgSrc = item?.images?.[0]?.url ?? '';
    const mainImagesSrc = item?.images ?? [];
    const id = item?.id ?? '';
    const title = item?.title ?? '';
    const subtitle = item?.subtitle ?? '';
    const mainContent = item?.description?.raw?.children ?? '';
    const stock = item?.stock ?? 0;
    const numItems = 1;

    return {
        isNewProduct,
        isPromoProd,
        price,
        tempPrice,
        discount,
        discountPrice,
        imgSrc,
        mainImgSrc,
        mainImagesSrc,
        id,
        title,
        subtitle,
        stock,
        mainContent,
        numItems,
    };
};

export default useGetPaintingDetails;




