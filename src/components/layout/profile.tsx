import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

interface Props {
  name: string
  avatar?: string | null
}

export const Profile = ({ name, avatar }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger
        children={
          <Avatar>
            <AvatarImage src={avatar ?? undefined} />
            <AvatarFallback>
              {name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        }
      />
      <TooltipContent>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  )
}
