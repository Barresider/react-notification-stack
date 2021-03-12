import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import React from "react";
import { NotificationStackItem } from "./NotificationStackItem";
import "./NotificationStack.style.scss";
import { Snackbar, NotificationStackProps, NotificationStackContextProps } from "./types";

export const NotificationStackContext = React.createContext<NotificationStackContextProps>({} as NotificationStackContextProps);

export const NotificationStack: React.FC<NotificationStackProps> = ({
	children,
	maxStack = 0,
	yPlacement = "top",
	xPlacement = "right",
}) => {
	const anchors = {
		"top-left": { top: 0, left: 0 },
		"top-right": { top: 0, right: 0 },
		"bottom-left": { bottom: 0, left: 0 },
		"bottom-right": { bottom: 0, right: 0 },
	};

	const items = React.useRef<Snackbar[]>([]);
	const setRerender = React.useState(false)[1];

	const rerender = React.useCallback(() => setRerender((r) => !r), [setRerender]);

	const push = React.useCallback(
		({ timeout = 15000, variant = "success", content = "Herzlichen Glückwunsch!" }) => {
			const generateId: any = (): number => {
				const id = parseInt(Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join(""));
				if (items.current.findIndex((v) => v.id === id) === -1) {
					return id;
				} else {
					return generateId();
				}
			};

			const id = generateId();

			items.current.push({
				content,
				id,
				remaining: timeout,
				startTime: new Date().getTime(),
				timeout,
				variant,
			});

			if (maxStack && items.current.length > maxStack) {
				items.current = items.current.slice(1, items.current.length);
			}

			rerender();

			return id;
		},
		[rerender, maxStack]
	);

	const remove = React.useCallback(
		(id) => {
			const index = items.current.findIndex((v) => v.id === id);
			if (index !== -1) {
				items.current = items.current.filter((v) => v.id !== id);
				rerender();
			}
		},
		[rerender]
	);

	const contextValue = React.useMemo(() => ({ push, remove }), [push, remove]);

	return (
		<>
			<NotificationStackContext.Provider value={contextValue}>{children}</NotificationStackContext.Provider>
			<AnimateSharedLayout>
				<motion.div
					// style={{ ...anchors[anchor] }}
					data-notification-placement={`${yPlacement}-${xPlacement}`}
					layout
					aria-expanded={items.current.length > 0}
					aria-label="notification"
				>
					<AnimatePresence>
						{items.current.map((i) => (
							<NotificationStackItem remove={remove} item={i} key={i.id} />
						))}
					</AnimatePresence>
				</motion.div>
			</AnimateSharedLayout>
		</>
	);
};
