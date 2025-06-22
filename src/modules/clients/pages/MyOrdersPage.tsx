import React from 'react';
import MyOrdersList from '../components/MyOrdersList';

const MyOrdersPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
        <span className="inline-block bg-primary/10 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 7a2 2 0 012-2h14a2 2 0 012 2m-2 0v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7m0 0v10m0 0a2 2 0 002 2h10a2 2 0 002-2V7" /></svg>
        </span>
        Mis pedidos
      </h1>
      <p className="text-muted-foreground mb-6">Aquí puedes ver el historial de tus pedidos, su estado, detalles y pagos realizados.</p>
      <MyOrdersList />
    </div>
  );
};

export default MyOrdersPage; 