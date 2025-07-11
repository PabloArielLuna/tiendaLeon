import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SuggestedContext = createContext();

export function SuggestedProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = 'https://686b38a5e559eba90871c3f5.mockapi.io/suggestedProducts';

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(api);
      setItems(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (item) => {
    const { data } = await axios.post(api, item);
    setItems(prev => [...prev, data]);
  };

  const updateItem = async (id, item) => {
    const { data } = await axios.put(`${api}/${id}`, item);
    setItems(prev => prev.map(i => i.id === id ? data : i));
  };

  const deleteItem = async (id) => {
    await axios.delete(`${api}/${id}`);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <SuggestedContext.Provider value={{
      items, loading, error,
      fetchAll, createItem, updateItem, deleteItem
    }}>
      {children}
    </SuggestedContext.Provider>
  );
}