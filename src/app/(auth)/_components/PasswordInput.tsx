import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, useState } from "react";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                className={cn(className)}
                ref={ref}
                {...props}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 bg-background border border-input border-l-0 rounded-l-none"
                onClick={togglePasswordVisibility}
                tabIndex={-1}
            >
                {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                ) : (
                    <EyeIcon className="h-4 w-4" />
                )}
            </Button>
        </div>
    )
}
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput };

