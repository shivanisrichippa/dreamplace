// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';

// const RelatedProducts = ({ category }) => {
//   const { products } = useContext(ShopContext);
//   const [related, setRelated] = useState([]);

//   useEffect(() => {
//     if (products.length > 0) {
//       const filteredProducts = products
//         .filter((product) => product.category === category)
//         .slice(0, 5);
//       setRelated(filteredProducts);
//     }
//   }, [products, category]);

//   return (
//     <section className="product_section layout_padding">
//       <div className="container">
//         <div className="heading_container heading_center mb-4">
//           <h2>Related Products</h2>
//         </div>
//         <div className="row">
//           {related.map((product) => (
//             <div key={product._id} className="col-sm-6 col-lg-4 mb-4">
//               <div className="box">
//                 {/* Product Image */}
//                 <div className="img-box">
//                   <img src={product.image[0]} alt={product.name} />
//                   <a href={`/product/${product._id}`} className="add_cart_btn">
//                     <span>Know More</span>
//                   </a>
//                 </div>
//                 {/* Product Details */}
//                 <div className="detail-box">
//                   <h5>{product.name}</h5>
//                   <div className="product_info">
//                     <h5>
//                       <span>Rs.</span> {product.price}
//                     </h5>
//                     <div className="star_container">
//                       <i className="fa fa-star" aria-hidden="true"></i>
//                       <i className="fa fa-star" aria-hidden="true"></i>
//                       <i className="fa fa-star" aria-hidden="true"></i>
//                       <i className="fa fa-star" aria-hidden="true"></i>
//                       <i className="fa fa-star" aria-hidden="true"></i>
//                     </div>
//                   </div>
//                   <p className="category">Category: {product.category}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RelatedProducts;





import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const RelatedProducts = ({ category }) => {
  const { houses } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (houses.length > 0 && category) {
      const filteredProducts = houses
        .filter((house) => house.category === category)
        .slice(0, 5); // Limit to 5 related products
      setRelated(filteredProducts);
    }
  }, [houses, category]);

  return (
    <section className="product_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center mb-4">
          <h2>Related Products</h2>
        </div>
        <div className="row">
          {related.length > 0 ? (
            related.map((house) => (
              <div key={house._id} className="col-sm-6 col-lg-4 mb-4">
                <div className="box">
                  <div className="img-box">
                    <img src={house.images[0] || 'placeholder.png'} alt={house.name} />
                    <a href={`/house/${house._id}`} className="add_cart_btn">
                      <span>Know More</span>
                    </a>
                  </div>
                  <div className="detail-box">
                    <h5>{house.name}</h5>
                    <div className="product_info">
                      <h5><span>Rs.</span> {house.price}</h5>
                      <div className="star_container">
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                      </div>
                    </div>
                    <p className="category">Category: {house.category}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
