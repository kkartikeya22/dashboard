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
    <div className="flex-1 relative flex items-center gap-2">
      <Input 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Ask InvestigationGPT..." 
        className="flex-1 h-8 px-3 pr-[34px]" 
      />
      {message && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute right-3 h-4 w-4 rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={handleClear}
        >
          <X className="h-2.5 w-2.5 text-gray-600" />
          <span className="sr-only">Clear message</span>
        </Button>
      )}
    </div>
  )
}
