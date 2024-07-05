const useGetPaintingDetails = (item) => {
    // Helper function to insert decimal
    const insertDecimal = (num) => {
        return (num / 100).toFixed(2);
    };

    // Safely accessing properties with optional chaining and nullish coalescing
    const isNewProduct = item?.newProduct ?? false;
    const isPromoProd = item?.promotion ?? false;
    const price = insertDecimal(item?.price ?? 0);
    const tempPrice = item?.price ?? 0;
    const discountPercent = item?.discountPercent ?? 0;
    const discountPrice = insertDecimal(tempPrice - tempPrice * (discountPercent / 100));
    const imgSrc = isNewProduct ? '/new.jpg' : '/transp.jpg';
    const mainImgSrc = item?.images?.[0]?.url ?? '';
    const mainImagesSrc = item?.images ?? [];
    const id = item?.id ?? '';
    const title = item?.title ?? '';
    const subtitle = item?.subtitle ?? '';
    const mainContent = item?.description?.raw?.children ?? '';
    const stock = item?.stock ?? 0;
    const numItems = 1;

    console.log('Item passed to useGetPaintingDetails:', item);
    console.log('Computed details:', {
        isNewProduct,
        isPromoProd,
        price,
        tempPrice,
        discountPercent,
        discountPrice,
        imgSrc,
        mainImgSrc,
        mainImagesSrc,
        id,
        title,
        subtitle,
        mainContent,
        stock,
        numItems,
    });

    return {
        isNewProduct,
        isPromoProd,
        price,
        tempPrice,
        discountPercent,
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




