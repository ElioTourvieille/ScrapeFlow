import Logo from "@/components/Logo";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Logo fontSize="2xl" iconSize={32} />
      {children}
    </div>
  );
}

export default AuthLayout;
