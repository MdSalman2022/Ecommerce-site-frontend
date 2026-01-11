import { Categories } from '@/components/home';

export const dynamic = 'force-dynamic';

export default async function AllCategoriesPage() { 
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      <Categories config={{ hideTitle: true }} /> 
    </div>
  );
}
