import { ReactNode } from "react";

/**
 *
 * @description
 * Pushes a new snackbar to the notification stack
 * @returns {number}
 * A number which is used the remove the snackbar
 */
export type push = (Snackbar: any) => number;
/**
 * @description
 * Removes the snackbar with the given id from the notification stack
 * @returns {void}
 */
export type remove = (id: number) => void;

export interface NotificationStackProps {
	children: ReactNode;
	/**
	 * @description
	 * The max number of snackbar in the notification stack. Leave it at zero for infinite stacks
	 */
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
