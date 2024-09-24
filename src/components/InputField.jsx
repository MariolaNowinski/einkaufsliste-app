import { useState } from "react";

function InputField({addItem}) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState('Stück');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('Lebensmittel');

    // Formatierung

    const capitalizeFirstLetter = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const handleAdd = () => {
        if (name.trim()) {
            addItem({
                name: capitalizeFirstLetter(name.trim()),
                quantity: parseFloat(quantity),
                unit: unit,
                price: parseFloat(price),
                category: category,
                bought: false
            });
            // Zurücksetzen nach dem Hinzufügen
            setName('');
            setQuantity(1);
            setPrice(0);
            setUnit('Stück');
            setCategory('Lebensmittel');
        }
    };

    


    return (
        <div className="input-section">
            <label>Artikelname:
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(capitalizeFirstLetter(e.target.value))}
                    placeholder="Neuen Artikel hinzufügen" 
                />
            </label>
            <label>Menge:
                <input 
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Menge"
                    min='1' 
                />
            </label>
            <label>Einheit:
                <select value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                >
                    <option value="Stück">Stück</option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="Liter">Liter</option>
                </select>
            </label>
            <label>Preis pro Einheit:
                <input type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Preis"
                    step="0.01"
                    min="0"
                />
            </label>
            <label>Kategorie:
                <select value={category}
                        onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Lebensmittel">Lebensmittel</option>
                    <option value="Drogerieartikel">Drogerieartikel</option>
                </select>
            </label>
            <button onClick={handleAdd} className="addButton">Hinzufügen</button>
        </div>
    );
}

export default InputField;