import { useRef } from "react";

type AccordionProps = {
  option: string | null;
  stateOption: string | null;
  setStateOption: (day: string | null) => void;
  data: any[] | null;
  RenderComponent: React.ComponentType<any>; // 👈 accept any React component
};

export default function Accordion({
  option,
  stateOption,
  setStateOption,
  data,
  RenderComponent,
}: AccordionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const isOpen = stateOption === option;

  return (
    <div className="w-full mb-4 border-4 border-teal rounded-xl overflow-hidden">
      <button
        onClick={() => setStateOption(isOpen ? null : option)}
        className="w-full bg-bark text-cream text-2xl p-4 text-left hover:bg-bark/80 transition"
      >
        {option}
      </button>

      <div
        ref={contentRef}
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        } bg-teal `}
      >
        <div className="p-4">
          {data?.length ? (
            <ul className="flex flex-col lg:flex-row lg:flex-flow-col lg:flex-wrap gap-4">
              {data.map((item) => (
                <li key={item.id}>
                  <RenderComponent {...item} variant="small" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-cream text-xl">
              Sorry, I haven’t found any quizzes on this day yet! Please let me
              know if you know of any 😊
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
