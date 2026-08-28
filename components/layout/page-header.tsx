export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="bg-gradient-to-b from-indigo to-indigo-deep text-white text-center py-20 px-8">
      <div className="max-w-[680px] mx-auto">
        <div className="eyebrow text-gold mb-[18px]">{eyebrow}</div>
        <h1 className="text-[42px] leading-[1.1] text-white mb-[18px]">{title}</h1>
        <p className="text-[17px] text-[#C7CBDA]">{description}</p>
      </div>
    </header>
  );
}
