import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getTime } from "@/utils/ui";

export type RecipeProps = {
  name: string
  description: string;
  preparetime: string;
  serves: string;
  difficulty: string;
  recipetype: string;
  category: string;
}

export default function Recipe({
  name,
  description,
  preparetime,
  serves,
  difficulty,
  category,
  recipetype,
}: RecipeProps
) {
  return (
    <Dialog>
      <DialogTrigger>
        <Card>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Time to Prepare: {getTime(preparetime)}</p>
            <p>Serves: {serves}</p>
            <p>Category: {category}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p>{recipetype}</p>
            <p>{difficulty}</p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
