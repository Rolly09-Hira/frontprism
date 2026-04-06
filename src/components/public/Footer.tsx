// src/components/public/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p>&copy; 2024 Mon Application. Tous droits réservés.</p>
          <p className="text-sm text-gray-400 mt-2">
            Mentions légales | Politique de confidentialité
          </p>
        </div>
      </div>
    </footer>
  );
}