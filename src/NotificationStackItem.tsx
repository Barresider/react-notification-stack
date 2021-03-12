import React from "react";
import { motion, useAnimation } from "framer-motion";
import { NotificationStackItemProps } from "./types";

export const NotificationStackItem: React.FC<NotificationStackItemProps> = ({ remove, item }) => {
	const controls = useAnimation();
	React.useEffect(() => {
		controls.start({
			x: "-100%",
			transition: {
				duration: item!.remaining! / 1000,
				ease: "linear",
			},
		});
	}, [controls, item]);

	const handler = React.useMemo(() => {
		if (item.timeout) {
			const handleMouseEnter = () => {
				controls.stop();
				item.remaining = item!.remaining! - (new Date().getTime() - item.startTime);
			};
			const handleMouseLeave = () => {
				controls.start({
					x: "-100%",
					transition: { duration: item!.remaining! / 1000, ease: "linear" },
				});
				item.startTime = new Date().getTime();
			};

			return {
				handleMouseEnter,
				handleMouseLeave,
			};
		}
	}, [controls, item]);
	return (
		<motion.div key={item.id} layout>
			<motion.div
				data-notification-variant="success"
				initial={{ opacity: 0, x: "100%" }}
				animate={{ opacity: 1, x: "0%" }}
				exit={{ opacity: 0, x: "100%" }}
				transition={{ duration: 0.5, type: "spring", bounce: 0.1 }}
				aria-label="notification-item"
				onMouseEnter={handler?.handleMouseEnter}
				onMouseLeave={handler?.handleMouseLeave}
			>
				{item.content}
				<div
					style={{
						marginLeft: 10,
						padding: 3,
						display: "flex",
						cursor: "pointer",
					}}
					onClick={() => remove!(item.id)}
				>
					Remove
				</div>
				{item.timeout && (
					<motion.div
						data-remaining-progress
						initial={{ x: "0%" }}
						animate={controls}
						onAnimationComplete={() => remove!(item.id)}
					></motion.div>
				)}
			</motion.div>
		</motion.div>
	);
};
