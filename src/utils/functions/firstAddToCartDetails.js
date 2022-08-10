import AddDoc from "./AddDoc";

export default async function firstAddToCartDetails (product, email) {
    // get all the product data
    const { category, description, imgUrl, name, prix, stock, id } = product;

    await AddDoc('panier', {
      addedBy: email,
      category,
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