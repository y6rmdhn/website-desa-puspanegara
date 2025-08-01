import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { IoPerson, IoPricetag } from "react-icons/io5";
import { Link } from "react-router-dom";

const SidebarItem = ({ children }) => {
  return (
    <Button
      variant="ghost"
      size="lg"
      className="w-full rounded-none justify-start"
    >
      {children}
    </Button>
  );
};

export const AdminLayout = (props) => {
  return (
    <div>
      <div className="flex">
        <aside className="w-72 border-r h-screen">
          <div className="h-16 flex flex-col items-center justify-center border-b">
            <h1 className="font-semibold text-3xl">Admin Dasboard</h1>
          </div>

          <div className="flex flex-col space-y-0 py-4">
            <SidebarItem>
              <IoPricetag className="h-6 w-6 mr-4" />
              Product Management
            </SidebarItem>
          </div>
        </aside>

        <div className="flex-1">
          <header className="h-16 border-b w-full flex justify-between items-center px-8">
            <Link to="/">
              <Button>
                <ChevronLeft /> Back
              </Button>
            </Link>
            <Button className="rounded-full" size="icon">
              <IoPerson className="h-6 w-6" />
            </Button>
          </header>

          <main className="flex flex-col p-4">
            <div className="flex justify-between items-center pb-4 border-b mb-8">
              <div>
                <h1 className="font-bold text-4xl">{props.title}</h1>
                <p className="text-muted-foreground">{props.description}</p>
              </div>

              {props.rightBtn}
            </div>
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
};
