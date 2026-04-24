import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/axios";
import Image from "next/image";
import {
  AtIcon,
  EnvelopeIcon,
  ForkKnifeIcon,
  GearSixIcon,
  SignOutIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useProfile } from "@/hooks/useAuth";

interface AvatarButtonProps {
  profile?: {
    profile_url?: string;
    fullName?: string;
  };
}

const AvatarButton = ({ profile }: AvatarButtonProps) => {
  if (profile?.profile_url) {
    return (
      <Image
        src={profile.profile_url}
        alt={profile.fullName || "Profile"}
        width={38}
        height={38}
        className="rounded-full object-cover ring-2 ring-primary shadow-sm hover:ring-primary/50 transition-all duration-200 cursor-pointer h-10 w-10"
      />
    );
  }

  return (
    <div
      className={`w-9.5 h-9.5 rounded-full flex items-center justify-center text-white text-sm font-semibold ring-2 ring-primary shadow-sm hover:ring-primary/50 transition-all duration-200 cursor-pointer select-none`}
    >
      {profile?.fullName}
    </div>
  );
};

export const ProfileDropdown = () => {
  const { profile, isProfileLoading } = useProfile();
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="outline-none focus:outline-none">
          {isProfileLoading ? (
            <div className="w-9.5 h-9.5 rounded-full bg-background animate-pulse ring-2 ring-background" />
          ) : (
            <AvatarButton profile={profile} />
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 p-1.5 rounded-xl shadow-lg border border-border/60 bg-white dark:bg-slate-950 dark:border-slate-800"
        align="end"
        sideOffset={8}
      >
        {/* Profile header */}
        <div className="flex items-center gap-3 px-2.5 py-2.5 mb-1">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 ring-2 ring-primary shadow-sm`}
          >
            {profile?.profile_url && (
              <Image
                src={profile.profile_url}
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full object-cover h-8 w-8"
              />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-foreground truncate leading-tight">
              {profile?.fullName || "Anonymous"}
            </span>
            <span className="text-xs text-muted-foreground truncate leading-tight">
              {profile?.email}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm cursor-default">
            <AtIcon
              size={32}
              className="text-muted-foreground shrink-0"
              weight="bold"
            />
            <span className="text-muted-foreground truncate">
              {profile?.username || "—"}
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm cursor-default">
            <EnvelopeIcon
              size={32}
              className="text-muted-foreground shrink-0"
              weight="bold"
            />
            <span className="text-muted-foreground truncate">
              {profile?.email || "—"}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuGroup>
          <Link href="/settings" className="w-full">
            <DropdownMenuItem className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm cursor-pointer hover:bg-accent focus:bg-accent">
              <GearSixIcon size={32} className="shrink-0" weight="bold" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuGroup>
          {profile?.role === "user" && (
            <Link href="/recipes" className="w-full">
              <DropdownMenuItem className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm cursor-pointer hover:bg-accent focus:bg-accent">
                <ForkKnifeIcon size={32} className="shrink-0" weight="bold" />
                <span>Recipes</span>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          onSelect={() => logout()}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm cursor-pointer text-red-500 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-500"
        >
          <SignOutIcon size={32} className="shrink-0" weight="bold" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
