import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ open, title, children, onClose }) => (
  <AnimatePresence>
    {open ? (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">{title}</h3>
            <button type="button" onClick={onClose} className="text-sm text-slate-500">
              Close
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);

export default Modal;
