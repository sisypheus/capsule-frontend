import '../app.css'
import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios.get(import.meta.env.VITE_BACKEND_URL, { withCredentials: true })
  //     .then((response: any) => {
  //       setUser(response.data);
  //     })
  //     .catch(() => {
  //       setUser(null);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <>
      <Header />
      <main>
        Main
        {/* <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs /> */}
      </main>
      <Footer />
    </>
  )
}