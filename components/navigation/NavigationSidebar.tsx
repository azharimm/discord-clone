import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationAction } from "./NavigationAction";
import NavigationItem from "./NavigationItem";
import { ModeToggle } from "@/components/ModeToggle";

const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-[2px] w-[50px!important] bg-zinc-300 dark:bg-zinc-700 rounded-md  mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-[42px!important] w-[42px!important]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
