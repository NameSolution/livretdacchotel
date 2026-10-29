/** Rend un texte où `*mot*` devient une emphase italique colorée (utilisé pour les titres éditoriaux). */
export default function Rich({ text }) {
  const parts = String(text ?? '').split(/\*([^*]+)\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part));
}

export const stripRich = (text) => String(text ?? '').replace(/\*/g, '');
