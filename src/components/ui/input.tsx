
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);
    
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background/5 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:bg-background/10 md:text-sm",
          focused ? "bg-background/20" : "",
          className
        )}
        ref={ref}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus && props.onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur && props.onBlur(e);
        }}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
