"use client"
import {
  Book,
  Flag,
  Monitor
} from "lucide-react"
import * as React from "react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar
} from "@/components/ui/sidebar"
import Link from "next/link"
import ToggleTheme from "./toggle-theme"

// This is sample data.
const data = {
  user: {
    name: "Wargas Teixeira",
    email: "wargasteixeira@hotmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  menu: [
    {
      name: "Catálogo de cursos",
      url: "/dashboard",
      icon: Monitor,
    },
    {
      name: "Assinaturas",
      url: "/assinaturas",
      icon: Book,
    },
    {
      name: "Trilha Estratégica",
      url: "#",
      icon: Flag,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


  const { isMobile } = useSidebar()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <img className="hidden dark:block" src="/logo-dark.svg" alt="logo"></img>
                <img className="block dark:hidden" src="/logo.svg" alt="logo"></img>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {data.menu.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>

              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="flex justify-between items-center">
              <ToggleTheme />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
