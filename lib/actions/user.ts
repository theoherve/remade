import { prisma } from "../prisma";
import { hash } from "bcryptjs";

export type UserWithRelations = {
  id: string;
  email: string;
  name: string | null;
  hashedPassword: string;
  role: "USER" | "CREATOR" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
  profile: {
    id: string;
    userId: string;
    avatar: string | null;
    bio: string | null;
    location: string | null;
    phoneNumber: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  shop: {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    banner: string | null;
    logo: string | null;
    theme: any;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

export type UserUpdateData = {
  email?: string;
  name?: string | null;
  hashedPassword?: string;
  role?: "USER" | "CREATOR" | "ADMIN";
};

export type ProfileUpdateData = {
  avatar?: string | null;
  bio?: string | null;
  location?: string | null;
  phoneNumber?: string | null;
};

export type ShopUpdateData = {
  name?: string;
  description?: string | null;
  banner?: string | null;
  logo?: string | null;
  theme?: any;
};

export async function createUser(data: {
  email: string;
  name: string;
  password: string;
  role?: "USER" | "CREATOR" | "ADMIN";
}) {
  const hashedPassword = await hash(data.password, 12);

  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      hashedPassword,
      role: data.role,
      profile: {
        create: {},
      },
    },
    include: {
      profile: true,
      shop: true,
    },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      profile: true,
      shop: true,
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      profile: true,
      shop: true,
    },
  });
}

export async function updateUser(id: string, data: UserUpdateData) {
  return prisma.user.update({
    where: { id },
    data,
    include: {
      profile: true,
      shop: true,
    },
  });
}

export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}

export async function updateProfile(userId: string, data: ProfileUpdateData) {
  return prisma.profile.update({
    where: { userId },
    data,
  });
}

export async function createShop(
  userId: string,
  data: {
    name: string;
    description?: string;
    banner?: string;
    logo?: string;
    theme?: any;
  }
) {
  return prisma.shop.create({
    data: {
      ...data,
      userId,
    },
  });
}

export async function updateShop(userId: string, data: ShopUpdateData) {
  return prisma.shop.update({
    where: { userId },
    data,
  });
}
