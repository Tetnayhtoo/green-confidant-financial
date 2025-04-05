import { useState,useEffect } from "react";

function Products() {
    const [ItemID, setItemID] = useState("");
    const [ItemName, setItemName] = useState("");
    const [ItemDesc, setItemDesc] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, seterror] = useState(null);

    console.log(import.meta.env);

    const BackendUrl = import.meta.env.VITE_BACKEND_URL;

    console.log("Backend URL:", BackendUrl);
    console.log("Fetching data from:", `${BackendUrl}api`);

    
    const [Item,setItem] = useState([{}]);

   useEffect(() => {
        
        const fetchData = async () => {
            console.log("Fetching data from:", `${BackendUrl}api`);
            try {
                const response = await fetch(`${BackendUrl}api`);
                const data = await response.json();
                console.log("Data fetched:");
                setItem(data);
            } catch (error) {
                seterror(error.message);
            }finally {
                setLoading(false);
            }
            
        };

        fetchData();
        
    },[])
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!Item) {
        return <div>No data available</div>;
    }
    console.log(Item);
    return (
    <>
        <div>
           {(loading) ? (
               <p>loading</p>
           ):
           (
               Item.item.map((item,i) => (
                   <p key = {i}>{item}</p>
               )
           ))
           }
       </div>
     
    </>
   );
 
   /*useEffect(() => {
    fetch(`${BackendUrl}api`).then(
        response => response.json()
    ).then(
        data => {
            setItem(data);

        }
    )
    },[]);

    return (
        <div>
          {(typeof Item.item === 'undefined') ? (
            <p>Loading...</p>
          ) : (
            Item.item.map((item, index) => (
              <div key={index}>
                <h2>{item}</h2>
              </div>
            ))
          )}
        </div>
    );


    

  */  
}


export default Products;
