import React from 'react';
import { useState, useEffect } from 'react';
import InputField from "./components/InputField";
import ItemList from "./components/ItemList";
import { v4 as uuidv4 } from "uuid";  // Bibliothek für eindeutige IDs
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { de } from 'date-fns/locale/de';
import { TextField } from '@mui/material';
import { Card, CardContent, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { PanToolAlt } from "@mui/icons-material";
import './App.css'


function App() {
  const [items, setItems] = useState([]);
  const [nextShoppingDate, setNextShoppingDate] = useState(new Date());

  // Cards
  const [isFoodOpen, setIsFoodOpen] = useState(false);
  const [isDrogerieOpen, setIsDrogerieOpen] = useState(false);

  // Automatisierung der Verzögerung und span für einzelne Buchstaben

  useEffect(() => {
    const title = document.querySelector('h1');
    const letters = title.textContent.split('');
    title.innerHTML = letters.map((letter, index) => `<span style="--i: ${index + 1 }">${letter}</span>`).join('');
  }, []);

  // Laden der Liste aus dem Local Storage

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    const storedDate = localStorage.getItem('shoppingDate');

    if (storedItems) {
      setItems(storedItems);
    }

    if (storedDate) {
      setNextShoppingDate(new Date(storedDate));
    }
  }, []);

  // Speichern der Liste im Local Storage bei jeder Änderung

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('shoppingDate', nextShoppingDate);
  }, [items, nextShoppingDate]);

  // Hinzufügen eines neuen Items mit einer eindeutigen ID

  const addItem = (item) => {
    const newItem = {...item, id: uuidv4()};  // ID generieren
    setItems([...items, newItem]);
  };

  // Entfernen eines Items

  const removeItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  };

  // Umschalten des Status von gekauft/nicht gekauft

  const toggleItemStatus = (id) => {
    const newItems = items.map(item => item.id === id ? { ...item, bought: !item.bought } : item);
    setItems(newItems);
  };

  // Bearbeiten

  const editItem = (id, newValue) => {
    const newItems = items.map(item => item.id === id ? { ...item, ...newValue } : item);
    setItems(newItems);
  };

  // Filtern der Artikel nach Kategorie

  const filterItemsByCategory = (category) => {
    return items.filter(item => item.category === category);
  };

  // Berechnung des Gesamtpreises für eine bestimmte Kategorie

  const calculateTotalPrice = (category) => {
    return filterItemsByCategory(category).reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };



  // Berechnung des Gesamtpreises

  const calculateOverallTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className='app'>
      <div className='container'>
      <h1 className='animated-title'>Einkaufsliste</h1>
      <div className='datepicker-wrapper'>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
        <DatePicker 
        label="Nächster Einkauf"
        value={nextShoppingDate}
        onChange={(newDate) => setNextShoppingDate(newDate)}
        fullWidth
        slots={{textField: (props) => (
          <TextField
          {...props}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
                padding: "10px",
                width: "260px",
                border: "3px solid #007bff",
                
              },
              "&:hover fieldset": {
                borderColor: "#0056b3",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#007bff",
              },
              backgroundColor: "#242424",
            },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            input: { color: "white"},
            label: { 
              color: "white",
            fontSize: "18px"},
          
          }}
          />
        ),
        }}
        />
      </LocalizationProvider>
      </div>
      </div>
      <InputField addItem={addItem} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card className='category-card'>
            <CardContent>
              <Typography variant="h5" component="div">Lebensmittel</Typography>
              <Typography variant='body2'>Gesamtpreis: {calculateTotalPrice('Lebensmittel').toFixed(2)} €</Typography>
              <Button variant='contained'
                      onClick={() => setIsFoodOpen(!isFoodOpen)}>
                        {isFoodOpen ? 'Liste schließen' : 'Warenkorb anzeigen'}
                      </Button>
                      {isFoodOpen && (
                        <div className='item-list'>
                          <ItemList
                            items={filterItemsByCategory('Lebensmittel')}
                            removeItem={removeItem}
                            toggleItemStatus={toggleItemStatus}
                            editItem={editItem}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
        <Grid item xs={12} sm={6}>
          <Card className='category-card'>
            <CardContent>
              <Typography variant='h5' component='div'>Drogerieartikel</Typography>
              <Typography variant='body2'>Gesamtpreis: {calculateTotalPrice('Drogerieartikel').toFixed(2)} €</Typography>
              <Button variant='contained'
                      onClick={() => setIsDrogerieOpen(!isDrogerieOpen)}>
                        {isDrogerieOpen ? 'Liste schließen' : 'Warenkorb anzeigen'}
                      </Button>
                      {isDrogerieOpen && (
                        <div className='item-list'>
                          <ItemList
                            items={filterItemsByCategory('Drogerieartikel')}
                            removeItem={removeItem}
                            toggleItemStatus={toggleItemStatus}
                            editItem={editItem}
                          />
                        </div>
                      )}
              </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div className='overall-price-container'>
        <PanToolAlt className='hand-icon' sx={{fontSize: 60}} />
      <h3 className='overall-price'>Summe <span>{calculateOverallTotalPrice().toFixed(2)} €</span></h3>
      </div>
    </div>
  );
}

export default App
