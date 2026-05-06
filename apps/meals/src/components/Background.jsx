export default function Background() {
  return (
    <>
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-brand-light/30 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-main/20 rounded-full blur-[100px] animate-[pulse_4s_ease-in-out_infinite] pointer-events-none"></div>
      <div className="absolute top-[30%] right-[20%] w-[40vw] h-[40vw] bg-brand-dark/10 rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite] pointer-events-none"></div>
    </>
  );
}
