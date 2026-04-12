export default function WorkCard({ id, img }) {
  return (
    <div className="aspect-square bg-gradient-to-br from-gray-900 to-black dark:bg-zinc-900 group relative overflow-hidden rounded-lg border border-white/10 cursor-pointer hover:border-white/30 transition-all duration-300">
      {img && (
        <>
          <img
            src={img}
            alt={`Work piece ${id}`}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </>
      )}
      <span className="absolute top-3 left-3 text-xs md:text-sm font-bold text-white/70 group-hover:text-white transition-colors">
        {id}
      </span>
    </div>
  );
}
