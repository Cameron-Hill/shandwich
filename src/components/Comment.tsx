import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface CommentProps {
  author: string;
  content: string;
  createdAt: Date;
}

export function Comment({ author, content, createdAt }: CommentProps) {
  return (
    <Card className="p-4">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/avatars/default.png" alt="Avatar" />
          <AvatarFallback>{author[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-sm font-medium">{author}</CardTitle>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(createdAt)} ago
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
}
