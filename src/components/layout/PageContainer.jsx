function PageContainer({
  children,
  className = "",
  size = "default",
}) {
  const sizes = {
    default: "max-w-[1400px]",
    wide: "max-w-[1600px]",
    narrow: "max-w-5xl",
  };

  return (
    <main
      className={[
        "mx-auto w-full px-4 py-5 sm:px-6 sm:py-6",
        sizes[size] ?? sizes.default,
        className,
      ].join(" ")}
    >
      {children}
    </main>
  );
}

export default PageContainer;