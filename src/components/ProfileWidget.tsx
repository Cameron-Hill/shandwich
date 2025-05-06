"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Settings } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export function ProfileWidget() {
  const { user, isLoaded } = useUser();
  if (!isLoaded || !user) return null;
  const userName = (user.publicMetadata.userName || "user") as string;
  const avatarUrl = user.imageUrl;
  const notifications = 0;

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarUrl || "/avatars/default.png"} alt="Avatar" />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{userName}</h3>
            <p className="text-muted-foreground text-sm">#{user?.id}</p>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon">
              <Bell />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {notifications}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Settings />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
