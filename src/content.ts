import type { VitrineContent } from "@/lib/templates/vitrine/schema";

// Le contenu de ton site. Modifie ce que tu veux, rebuild, pousse sur ton
// hébergeur. Le type VitrineContent te guide sur la structure attendue.
export const content: VitrineContent = {
  "schemaVersion": 2,
  "theme": {
    "background": {
      "base": "#DC2626"
    },
    "container": {
      "base": "#FAFAFA"
    },
    "cta": {
      "base": "#4F46E5"
    },
    "secondary": {
      "base": "#18181B"
    },
    "textPrimary": {
      "base": "#18181B"
    },
    "textMuted": {
      "base": "#52525B"
    }
  },
  "brand": {
    "name": "bite",
    "tagline": "Vos rêves deviennent réalité",
    "initials": "T"
  },
  "sectionOrder": [
    "features",
    "process",
    "about",
    "testimonials",
    "cta",
    "contact",
    "faq"
  ],
  "nav": {
    "cta": {
      "href": "#contact",
      "label": "Démarrer un projet"
    }
  },
  "hero": {
    "eyebrow": "Studio de design",
    "title": "Des marques qui marquent.",
    "subtitle": "Nous créons des identités visuelles fortes pour les entreprises qui veulent se démarquer. Logo, site web, direction artistique — le tout sur-mesure.",
    "primaryCta": {
      "href": "#contact",
      "label": "Démarrer un projet"
    },
    "secondaryCta": {
      "href": "#services",
      "label": "Voir nos services"
    }
  },
  "features": {
    "enabled": true,
    "eyebrow": "Ce qu'on fait",
    "title": "Des services pour construire une marque forte.",
    "subtitle": "De la stratégie à l'exécution, on t'accompagne sur toute la chaîne.",
    "items": [
      {
        "icon": "🎨",
        "title": "Identité de marque",
        "description": "Logo, charte graphique, guidelines. On crée l'ADN visuel de ta marque."
      },
      {
        "icon": "🖥️",
        "title": "Sites web",
        "description": "Sites modernes, responsive, optimisés pour convertir. Du sur-mesure."
      },
      {
        "icon": "📱",
        "title": "Applications",
        "description": "Interfaces mobile et web fluides. Design et prototypage jusqu'au pixel."
      },
      {
        "icon": "📸",
        "title": "Direction artistique",
        "description": "Shooting photo, vidéo, contenu pour les réseaux. On donne vie à ton image."
      },
      {
        "icon": "✍️",
        "title": "Rédaction & contenu",
        "description": "Contenus qui résonnent : site, newsletters, campagnes publicitaires."
      },
      {
        "icon": "🚀",
        "title": "Stratégie",
        "description": "Avant le design, la stratégie. Positionnement, audience, tonalité."
      }
    ]
  },
  "about": {
    "enabled": true,
    "eyebrow": "Notre histoire",
    "title": "10 ans à façonner des marques.",
    "body": "Atelier Moreau, c'est une équipe de designers passionnés installée à Paris. On travaille avec des startups, des PME et des indépendants qui veulent une identité qui leur ressemble vraiment.\n\nNotre approche : comprendre avant de dessiner. Chaque projet commence par une phase de recherche pour saisir qui tu es, à qui tu parles, et ce qui te rend unique. Ensuite seulement, on met le crayon sur papier.",
    "stats": [
      {
        "label": "Projets livrés",
        "value": "200+"
      },
      {
        "label": "Années d'expérience",
        "value": "10"
      },
      {
        "label": "Clients satisfaits",
        "value": "98%"
      }
    ]
  },
  "process": {
    "enabled": true,
    "eyebrow": "Notre méthode",
    "title": "Une collaboration claire, du début à la fin.",
    "subtitle": "Pas de mystère, pas de surprises. Chaque étape est définie et partagée.",
    "steps": [
      {
        "title": "Rencontre",
        "description": "On discute de ton projet, tes ambitions, tes contraintes. Sans engagement."
      },
      {
        "title": "Stratégie",
        "description": "On définit ensemble la vision, le positionnement, les cibles."
      },
      {
        "title": "Création",
        "description": "Notre équipe conçoit les livrables, par itérations avec toi."
      },
      {
        "title": "Livraison",
        "description": "On te remet les fichiers, on te forme si besoin, et on reste dispo."
      }
    ]
  },
  "testimonials": {
    "enabled": false,
    "eyebrow": "Ils nous font confiance",
    "title": "Ce que nos clients en disent.",
    "items": [
      {
        "role": "CEO, Bloom",
        "quote": "L'équipe d'Atelier Moreau a transformé notre image en quelques semaines. Le résultat dépasse nos attentes et nos ventes ont explosé.",
        "author": "Sophie Laurent"
      },
      {
        "role": "Fondateur, Kayro",
        "quote": "Travailler avec eux, c'est un vrai partenariat. Ils écoutent, comprennent, et livrent. Je ne travaillerai plus jamais avec un autre studio.",
        "author": "Marc Dubois"
      },
      {
        "role": "Directrice Marketing, Helix",
        "quote": "Qualité, écoute, délais tenus. On les recommande les yeux fermés à tous nos partenaires.",
        "author": "Julie Mercier"
      }
    ]
  },
  "faq": {
    "enabled": true,
    "eyebrow": "FAQ",
    "title": "Les questions qu'on nous pose souvent.",
    "subtitle": "Quelque chose qu'on a oublié ? Contacte-nous directement.",
    "items": [
      {
        "answer": "Nos projets commencent à 3 000€ pour un logo + charte simple, et peuvent aller jusqu'à 50 000€ pour des refontes complètes. On fait toujours un devis gratuit après un premier échange.",
        "question": "Combien coûte un projet ?"
      },
      {
        "answer": "Un logo : 2 à 3 semaines. Un site web : 4 à 8 semaines. Un projet global (identité + site + contenus) : 2 à 4 mois.",
        "question": "Combien de temps ça prend ?"
      },
      {
        "answer": "Absolument. Notre palmarès va du freelance solo à la PME de 200 personnes. Chaque taille a ses enjeux, on s'adapte.",
        "question": "Vous travaillez avec des petites entreprises ?"
      },
      {
        "answer": "Paris, mais on travaille à distance avec toute la France et l'Europe. Les points réguliers se font en visio.",
        "question": "Où êtes-vous basés ?"
      },
      {
        "answer": "Oui. On reste dispo pour les ajustements pendant 30 jours gratuitement, puis on propose des forfaits de maintenance annuelle.",
        "question": "Proposez-vous un suivi après livraison ?"
      },
      {
        "answer": "Des fondateurs, des dirigeants de PME, des responsables marketing qui veulent une identité à la hauteur de leur ambition.",
        "question": "Qui sont vos clients types ?"
      }
    ]
  },
  "cta": {
    "enabled": false,
    "title": "Ton projet mérite une marque à sa hauteur.",
    "subtitle": "Parle-nous de ton projet, on revient vers toi sous 24h avec un devis gratuit.",
    "primaryCta": {
      "href": "#contact",
      "label": "Démarrer un projet"
    },
    "secondaryCta": {
      "href": "tel:+33123456789",
      "label": "Nous appeler"
    }
  },
  "contact": {
    "enabled": true,
    "showForm": true,
    "eyebrow": "Nous contacter",
    "title": "Discutons de ton projet.",
    "subtitle": "Une question, une idée, un projet en tête ? On t'écoute. Réponse sous 24h.",
    "email": "hello@ateliermoreau.fr",
    "phone": "+33 1 23 45 67 89",
    "address": "12 rue de la Paix, 75002 Paris",
    "hours": "Lundi — Vendredi, 9h — 18h"
  },
  "footer": {
    "tagline": "Design & identité de marque, depuis 2015.",
    "links": [
      {
        "href": "#",
        "label": "Mentions légales"
      },
      {
        "href": "#",
        "label": "Politique de confidentialité"
      }
    ],
    "copyright": "test. Tous droits réservés."
  }
};
