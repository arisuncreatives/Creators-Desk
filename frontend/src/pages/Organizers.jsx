import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Organizers = () => {
  const categoryProducts = products.filter(p => p.category === 'Desk Organizers');

  return (
    <main className="max-w-7xl mx-auto mt-16 px-8 pb-24">
      <div className="mb-12">
        <h1 className="text-4xl font-light tracking-tight">Desk Organizers</h1>
        <p className="mt-2 text-creator-muted">Clear the clutter. Elevate the workspace.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};
export default Organizers;