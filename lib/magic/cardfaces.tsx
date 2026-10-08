// cardFaces.ts

import { InsertMagicSingle } from "../db/schema";

export function getFaces(product: InsertMagicSingle) {
  if (!product.card_faces) {
    return null;
  }

  return JSON.parse(product.card_faces);
}

export function getFrontFace(product: InsertMagicSingle) {
  const faces = getFaces(product);

  // Normal card
  if (!faces) {
    return product;
  }

  // Double-faced card
  return faces[0];
}

export function getBackFace(product: InsertMagicSingle) {
  const faces = getFaces(product);

  if (!faces || faces.length < 2) {
    return null;
  }

  return faces[1];
}

export function isDoubleFaced(product: InsertMagicSingle) {
  const faces = getFaces(product);

  return faces?.length === 2;
}

export function getActiveFace(product: InsertMagicSingle, showBack: boolean) {
  return showBack;
}
