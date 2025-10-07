
function App() 
{
  function ProductCard({ name, price, description, inStock }) 
  {
    if (inStock) 
      return <>
                <p>Product : {name}</p>
                <p>Price : {price} Rs</p>
                <p>Description : {description}</p>
                <button id="Btn">Buy Now</button>;
             </>

    else 
      return <>
                <p>Product : {name}</p>
                <p>Price : {price} Rs</p>
                <p>Description : {description}</p>
                <h1 style={{ color: "red" }}>Out of Stock!!</h1>;
             </>   
  
  }

  return (
    <ProductCard
      name="Laptop"
      price={50000}
      description="A high performing gaming laptop"
      inStock={false}
    />
  );
}

export default App;
