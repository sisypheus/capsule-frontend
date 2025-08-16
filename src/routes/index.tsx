import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/me', { withCredentials: true })
      .then((response: any) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      {user ?
      <p>Bonjour, {JSON.stringify(user)}</p> :
      <Link
      to="/login"
    >
      log in
    </Link>
      }
    </div>
  );
}