function insertDecimal(num) {
    return (num / 100).toFixed(2);
}

const useGetPaintingDetails = (item) => {
    console.log("item props in useHook", item);
    
    const isNewProduct = item.newProduct;
    const isPromoProd = item.promotion;
    const price = insertDecimal(item.price);
    const tempPrice = item.price;
    const discount = item.discount;
    const discountPrice = insertDecimal(tempPrice - tempPrice * (discount / 100));
    let imgSrc = isNewProduct ? '/new.jpg' : '/transp.jpg';
    const mainImgSrc = item.images && item.images.length > 0 ? item.images[0].url : '';
    const id = item.id;
    const title = item.title;
    const stock = item.stock;

    return {
        isNewProduct,
        isPromoProd,
        price,
        tempPrice,
        discount,
        discountPrice,
        imgSrc,
        mainImgSrc,
        id,
        title,
        stock,
    };
};

export default useGetPaintingDetails;
