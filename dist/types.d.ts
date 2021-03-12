import { ReactNode } from "react";
export declare type push = (Snackbar: any) => number;
export declare type remove = (id: number) => void;
export interface NotificationStackProps {
    children: ReactNode;
    maxStack?: number;
    yPlacement: "top" | "bottom";
    xPlacement: "left" | "middle" | "right";
}
export interface NotificationStackItemProps {
    item: Snackbar;
    remove: remove;
}
export interface NotificationStackContextProps {
    push: push;
    remove: remove;
}
export interface Snackbar {
    content: string;
    id: number;
    remaining?: number;
    startTime: number;
    timeout?: number;
    variant: "success" | "error" | "severity" | "loading" | string;
}
//# sourceMappingURL=types.d.ts.map