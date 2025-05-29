// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

let prisma = new PrismaClient();

const categories = [
  { name: "Robes", description: "Robes remaniées et personnalisées" },
  { name: "Vestes", description: "Vestes et blazers upcyclés" },
  { name: "Pantalons", description: "Pantalons et jupes remaniés" },
  { name: "Tops", description: "Tops et chemises upcyclés" },
  { name: "Accessoires", description: "Accessoires et bijoux faits main" },
  { name: "Jupes", description: "Jupes et shorts remaniés" },
  { name: "Sweats", description: "Sweats et hoodies upcyclés" },
  { name: "Chemises", description: "Chemises et blouses personnalisées" },
  { name: "Bijoux", description: "Bijoux et accessoires faits main" },
  { name: "Sacs", description: "Sacs et pochettes upcyclés" },
  { name: "Chaussures", description: "Chaussures et bottes remaniées" },
  { name: "Écharpes", description: "Écharpes et foulards faits main" },
  { name: "Chapeaux", description: "Chapeaux et bonnets upcyclés" },
  { name: "Gants", description: "Gants et mitaines faits main" },
  { name: "Ceintures", description: "Ceintures et accessoires en cuir" },
];

const materials = [
  "Coton",
  "Laine",
  "Soie",
  "Denim",
  "Cuir",
  "Lin",
  "Velours",
  "Tweed",
  "Laine recyclée",
  "Coton bio",
  "Tissu recyclé",
  "Fibres naturelles",
  "Chanvre bio",
  "Bambou",
  "Laine éthique",
  "Coton recyclé",
  "Fibres recyclées",
  "Matières durables",
  "Textile écologique",
  "Fibres végétales",
];

const techniques = [
  "Patchwork",
  "Teinture naturelle",
  "Broderie",
  "Customisation",
  "Upcycling",
  "Zero waste",
  "Découpage",
  "Application",
  "Tissage",
  "Tricot",
];

const tags = [
  "Vintage",
  "Éthique",
  "Unique",
  "Artisanal",
  "Durable",
  "Local",
  "Écologique",
  "Fait main",
  "Personnalisé",
  "Luxe",
];

const productImages = {
  Robes: [
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    "https://images.unsplash.com/photo-1572804013427-4d7ca7268217",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
  ],
  Vestes: [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5",
  ],
  Pantalons: [
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
    "https://images.unsplash.com/photo-1542272604-787c3835535d",
  ],
  Tops: [
    "https://images.unsplash.com/photo-1562157873-818bc0726f68",
    "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
  ],
  Accessoires: [
    "https://images.unsplash.com/photo-1509319117193-57bab727e09d",
    "https://images.unsplash.com/photo-1611923134239-b9be5b4d1b42",
    "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d",
  ],
  Jupes: [
    "https://images.unsplash.com/photo-1577900232427-18219b9166a0",
    "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa",
    "https://images.unsplash.com/photo-1592669241098-52f109021f8b",
  ],
  Sweats: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325",
    "https://images.unsplash.com/photo-1578587018452-892bacefd3f2",
  ],
  Chemises: [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e",
    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03",
  ],
  Bijoux: [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
    "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
  ],
  Sacs: [
    "https://images.unsplash.com/photo-1591561954557-26941169b49e",
    "https://images.unsplash.com/photo-1544816155-12df9643f363",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
  ],
  Chaussures: [
    "https://images.unsplash.com/photo-1595341888016-a392ef81b7de",
    "https://images.unsplash.com/photo-1608256246200-53c6fcfd5b44",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
  ],
  Écharpes: [
    "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9",
    "https://images.unsplash.com/photo-1601244005535-a48d21d951ac",
    "https://images.unsplash.com/photo-1578632292335-df3abbb0d586",
  ],
  Chapeaux: [
    "https://images.unsplash.com/photo-1521369909029-2afed882baee",
    "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9",
  ],
  Gants: [
    "https://images.unsplash.com/photo-1578116922645-3976907a7671",
    "https://images.unsplash.com/photo-1584208124888-3a20b9c799e5",
    "https://images.unsplash.com/photo-1595624871930-6e8537998592",
  ],
  Ceintures: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    "https://images.unsplash.com/photo-1624222247344-550fb60583dc",
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4",
  ],
};

async function main() {
  try {
    // Nettoyer la base de données dans le bon ordre pour respecter les contraintes de clés étrangères et éviter le bug Prisma/Supabase
    await prisma.review.deleteMany();
    await prisma.$disconnect();
    prisma = new PrismaClient();

    // Commenté pour tester la solution 3 (seed par table)
    // await prisma.orderItem.deleteMany();
    // await prisma.$disconnect();
    // prisma = new PrismaClient();

    // await prisma.order.deleteMany();
    // await prisma.$disconnect();
    // prisma = new PrismaClient();

    // await prisma.favorite.deleteMany();
    // await prisma.$disconnect();
    // prisma = new PrismaClient();

    // await prisma.collectionProduct.deleteMany();
    // await prisma.$disconnect();
    // prisma = new PrismaClient();

    // await prisma.collection.deleteMany();
    // await prisma.$disconnect();
    // prisma = new PrismaClient();

    // await prisma.product.deleteMany();
    // await prisma.$disconnect();
    // prisma = new PrismaClient();

    // await prisma.category.deleteMany();
    // await prisma.$disconnect();
    // prisma = new PrismaClient();

    // await prisma.tag.deleteMany();
    // await prisma.$disconnect();
    // prisma = new PrismaClient();

    // await prisma.shop.deleteMany();
    // await prisma.$disconnect();
    // prisma = new PrismaClient();

    // await prisma.profile.deleteMany();
    // await prisma.$disconnect();
    // prisma = new PrismaClient();

    // await prisma.user.deleteMany();
    // await prisma.$disconnect();
    // prisma = new PrismaClient();

    // Créer les catégories
    const createdCategories = await Promise.all(
      categories.map((category) =>
        prisma.category.create({
          data: category,
        })
      )
    );

    // Créer les tags
    const createdTags = await Promise.all(
      tags.map((tag) =>
        prisma.tag.create({
          data: {
            name: tag,
            description: `Produits ${tag.toLowerCase()}`,
          },
        })
      )
    );

    // Créer les utilisateurs (créateurs et clients)
    const hashedPassword = await hash("Test123!", 12);
    const users = await Promise.all([
      // Admin
      prisma.user.create({
        data: {
          email: "admin@upcycle.com",
          name: "Admin",
          hashedPassword,
          role: "ADMIN",
          profile: {
            create: {
              bio: "Administrateur de UpCycle",
              location: "Paris, France",
            },
          },
        },
      }),
      // Créateurs
      ...Array.from({ length: 5 }).map((_, i) =>
        prisma.user.create({
          data: {
            email: `creator${i + 1}@upcycle.com`,
            name: `Créateur ${i + 1}`,
            hashedPassword,
            role: "CREATOR",
            profile: {
              create: {
                bio: `Créateur passionné de mode durable et de remaniement`,
                location: ["Paris", "Lyon", "Bordeaux", "Marseille", "Lille"][
                  i
                ],
                avatar: `https://i.pravatar.cc/150?img=${i + 10}`,
              },
            },
          },
        })
      ),
      // Clients
      ...Array.from({ length: 10 }).map((_, i) =>
        prisma.user.create({
          data: {
            email: `user${i + 1}@example.com`,
            name: `Utilisateur ${i + 1}`,
            hashedPassword,
            role: "USER",
            profile: {
              create: {
                bio: `Passionné de mode durable`,
                location: [
                  "Paris",
                  "Lyon",
                  "Bordeaux",
                  "Marseille",
                  "Lille",
                  "Nantes",
                  "Toulouse",
                  "Strasbourg",
                  "Nice",
                  "Rennes",
                ][i],
                avatar: `https://i.pravatar.cc/150?img=${i + 20}`,
              },
            },
          },
        })
      ),
    ]);

    // Créer les boutiques pour les créateurs
    const shops = await Promise.all(
      users
        .filter((user) => user.role === "CREATOR")
        .map((creator) =>
          prisma.shop.create({
            data: {
              name: `Boutique de ${creator.name}`,
              description: `Découvrez les créations uniques de ${creator.name}`,
              userId: creator.id,
              logo: `https://picsum.photos/seed/${creator.id}/200/200`,
              banner: `https://picsum.photos/seed/${creator.id}/1200/400`,
              theme: {
                primaryColor: "#8B5CF6",
                secondaryColor: "#EC4899",
                fontFamily: "Inter",
              },
            },
          })
        )
    );

    // Créer les produits
    const products = await Promise.all(
      shops.flatMap((shop) =>
        Array.from({ length: 8 }).map((_, i) =>
          prisma.product.create({
            data: {
              name: `Produit ${i + 1} de ${shop.name}`,
              description: `Un magnifique produit remanié avec amour et passion. Chaque pièce est unique et raconte une histoire.`,
              price: Math.floor(Math.random() * 1000) + 50,
              images:
                productImages[
                  createdCategories[
                    Math.floor(Math.random() * createdCategories.length)
                  ].name
                ] || productImages["Robes"],
              categoryId:
                createdCategories[
                  Math.floor(Math.random() * createdCategories.length)
                ].id,
              shopId: shop.id,
              creatorId: shop.userId,
              stock: Math.floor(Math.random() * 10) + 1,
              status: "ACTIVE",
              originalBrand: ["Levi's", "Zara", "H&M", "Uniqlo", "Mango"][
                Math.floor(Math.random() * 5)
              ],
              materials: Array.from({ length: 3 }).map(
                () => materials[Math.floor(Math.random() * materials.length)]
              ),
              size: ["XS", "S", "M", "L", "XL"][Math.floor(Math.random() * 5)],
              condition: ["NEW", "LIKE_NEW", "GOOD"][
                Math.floor(Math.random() * 3)
              ],
              techniques: Array.from({ length: 2 }).map(
                () => techniques[Math.floor(Math.random() * techniques.length)]
              ),
              tags: {
                connect: Array.from({ length: 3 }).map(() => ({
                  id: createdTags[
                    Math.floor(Math.random() * createdTags.length)
                  ].id,
                })),
              },
            },
          })
        )
      )
    );

    // Créer des collections pour les utilisateurs
    const collections = await Promise.all(
      users
        .filter((user) => user.role === "USER")
        .flatMap((user) =>
          Array.from({ length: 2 }).map((_, i) =>
            prisma.collection.create({
              data: {
                name: `Collection ${i + 1} de ${user.name}`,
                description: `Ma collection personnelle de pièces favorites`,
                isPublic: Math.random() > 0.5,
                userId: user.id,
              },
            })
          )
        )
    );

    // Ajouter des produits aux collections
    await Promise.all(
      collections.map((collection) =>
        prisma.collectionProduct.create({
          data: {
            collectionId: collection.id,
            productId: products[Math.floor(Math.random() * products.length)].id,
          },
        })
      )
    );

    // Créer des avis
    await Promise.all(
      products.map((product) =>
        prisma.review.create({
          data: {
            rating: Math.floor(Math.random() * 5) + 1,
            comment: "Un excellent produit, je recommande !",
            productId: product.id,
            userId: users[Math.floor(Math.random() * users.length)].id,
          },
        })
      )
    );

    console.log("Base de données initialisée avec succès !");
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la base de données:",
      error
    );
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
