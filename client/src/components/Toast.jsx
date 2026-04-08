import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, CircleCheckBig, X } from "lucide-react";

const Toast = ({ toast, onClose }) => (
  <AnimatePresence>
    {toast ? (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="fixed bottom-6 right-6 z-50 min-w-72 rounded-xl border border-white/30 bg-white/90 p-4 shadow-soft backdrop-blur dark:border-white/10 dark:bg-slate-900/85"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            {toast.type === "error" ? (
              <CircleAlert className="text-rose-500" size={18} />
            ) : (
              <CircleCheckBig className="text-emerald-500" size={18} />
            )}
            <p className="text-sm">{toast.message}</p>
          </div>
          <button type="button" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);

export default Toast;
