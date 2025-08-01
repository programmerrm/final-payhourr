import React from "react";

interface ButtonProps {
    text: string;
    buttonType: "submit" | "reset" | "button";
    variant: string;
    handleFunction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({ text, buttonType, variant, handleFunction }) => {
    const handleClick = handleFunction || (() => {});
    return (
        <button className={variant} type={buttonType} onClick={handleClick}>
            {text}
        </button>
    );
}
