"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationStackItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const NotificationStackItem = ({ remove, item }) => {
    const controls = framer_motion_1.useAnimation();
    react_1.default.useEffect(() => {
        controls.start({
            x: "-100%",
            transition: {
                duration: item.remaining / 1000,
                ease: "linear",
            },
        });
    }, [controls, item]);
    const handler = react_1.default.useMemo(() => {
        if (item.timeout) {
            const handleMouseEnter = () => {
                controls.stop();
                item.remaining = item.remaining - (new Date().getTime() - item.startTime);
            };
            const handleMouseLeave = () => {
                controls.start({
                    x: "-100%",
                    transition: { duration: item.remaining / 1000, ease: "linear" },
                });
                item.startTime = new Date().getTime();
            };
            return {
                handleMouseEnter,
                handleMouseLeave,
            };
        }
    }, [controls, item]);
    return (jsx_runtime_1.jsx(framer_motion_1.motion.div, Object.assign({ layout: true }, { children: jsx_runtime_1.jsxs(framer_motion_1.motion.div, Object.assign({ "data-notification-variant": "success", initial: { opacity: 0, x: "100%" }, animate: { opacity: 1, x: "0%" }, exit: { opacity: 0, x: "100%" }, transition: { duration: 0.5, type: "spring", bounce: 0.1 }, "aria-label": "notification-item", onMouseEnter: handler === null || handler === void 0 ? void 0 : handler.handleMouseEnter, onMouseLeave: handler === null || handler === void 0 ? void 0 : handler.handleMouseLeave }, { children: [item.content, jsx_runtime_1.jsx("div", Object.assign({ style: {
                        marginLeft: 10,
                        padding: 3,
                        display: "flex",
                        cursor: "pointer",
                    }, onClick: () => remove(item.id) }, { children: "Remove" }), void 0),
                item.timeout && (jsx_runtime_1.jsx(framer_motion_1.motion.div, { "data-remaining-progress": true, initial: { x: "0%" }, animate: controls, onAnimationComplete: () => remove(item.id) }, void 0))] }), void 0) }), item.id));
};
exports.NotificationStackItem = NotificationStackItem;
//# sourceMappingURL=NotificationStackItem.js.map