export default function Header() {
  return (
    <div className="bg-gradient-to-r from-[#1956E1] to-[#1584F3] text-white pt-6 pb-12 px-8 shadow-md">
      <div className="container mx-auto">
        <p className="text-sm font-medium text-white/90 mb-1">
          Dashboard / Overview
        </p>
        <h1 className="text-2xl font-thin mb-1.5">
          Welcome back, <span className="font-bold">Nelson Juma</span>
        </h1>
        <p className="text-xs text-white/80">
        Here&rsquo;s a snapshot of how the bank has performed so far
        </p>
      </div>
    </div>
  );
}
