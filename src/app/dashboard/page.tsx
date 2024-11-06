import { CreateUserFormAdmin } from "@/components/create-user-form-admin";
import { ListUsers } from "@/components/list-users";
import { LogoutButton } from "@/components/logout";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import {
  ChevronDownIcon,
  HomeIcon,
  ChartColumnDecreasingIcon,
  Rows2Icon,
  ListTodoIcon,
  Copy,
  ExternalLink,
} from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const [session, activeSessions, organizations] = await Promise.all([
    auth.api.getSession({
      headers: await headers(),
    }),
    auth.api.listSessions({
      headers: await headers(),
    }),
    auth.api.listOrganization({
      headers: await headers(),
    }),
  ]).catch((e) => {
    console.log(e);
    throw redirect("/sign-in");
  });
  // const sessions = await authClient.listSessions();

  if (!session) {
    return <div>Not authenticated</div>;
  }
  return (
    <div>
      <CreateUserFormAdmin />
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      select workspace <ChevronDownIcon className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                    <DropdownMenuItem>
                      <span>Acme Inc</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Acme Corp.</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <HomeIcon />
                        <span>Home</span>
                      </a>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem />
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <ChartColumnDecreasingIcon />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Rows2Icon />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <ListTodoIcon />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <LogoutButton>
                  <ListTodoIcon />
                  <span>Logout</span>
                </LogoutButton>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarFooter>
        </Sidebar>
        <main className="p-5 px-8 w-full">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-2xl text-[#181D27]">
              My Dashboard
            </h1>

            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                What&apos;s new?
              </Button>
              <Button variant="outline">
                <Copy />
                Copy Link
              </Button>
              <Button variant="outline">
                Visit store <ExternalLink />
              </Button>
            </div>
          </div>

          <pre>{JSON.stringify(session, null, 2)}</pre>

          <pre>{JSON.stringify(activeSessions, null, 2)}</pre>

          <pre className="mt-5 bg-red-400">
            {JSON.stringify(organizations, null, 2)}
          </pre>

          <ListUsers />
        </main>
      </SidebarProvider>
    </div>
  );
}
