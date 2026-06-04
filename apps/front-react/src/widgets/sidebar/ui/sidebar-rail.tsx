import { Command, LucideSettings, MessageSquare } from 'lucide-react';

import { getImageUrl } from '@/shared/lib/get-image-url';
import { useAppSelector } from '@/shared/lib/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Sheet, SheetTrigger } from '@/shared/ui/sheet';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/shared/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { ProfileSheet } from './profile-sheet';
import { SettingsSheet } from './settings-sheet';

export function SidebarRail() {
    const user = useAppSelector((state) => state.session.user);

    return (
        <Sidebar
            collapsible="none"
            className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r bg-background"
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="md:h-8 md:p-0"
                        >
                            <a href="#">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        Acme Inc
                                    </span>
                                    <span className="truncate text-xs">
                                        Enterprise
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="px-1.5 md:px-0">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    tooltip={{
                                        children: 'Чаты',
                                        hidden: false,
                                    }}
                                    isActive={true}
                                    className="px-2.5 md:px-2"
                                >
                                    <MessageSquare />
                                    <span>Чаты</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            {user && (
                <SidebarFooter>
                    <Sheet>
                        <SheetTrigger>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="size-8 flex items-center justify-center hover:bg-sidebar-accent rounded-md transition-colors cursor-pointer text-muted-foreground">
                                        <LucideSettings className="size-5" />
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Настройки
                                </TooltipContent>
                            </Tooltip>
                        </SheetTrigger>
                        <SettingsSheet user={user} />
                    </Sheet>

                    <Sheet>
                        <SheetTrigger>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Avatar className="size-8 rounded-lg cursor-pointer hover:opacity-80 transition-opacity">
                                        <AvatarImage
                                            src={getImageUrl(user.avatar)}
                                            alt={user.name || ''}
                                        />
                                        <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                            {user.username
                                                .slice(0, 2)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Профиль
                                </TooltipContent>
                            </Tooltip>
                        </SheetTrigger>
                        <ProfileSheet user={user} />
                    </Sheet>
                </SidebarFooter>
            )}
        </Sidebar>
    );
}
