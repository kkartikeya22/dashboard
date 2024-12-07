import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, X } from "lucide-react"

interface InvestigationGPTInputProps {
  message: string
  setMessage: (message: string) => void
}

export function InvestigationGPTInput({ message, setMessage }: InvestigationGPTInputProps) {
  const handleClear = () => {
    setMessage("")
  }

  return (
    <div className="flex-1 relative flex items-center gap-1 sm:gap-2">
      <Input 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Ask InvestigationGPT..." 
        className={`
          flex-1
          h-7 sm:h-8 md:h-9
          text-sm sm:text-base
          px-2 sm:px-3 
          pr-[30px] sm:pr-[34px] md:pr-[38px]
          bg-gradient-to-r from-background via-secondary/20 to-primary/10
          border-primary/20 focus:border-primary/40
          placeholder:text-muted-foreground/60
          focus:ring-primary/20
        `}
      />
      {message && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={`
            absolute 
            right-2 sm:right-3
            h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5
            rounded-full
            bg-primary/10 hover:bg-primary/20
            text-primary/60 hover:text-primary/80
            transition-colors duration-200
          `}
          onClick={handleClear}
        >
          <X className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3" />
          <span className="sr-only">Clear message</span>
        </Button>
      )}
    </div>
  )
}
