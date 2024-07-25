const GradientBackground: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-pink-200 opacity-70" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GradientBackground;