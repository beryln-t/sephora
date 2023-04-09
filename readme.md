# Sephora Web Application

## Description of the Application

Sephora is a premier beauty and cosmetics retailer with a strong online presence as well as physical stores. The Sephora website is a comprehensive e-commerce platform, providing a wide range of makeup, skincare, hair care, fragrance, and beauty tools and accessories from multiple well-known brands. Our goal is to elevate the customer browsing and service booking experience by implementing a feature that enables them to effortlessly locate the nearest outlet with their desired products, as well as the option to choose from a diverse pool of expert makeup artists.

### Deployment

https://sephora.cyclic.app/

## Timeframe

7 Working Days

## Technologies & Tools Used

- React
- JavaScript
- CSS + Bootstrap
- Mongoose & Express
- Bcrypt (Hashing)
- JWT (Authentication)
- Mongo DB (Database)
- GitHub (version control)
- Cyclic (Deployment)

## Screenshots of the Application

---

## Model

![model](https://github.com/beryln-t/sephora/blob/jeremy/src/assets/readmeAssets/datamodel.png?raw=true)

## CRUD

### ADD Products to Location

```javascript
const addLocProduct = async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const productsToAdd = req.body.products;
    const location = await Location.findById(locationId);

    //check all product has quantity
    const hasMissingQuantity = productsToAdd.some(
      (product) => !product.productQty || product.productQty < 0
    );
    if (hasMissingQuantity) {
      throw new Error(
        "All selected products must have a non-negative quantity entered."
      );
    }

    // Check if selected products already exist in the location
    const existingProducts = location.products.map((product) =>
      product.productDetails.toString()
    );
    const newProducts = [];
    const existingProductNames = [];
    for (const product of productsToAdd) {
      if (existingProducts.includes(product.productId.toString())) {
        const existingProduct = await Product.findById(product.productId);
        existingProductNames.push(existingProduct.name);
      } else {
        newProducts.push({
          productDetails: product.productId,
          productQty: product.productQty,
        });
      }
    }

    if (existingProductNames.length > 0) {
      const message = `The following products already exist in the location, please select new products to add: ${existingProductNames.join(
        ", "
      )}`;
      throw new Error(message);
    }

    location.products.push(...newProducts);

    const updatedLocation = await location.save();

    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

### Edit Product

```javascript
const updateProducts = async (req, res) => {
  try {
    const updatedName = req.body.name;
    const existingProduct = await Products.findOne({ name: updatedName });
    if (existingProduct && existingProduct._id.toString() !== req.params.id) {
      throw new Error("Another product with the same name already exists");
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

### Show Something

```javascript
const show = async (req, res) => {
  const { id } = req.params;

  try {
    const mkaeupArtist = await MakeupArtist.find({ _id: id }).populate(
      "location.id"
    );
    res.status(200).json(mkaeupArtist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

### Delete Something

```javascript
const deleteMakeupArtist = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    await Appointment.deleteMany({ "makeupArtist.id": id });

    // Find and delete the makeup artist
    const findMakeUpArtist = await MakeupArtist.findByIdAndDelete(id);

    if (!findMakeUpArtist) {
      return res.status(404).json({ error: "Makeup Artist not found" });
    }

    res.status(200).json({ message: "Makeup Artist deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

## Key Learning

## References

- https://www.sephora.sg/ (Image and Product resource)
- https://getbootstrap.com/ (CSS)
