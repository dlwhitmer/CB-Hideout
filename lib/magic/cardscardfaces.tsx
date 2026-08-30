// cardFaces.ts

import { MagicCard } from "../db/schema/magic_cards";

export function getFaces(product: MagicCard) {
  if (!product.card_faces) {
    return null;
  }

  return JSON.parse(product.card_faces);
}

export function getFrontFace(product: MagicCard) {
  const faces = getFaces(product);

  // Normal card
  if (!faces) {
    return product;
  }

  // Double-faced card
  return faces[0];
}

export function getCardsBackFace(product: MagicCard) {
  const faces = getFaces(product);

  if (!faces || faces.length < 2) {
    return null;
  }

  return faces[1];
}

export function isDoubleFaced(product: MagicCard) {
  const faces = getFaces(product);

  return faces?.length === 2;
}

export function getCardsActiveFace(product: MagicCard, showBack: boolean) {
  return showBack;
}
