"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var client_1 = require("@prisma/client");
var bcryptjs_1 = require("bcryptjs");
var prisma = new client_1.PrismaClient();
var categories = [
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
var materials = [
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
var techniques = [
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
var tags = [
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
var productImages = {
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var createdCategories_1, createdTags_1, hashedPassword_1, users_1, shops, products_1, collections, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 12, , 13]);
                    // Nettoyer la base de données dans le bon ordre pour respecter les contraintes de clés étrangères et éviter le bug Prisma/Supabase
                    return [4 /*yield*/, prisma.review.deleteMany()];
                case 1:
                    // Nettoyer la base de données dans le bon ordre pour respecter les contraintes de clés étrangères et éviter le bug Prisma/Supabase
                    _a.sent();
                    return [4 /*yield*/, prisma.$disconnect()];
                case 2:
                    _a.sent();
                    prisma = new client_1.PrismaClient();
                    return [4 /*yield*/, Promise.all(categories.map(function (category) {
                            return prisma.category.create({
                                data: category,
                            });
                        }))];
                case 3:
                    createdCategories_1 = _a.sent();
                    return [4 /*yield*/, Promise.all(tags.map(function (tag) {
                            return prisma.tag.create({
                                data: {
                                    name: tag,
                                    description: "Produits ".concat(tag.toLowerCase()),
                                },
                            });
                        }))];
                case 4:
                    createdTags_1 = _a.sent();
                    return [4 /*yield*/, (0, bcryptjs_1.hash)("Test123!", 12)];
                case 5:
                    hashedPassword_1 = _a.sent();
                    return [4 /*yield*/, Promise.all(__spreadArray(__spreadArray([
                            // Admin
                            prisma.user.create({
                                data: {
                                    email: "admin@upcycle.com",
                                    name: "Admin",
                                    hashedPassword: hashedPassword_1,
                                    role: "ADMIN",
                                    profile: {
                                        create: {
                                            bio: "Administrateur de UpCycle",
                                            location: "Paris, France",
                                        },
                                    },
                                },
                            })
                        ], Array.from({ length: 5 }).map(function (_, i) {
                            return prisma.user.create({
                                data: {
                                    email: "creator".concat(i + 1, "@upcycle.com"),
                                    name: "Cr\u00E9ateur ".concat(i + 1),
                                    hashedPassword: hashedPassword_1,
                                    role: "CREATOR",
                                    profile: {
                                        create: {
                                            bio: "Cr\u00E9ateur passionn\u00E9 de mode durable et de remaniement",
                                            location: ["Paris", "Lyon", "Bordeaux", "Marseille", "Lille"][i],
                                            avatar: "https://i.pravatar.cc/150?img=".concat(i + 10),
                                        },
                                    },
                                },
                            });
                        }), true), Array.from({ length: 10 }).map(function (_, i) {
                            return prisma.user.create({
                                data: {
                                    email: "user".concat(i + 1, "@example.com"),
                                    name: "Utilisateur ".concat(i + 1),
                                    hashedPassword: hashedPassword_1,
                                    role: "USER",
                                    profile: {
                                        create: {
                                            bio: "Passionn\u00E9 de mode durable",
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
                                            avatar: "https://i.pravatar.cc/150?img=".concat(i + 20),
                                        },
                                    },
                                },
                            });
                        }), true))];
                case 6:
                    users_1 = _a.sent();
                    return [4 /*yield*/, Promise.all(users_1
                            .filter(function (user) { return user.role === "CREATOR"; })
                            .map(function (creator) {
                            return prisma.shop.create({
                                data: {
                                    name: "Boutique de ".concat(creator.name),
                                    description: "D\u00E9couvrez les cr\u00E9ations uniques de ".concat(creator.name),
                                    userId: creator.id,
                                    logo: "https://picsum.photos/seed/".concat(creator.id, "/200/200"),
                                    banner: "https://picsum.photos/seed/".concat(creator.id, "/1200/400"),
                                    theme: {
                                        primaryColor: "#8B5CF6",
                                        secondaryColor: "#EC4899",
                                        fontFamily: "Inter",
                                    },
                                },
                            });
                        }))];
                case 7:
                    shops = _a.sent();
                    return [4 /*yield*/, Promise.all(shops.flatMap(function (shop) {
                            return Array.from({ length: 8 }).map(function (_, i) {
                                return prisma.product.create({
                                    data: {
                                        name: "Produit ".concat(i + 1, " de ").concat(shop.name),
                                        description: "Un magnifique produit remani\u00E9 avec amour et passion. Chaque pi\u00E8ce est unique et raconte une histoire.",
                                        price: Math.floor(Math.random() * 1000) + 50,
                                        images: productImages[createdCategories_1[Math.floor(Math.random() * createdCategories_1.length)].name] || productImages["Robes"],
                                        categoryId: createdCategories_1[Math.floor(Math.random() * createdCategories_1.length)].id,
                                        shopId: shop.id,
                                        creatorId: shop.userId,
                                        stock: Math.floor(Math.random() * 10) + 1,
                                        status: "ACTIVE",
                                        originalBrand: ["Levi's", "Zara", "H&M", "Uniqlo", "Mango"][Math.floor(Math.random() * 5)],
                                        materials: Array.from({ length: 3 }).map(function () { return materials[Math.floor(Math.random() * materials.length)]; }),
                                        size: ["XS", "S", "M", "L", "XL"][Math.floor(Math.random() * 5)],
                                        condition: ["NEW", "LIKE_NEW", "GOOD"][Math.floor(Math.random() * 3)],
                                        techniques: Array.from({ length: 2 }).map(function () { return techniques[Math.floor(Math.random() * techniques.length)]; }),
                                        tags: {
                                            connect: Array.from({ length: 3 }).map(function () { return ({
                                                id: createdTags_1[Math.floor(Math.random() * createdTags_1.length)].id,
                                            }); }),
                                        },
                                    },
                                });
                            });
                        }))];
                case 8:
                    products_1 = _a.sent();
                    return [4 /*yield*/, Promise.all(users_1
                            .filter(function (user) { return user.role === "USER"; })
                            .flatMap(function (user) {
                            return Array.from({ length: 2 }).map(function (_, i) {
                                return prisma.collection.create({
                                    data: {
                                        name: "Collection ".concat(i + 1, " de ").concat(user.name),
                                        description: "Ma collection personnelle de pi\u00E8ces favorites",
                                        isPublic: Math.random() > 0.5,
                                        userId: user.id,
                                    },
                                });
                            });
                        }))];
                case 9:
                    collections = _a.sent();
                    // Ajouter des produits aux collections
                    return [4 /*yield*/, Promise.all(collections.map(function (collection) {
                            return prisma.collectionProduct.create({
                                data: {
                                    collectionId: collection.id,
                                    productId: products_1[Math.floor(Math.random() * products_1.length)].id,
                                },
                            });
                        }))];
                case 10:
                    // Ajouter des produits aux collections
                    _a.sent();
                    // Créer des avis
                    return [4 /*yield*/, Promise.all(products_1.map(function (product) {
                            return prisma.review.create({
                                data: {
                                    rating: Math.floor(Math.random() * 5) + 1,
                                    comment: "Un excellent produit, je recommande !",
                                    productId: product.id,
                                    userId: users_1[Math.floor(Math.random() * users_1.length)].id,
                                },
                            });
                        }))];
                case 11:
                    // Créer des avis
                    _a.sent();
                    console.log("Base de données initialisée avec succès !");
                    return [3 /*break*/, 13];
                case 12:
                    error_1 = _a.sent();
                    console.error("Erreur lors de l'initialisation de la base de données:", error_1);
                    process.exit(1);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
