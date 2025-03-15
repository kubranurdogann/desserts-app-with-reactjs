import './App.css';
import { products, Product } from './data.ts';
import { useState } from 'react';

interface CartItem extends Product {
  quantity: number;
}

function ProductList({
  products,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  cart,
}: {
  products: Product[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number, event: React.MouseEvent) => void;
  decreaseQuantity: (id: number, event: React.MouseEvent) => void;
  cart: CartItem[];
}) {
  const [hoverStates, setHoverStates] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleMouseEnter = (index: number) => {
    setHoverStates((prev) => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index: number) => {
    setHoverStates((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <div className="row">
      {products.map((product, index) => {
        const cartItem = cart.find((item) => item.id === product.id);
        return (
          <div key={index} className="col-lg-4 col-md-6 col-sm-12">
            <div className="product">
              <div className="ib">
                <img
                  src={product.image.desktop}
                  alt={product.name}
                  srcSet={`
    ${product.image.mobile} 480w,
    ${product.image.tablet} 768w,
    ${product.image.desktop} 1024w
  `}
                />
                <button
                  className="add-to-card"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  {hoverStates[index] ? (
                    <span className="d-flex">
                      <i
                        className="fa-solid fa-plus hover-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          cartItem
                            ? increaseQuantity(product.id, e)
                            : addToCart(product);
                        }}
                      ></i>
                      <span className="quantity px-3">
                        {cartItem ? cartItem.quantity : 0}
                      </span>
                      <i
                        className="fa-solid fa-minus hover-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          decreaseQuantity(product.id, e);
                        }}
                      ></i>
                    </span>
                  ) : (
                    <span>
                      <i className="fa fa-cart-plus"> </i> Add to Cart
                    </span>
                  )}
                </button>
              </div>
              <div className="product-title">
                <span className="category text-grey">{product.category}</span>
                <h6 className="fw-bold">{product.name}</h6>
                <span className="price">${product.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      if (!existingItem) return prevCart;

      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== id);
      }

      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h4 className="text-start title">Desserts</h4>
      <div className="row">
        <div className="col-lg-9 col-md-12">
          <ProductList
            products={products}
            addToCart={addToCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            cart={cart}
          />
        </div>

        <div className="col-lg-3">
          <div className="d-flex flex-column justify-content-start align-items-start">
            <div className="card-area">
              <h5 className="text-start card-title">
                Your Cart ({cart.length})
              </h5>
              {cart.length === 0 ? (
                <>
                  <img
                    className="empty-cart-icon"
                    src="./assets/images/illustration-empty-cart.svg"
                    alt=""
                  />
                  <div>
                    <span className="text-grey">
                      Your added items will appear here.
                    </span>
                  </div>
                </>
              ) : (
                <div>
                  {cart.map((item) => (
                    <div className="border-bottom">
                      <div className="row">
                        <div className="col-10">
                          <li key={item.id}>
                            <p className="product-name">{item.name}</p>
                            <div className="product-detail">
                              <span className="me-2">x{item.quantity}</span>{' '}
                              <span className="text-grey fw-normal me-1">
                                @ ${item.price}
                              </span>{' '}
                              <span className="text-grey">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </li>
                        </div>

                        <div className="col-2">
                          <i
                            className="fa-solid fa-circle-xmark mt-3"
                            onClick={() => removeFromCart(item.id)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="order-total">
                    <span>Order Total:</span>
                    <span className="total-price">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="carbon">
                    <img src="./assets/images/icon-carbon-neutral.svg"></img>{' '}
                    This is a <b>carbon-neutral</b> delivery
                  </div>
                  <button
                    className="classic-button"
                    data-bs-target="#exampleModalToggle"
                    data-bs-toggle="modal"
                  >
                    Confirm Order
                  </button>
                  <div
                    className="modal fade"
                    id="exampleModalToggle"
                    aria-hidden="true"
                    aria-labelledby="exampleModalToggleLabel"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <i className="fa-regular fa-circle-check"></i>
                        <h4 className="fw-bold mt-3">Order Confirmed</h4>
                        <span>We hope you enjoy your food!</span>
                        <div className="products">
                          {cart.map((item) => (
                            <li key={item.id}>
                              <div className="border-bottom">
                                <div className="row mb-2">
                                  <div className="col-10">
                                    <div className="d-flex">
                                      <div className="product-img">
                                        <img src={item.image.thumbnail}></img>
                                      </div>
                                      <div className="product-detail">
                                        <p className="product-name">
                                          {item.name}
                                        </p>
                                        <div>
                                          <span className="me-2 quantity">
                                            x{item.quantity}
                                          </span>
                                          <span className="fw-normal me-1">
                                            @ ${item.price}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-2 d-flex align-items-center">
                                    <span className="price">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                          <div className="order-total">
                            <span>Order Total:</span>
                            <span className="total-price">
                              ${totalPrice.toFixed(2)}
                            </span>
                          </div>
                          <button className="classic-button">
                            Start New Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
