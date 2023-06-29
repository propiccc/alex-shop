import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import axios from "axios";

function Loading() {
  return (<div className="bg-white p-10 w-full rounded-lg text-center font-semibold">
    Loading
  </div>)
}

function App() {
  // * setup
  const [block, setBlock] = useState(false);
  const [Produk, setProduk] = useState(null);

  // * function 
  const GetProduk = () => {
    setBlock(true);
    axios.get('https://dummyjson.com/products').then(res => {
      setProduk(res.data)
    }).catch(err => {
      console.log(err.response);
      setProduk(null);
    }).finally(() => {
      setBlock(false);
    })
  }


  // * effect 
  useEffect(() => {
    var a = true
    if (a) {
      GetProduk();
    }
    return () => a = false
  }, [])
  console.log(Produk);
  return (
    <div className="min-h-screen min-w-full">
      {/* <img src="https://png.pngtree.com/background/20211216/original/pngtree-cyberpunk-city-hd-background-picture-image_1540202.jpg" alt="" className="sticky -z-30 top-0 h-screen w-full" /> */}
      <div className="sticky top-1 z-30">
        <Navbar />
      </div>
      <div className="flex px-10 py-4 flex-wrap justify-center first-letter gap-5">
        {block ? (<Loading />) : (Produk?.products?.map((item, index) => (
          <>
            <div className="card w-96 bg-base-100 shadow-x h-fulll" key={index}>
              <figure><img src={item.thumbnail} alt={item.brand} /></figure>
              <div className="card-body">
                <h2 className="card-title">{item.brand}</h2>
                <p>{item.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </>
        )))}
        {/* Component Produv Start */}

        {/* Component Produv End */}

      </div>
    </div >
  )
}

export default App
