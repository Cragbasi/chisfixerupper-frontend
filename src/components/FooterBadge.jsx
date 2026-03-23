export const FooterBadge = () => {
  return (
    <a
      href="https://cragbasi.github.io/my_portfolio/"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-12 right-5 z-50
        flex items-center gap-2
        bg-white border border-border/40
        shadow-lg rounded-lg
        px-3 py-2
        text-xs font-medium text-foreground
        hover:shadow-xl hover:border-primary/40
        transition-all duration-300
      "
    >
      <img
        src="/assets/confahmLogo.jpeg"
        alt="Confahm Logo"
        className="w-5 h-5 rounded-sm object-cover"
      />
      <span>Developed by Confahm</span>
    </a>
  );
};