import Logo from "@/components/Logo";
import { Separator } from "@/components/ui/separator";

function WorkflowLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Logo iconSize={16} fontSize="text-xl" />
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Workflow. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default WorkflowLayout;
