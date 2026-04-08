import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="rounded-2xl border border-white/20 bg-white/70 p-8 text-center shadow-soft dark:border-white/10 dark:bg-slate-900/60">
    <h1 className="font-display text-4xl font-bold">404</h1>
    <p className="mt-2 text-slate-600 dark:text-slate-300">The page you are looking for does not exist.</p>
    <Link to="/" className="mt-4 inline-block rounded-xl bg-slate-900 px-4 py-2 text-white dark:bg-white dark:text-slate-900">
      Back Home
    </Link>
  </div>
);

export default NotFound;
