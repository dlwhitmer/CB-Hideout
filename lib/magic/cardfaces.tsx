// cardFaces.ts

import { MagicSingle } from "../db/schema/magic_singles";

export function getFaces(product: MagicSingle) {
  if (!product.card_faces) {
    return null;
  }

  return JSON.parse(product.card_faces);
}

export function getFrontFace(product: MagicSingle) {
  const faces = getFaces(product);

  // Normal card
  if (!faces) {
    return product;
  }

  // Double-faced card
  return faces[0];
}

export function getBackFace(product: MagicSingle) {
  const faces = getFaces(product);

  if (!faces || faces.length < 2) {
    return null;
  }

  return faces[1];
}

export function isDoubleFaced(product: MagicSingle) {
  const faces = getFaces(product);

  return faces?.length === 2;
}

export function getActiveFace(product: MagicSingle, showBack: boolean) {
  return showBack;
}
