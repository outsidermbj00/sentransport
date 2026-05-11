import { useState } from 'react';
import './App.css';
import Header from './Header';
import LigneBus from './LigneBus';
import ListeLignes from './ListeLignes';
import Recherche from './Recherche';
import DetailLigne from './DetailLigne';
import StatReseau from './StatReseau';
import Footer from './Footer';
//import Test from './Test';

function App() {
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);

  const lignes = [
    {
      id: 1,
      numero: '1',
      depart: 'Parcelles Assainies',
      arrivee: 'Plateau',
      arrets: 14,
      listeArrets: [
      "Yoff Village",
      "Aeroport LSS",
      "Parcelles U17",
      "Grand Yoff",
      "HLM",
      "Sandaga",
    ],
      couleur: '#0a6e31',
    },
    {
      id: 2,
      numero: '7',
      depart: 'Guédiawaye',
      arrivee: 'Place Obélisque',
      arrets: 18,
       listeArrets: [
      "Almadies",
      "Ngor",
      "Yoff",
      "Ouest Foire",
      "Liberte 6",
      "Colobane",
    ],
      couleur: '#e74c3c',
    },
    {
      id: 3,
      numero: '15',
      depart: 'Pikine',
      arrivee: 'Médina',
      arrets: 12,
       listeArrets: [
      "Parcelles U14",
      "Parcelles U10",
      "Camberene",
      "Patte d'Oie",
      "Grand Dakar",
      "Colobane",
      "Ponty",
      "Plateau",
    ],
      couleur: '#2980b9',
    },
    {
      id: 4,
      numero: '23',
      depart: 'Ouakam',
      arrivee: 'Grand Dakar',
      arrets: 10,
       listeArrets: [
      "Guediawaye",
      "Pikine",
      "Thiaroye",
      "Keur Massar",
      "Grand Yoff",
      "Parcelles",
      "Liberte 6",
      "Place Obe",
    ],
      couleur: '#8e44ad',
    },
    {
      id: 5,
      numero: '8',
      depart: 'Almadies',
      arrivee: 'Colobane',
      arrets: 16,
      listeArrets: [
      "Pikine Centre",
      "Thiaroye Gare",
      "Hann",
      "Colobane",
      "Fass",
      "Medina",
      ],
      couleur: '#d35400',
    },
    {
      id: 6,
      numero: '12',
      depart: 'Yoff',
      arrivee: 'Sandaga',
      arrets: 11,
      listeArrets: [
      "Ouakam Village",
      "Mermoz",
      "Fann",
      "Point E",
      "Liberte 5",
      "Grand Dakar",
    ],
      couleur: '#16a085',
    },
    {
      id: 7,
      numero: '4',
      depart: 'Fann',
      arrivee: 'HLM',
      arrets: 9,
       listeArrets: [
      "Almadies",
      "Ngor",
      "Yoff",
      "Ouest Foire",
      "Liberte 6",
      "Colobane",
    ],
      couleur: '#c0392b',
    },
    {
      id: 8,
      numero: '19',
      depart: 'Liberté 6',
      arrivee: 'Dieuppeul',
      arrets: 13,
       listeArrets: [
      "Almadies",
      "Ngor",
      "Yoff",
      "Ouest Foire",
      "Liberte 6",
      "Colobane",
    ],
      couleur: '#27ae60',
    },
    {
      id: 9,
      numero: '31',
      depart: 'Sicap Mbao',
      arrivee: 'Médina',
      arrets: 20,
       listeArrets: [
      "Yoff Village",
      "Aeroport LSS",
      "Parcelles U17",
      "Grand Yoff",
      "HLM",
      "Sandaga",
    ],
      couleur: '#f39c12',
    },
    {
      id: 10,
      numero: '5',
      depart: 'HLM',
      arrivee: 'Plateau',
      arrets: 8,
       listeArrets: [
      "Yoff Village",
      "Aeroport LSS",
      "Parcelles U17",
      "Grand Yoff",
      "HLM",
      "Sandaga",
    ],
      couleur: '#2c3e50',
    },
  ];
  

  // Filtrer les lignes selon le texte recherché
  const lignesFiltrees = lignes.filter(
    (l) =>
      l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
      l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
      l.numero.includes(recherche)
  );

  // Gérer la sélection d'une ligne
  function handleClickLigne(ligne) {
    if (
      ligneSelectionnee &&
      ligneSelectionnee.id === ligne.id
    ) {
      setLigneSelectionnee(null);
    } else {
      setLigneSelectionnee(ligne);
    }
  }

  return (
    <div className="App">
      <Header />

      <main className="contenu">
        <Recherche
          valeur={recherche}
          onChange={setRecherche}
        />

        <p className="resultat-recherche">
          {lignesFiltrees.length} ligne
          {lignesFiltrees.length > 1 ? "s" : ""} trouvée
          {lignesFiltrees.length > 1 ? "s" : ""}
        </p>

        {lignesFiltrees.map((ligne) => (
          <LigneBus
            key={ligne.id}
            numero={ligne.numero}
            depart={ligne.depart}
            arrivee={ligne.arrivee}
            arrets={ligne.arrets}
            estSelectionnee={
              ligneSelectionnee &&
              ligneSelectionnee.id === ligne.id
            }
            onClick={() => handleClickLigne(ligne)}
          />
        ))}

        {ligneSelectionnee && (
          <DetailLigne ligne={ligneSelectionnee} />
        )}

         <StatReseau lignes={lignes} />
        <ListeLignes lignes={lignes} />
      </main>

      <Footer />
    </div>
  );
}

export default App;

//   return (
//     <div className="App">
//       <Header />

//       <main className="contenu">
//         <StatReseau lignes={lignes} />
//         <ListeLignes lignes={lignes} />
//       </main>

//       <Footer />
//       {/* <Test/> */}
//     </div>
//   );
// }

