"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationStack = exports.NotificationStackContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const framer_motion_1 = require("framer-motion");
const react_1 = __importDefault(require("react"));
const NotificationStackItem_1 = require("./NotificationStackItem");
require("./NotificationStack.style.scss");
exports.NotificationStackContext = react_1.default.createContext({});
const NotificationStack = ({ children, maxStack = 0, yPlacement = "top", xPlacement = "right", }) => {
    const anchors = {
        "top-left": { top: 0, left: 0 },
        "top-right": { top: 0, right: 0 },
        "bottom-left": { bottom: 0, left: 0 },
        "bottom-right": { bottom: 0, right: 0 },
    };
    const items = react_1.default.useRef([]);
    const setRerender = react_1.default.useState(false)[1];
    const rerender = react_1.default.useCallback(() => setRerender((r) => !r), [setRerender]);
    const push = react_1.default.useCallback(({ timeout = 15000, variant = "success", content = "Herzlichen Glückwunsch!" }) => {
        const generateId = () => {
            const id = parseInt(Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join(""));
            if (items.current.findIndex((v) => v.id === id) === -1) {
                return id;
            }
            else {
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
    }, [rerender, maxStack]);
    const remove = react_1.default.useCallback((id) => {
        const index = items.current.findIndex((v) => v.id === id);
        if (index !== -1) {
            items.current = items.current.filter((v) => v.id !== id);
            rerender();
        }
    }, [rerender]);
    const contextValue = react_1.default.useMemo(() => ({ push, remove }), [push, remove]);
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx(exports.NotificationStackContext.Provider, Object.assign({ value: contextValue }, { children: children }), void 0),
            jsx_runtime_1.jsx(framer_motion_1.AnimateSharedLayout, { children: jsx_runtime_1.jsx(framer_motion_1.motion.div, Object.assign({ "data-notification-placement": `${yPlacement}-${xPlacement}`, layout: true, "aria-expanded": items.current.length > 0, "aria-label": "notification" }, { children: jsx_runtime_1.jsx(framer_motion_1.AnimatePresence, { children: items.current.map((i) => (jsx_runtime_1.jsx(NotificationStackItem_1.NotificationStackItem, { remove: remove, item: i }, i.id))) }, void 0) }), void 0) }, void 0)] }, void 0));
};
exports.NotificationStack = NotificationStack;
//# sourceMappingURL=NotificationStack.js.map