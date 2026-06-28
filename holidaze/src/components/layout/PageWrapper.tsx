export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-8">
      {children}
    </div>
  );
}