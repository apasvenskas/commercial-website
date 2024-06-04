
const useGetPaintingDetails = (item) => {
    // console.log("item description custome", item.description.raw.children);

    const insertDecimal = (num) => {
        return (num / 100).toFixed(2);
    };

    const isNewProduct = item && item.isNewProduct ? item.isNewProduct : false;
    const isPromoProd = item && item.promotion ? item.promotion : false;
    const price = insertDecimal(item && item.price ? item.price : 0);
    const tempPrice = item && item.price ? item.price : 0;
    const discount = item && item.discount ? item.discount : 0;
    const discountPrice = insertDecimal(tempPrice - tempPrice * (discount / 100));
    let imgSrc = isNewProduct ? '/new.jpg' : '/transp.jpg';
    
    // Correctly accessing the images array
    const mainImgSrc = item && item.images && item.images.length > 0 ? item.images[0].url : '';
    const id = item && item.id ? item.id : '';
    const title = item && item.title ? item.title : '';
    const subtitle = item && item.subtitle ? item.subtitle : '';
    const mainContent = item && item.description.raw.children ? item.description.raw.children : '';
    const stock = item && item.stock ? item.stock : 0;

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
        subtitle,
        stock,
        mainContent
    };
};

export default useGetPaintingDetails;


