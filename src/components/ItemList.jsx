import ListItem from "./ListItem";

function ItemList({items, removeItem, toggleItemStatus, editItem}) {
    return (
        <ul className="list">
            {items.map((item) => (
                <ListItem
                key={item.id}
                item={item}
                removeItem={removeItem}
                toggleItemStatus={toggleItemStatus}
                editItem={editItem}
                />
            ))}
        </ul>
    );
}

export default ItemList;