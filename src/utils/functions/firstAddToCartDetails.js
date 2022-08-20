import AddDoc from "./AddDoc";

export default async function firstAddToCartDetails (product, userId, shop) {
    // get all the product data
    const { categoryId, description, imgUrl, name, prix, stock, id } = product;

    await AddDoc('panier', {
      ownedShop: shop,
      addedBy: userId,
      categoryId,
      description,
      productId: id,
      imgUrl,
      name,
      prix,
      quantities: 1,
      totalPrix: prix,
      stock
    });
  };