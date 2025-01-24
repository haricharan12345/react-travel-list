import { useState } from "react";




export default function App() {
  const [items, setItems] = useState([]);

    const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  }
  const handleDeleteItems = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  // for toggling the the checkbox using packed prroperty of the object

  const handleUpdateItems = (id) => {
    setItems((items)=>items.map((item)=>item.id===id ? {...item,packed:!item.packed}:item))
  }

  const handleClear = () => {
    const confirmed = window.confirm("do you want delete all items?? ");
    if(confirmed) setItems([]);
  }
  
  return (
    <div className="app">
      <Logo />
      {/* onAddItems just a name convention to add the method */}
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItems={handleDeleteItems}
        onUpdateItems={handleUpdateItems}
        onClearItems={handleClear} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
   return (
    <div >
     <h1>🐬Far away</h1>
    </div>
  );
}
 
function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [quatity, setQuatity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    //if no des is there return nothing
    if (!description) return;

    const newItem = { description, quatity, packed: false, id: Date.now() }
    console.log(newItem);
    onAddItems(newItem);

    // to set back to default value

    setDescription('')
    setQuatity(1)
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your trip</h3>
      <select value={quatity}
      onChange={(e)=>setQuatity(Number(e.target.value))}>
        {/* creates array of 20 items printing the index 
        _ indicates the item and i indicates the index*/}
        
        {Array.from({ length: 20 }, (_, i) => i + 1)
          .map((num) =>
            <option value={num} key={num}>{num}
            </option>)}
      </select>
      <input type="text" placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  );
}
 
function PackingList({ items, onDeleteItems, onUpdateItems,onClearItems }) {
  
  const [sortBy, setSortby] = useState("input");
  let sortedItems;
  //here slice will create the copy of the items array

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") sortedItems =
    items.slice().sort((a, b) => a.description.localeCompare(b.description));
  
  if (sortBy === "packed") sortedItems =
    items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed))


  return (
    <div className="list">
    <ul>
        {sortedItems.map((item) => <Item item={item} key={item.id} onDeleteItems={onDeleteItems}
          onUpdateItems={onUpdateItems} />)}
      </ul>
      <div className="actions">
        <select value={sortBy}
          onChange={(e) => setSortby(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear List</button>
      </div>
      </div>
  )
}
 
function Stats({ items }) {
  if (items.length === 0) return (
  <footer className="stats">
    <em>
      start adding items
    </em>
  </footer>)
  

  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const percentage=Math.round((numPacked/numItems)*100)
  return (
    <footer className="stats">
      <em>{percentage === 100 ? `you are ready to go` :
        `you have ${numItems} items on your list, and you already packed :${numPacked} and percentege ${percentage}%`}</em>
   </footer>
  )
}

function Item({ item ,onDeleteItems,onUpdateItems}) {
  return (
    <li>
      <input type="checkbox" value={item.packed}
      onChange={()=>onUpdateItems(item.id)}/>
      <span style={item.packed ? {textDecoration:"line-through"} : {}} >
          { item.quatity}
        {item.description}
      
      </span>
      <button onClick={()=>onDeleteItems(item.id)}>❌</button>
    </li>
    )
}


