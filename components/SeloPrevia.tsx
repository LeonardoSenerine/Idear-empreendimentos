/** Aviso discreto de que a página é uma prévia com dados provisórios. Some quando `provisorio` for false. */
export default function SeloPrevia() {
  return (
    <div className="pointer-events-none fixed bottom-5 left-4 z-40 sm:hidden border border-line bg-ivory/95 px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-stone">
      Prévia · dados provisórios
    </div>
  );
}
