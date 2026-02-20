export function Button({ children, className = "", variant }: any) {
    const base = "px-4 py-2 rounded-xl border";
    const style =
        variant === "outline"
            ? "bg-white border-gray-300"
            : "bg-black text-white border-black";

    return <button className={`${base} ${style} ${className}`}>{children}</button>;
}
