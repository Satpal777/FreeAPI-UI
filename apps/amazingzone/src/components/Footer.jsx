export default function Footer() {
  return (
    <footer className="bg-amazon-sub text-white py-8 mt-auto">
      <div className="flex flex-col items-center justify-center text-sm gap-2">
        <div className="flex gap-4 mb-4 font-bold text-amazon-bg">
          <a href="#" className="hover:underline">Conditions of Use</a>
          <a href="#" className="hover:underline">Privacy Notice</a>
          <a href="#" className="hover:underline">Help</a>
        </div>
        <p className="text-gray-400">© 2026, Amazing Zone, or its affiliates</p>
      </div>
    </footer>
  );
}
