import { useState } from "react";

function ListItem({item, removeItem, toggleItemStatus, editItem}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        category: item.category
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        editItem(item.id, editValue);
        setIsEditing(false);
    };

    return (
        <li className={`list-item ${item.bought ? 'bought' : ''}`}>
            {isEditing ? (
                <>
                <div className="edit-item-container">
                <input 
                    type="text"
                    value={editValue.name} 
                    onChange={(e) => setEditValue({...editValue, name: e.target.value})}
                />
                <input 
                    type="number"
                    value={editValue.quantity} 
                    onChange={(e) => setEditValue({...editValue, quantity: parseFloat(e.target.value)})}
                    min="1"
                />
                <select 
                    value={editValue.unit}
                    onChange={(e) => setEditValue({...editValue, unit: e.target.value})}
                >
                    <option value="Stück">Stück</option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="Liter">Liter</option>
                </select>
                <input 
                    type="number"
                    value={editValue.price}
                    onChange={(e) => setEditValue({...editValue, price: parseFloat(e.target.value)})} 
                    step="0.01"
                    min="0"
                />
                <select
                    value={editValue.category}
                    onChange={(e) => setEditValue({...editValue, category: e.target.value})}
                >
                    <option value="Lebensmittel">Lebensmittel</option>
                    <option value="Drogerieartikel">Drogerieartikel</option>
                </select>
                <button onClick={handleSave}>Speichern</button>
                </div>
                </>
            ) : (
                <>
                <span onClick={() => toggleItemStatus(item.id)}>
                    {item.bought ? <s>{item.name}</s> : item.name} - {item.quantity} {item.unit} - € {item.price.toFixed(2)}
                </span>
                <div className="button-container">
                <button onClick={handleEdit}>Bearbeiten</button>
                <button onClick={() => removeItem(item.id)}>Entfernen</button>
                </div>
                
                </>
            )}
        </li>
    );
}
export default ListItem;