// src/pages/public/Home.tsx 
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Bienvenue sur notre plateforme
          </h1>
          <p className="text-xl mb-8">
            Une solution complète pour les étudiants, les administrateurs et le public
          </p>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Commencer
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Espace Public</h3>
            <p className="text-gray-600">
              Accédez aux informations générales et aux actualités de la plateforme.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Espace Étudiant</h3>
            <p className="text-gray-600">
              Gérez vos cours, notes et ressources pédagogiques.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Espace Admin</h3>
            <p className="text-gray-600">
              Administrez la plateforme et gérez les utilisateurs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}