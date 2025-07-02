import { RiTruckLine, RiMedalLine, RiStore2Line } from 'react-icons/ri';
import type { ReactElement, ElementType } from 'react';

interface Item {
  icon: ElementType;
  lines: string[];
}

const FEATURES: Item[] = [
  { icon: RiTruckLine, lines: ['Envíos a', 'todo el país'] },
  { icon: RiMedalLine, lines: ['Productos', 'certificados'] },
  { icon: RiStore2Line, lines: ['Tiendas', 'certificadas'] },
];

export const FeatureStrip = (): ReactElement => (
  <section className="mt-10 w-full bg-primary py-8 text-primary-foreground md:py-10">
    <div
      className="
        mx-auto grid max-w-screen-xl
        grid-cols-1 gap-y-8 gap-x-6 px-4
        sm:grid-cols-3
      "
    >
      {FEATURES.map(({ icon: Icon, lines }) => (
        <div
          key={lines.join('-')}
          className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:items-start"
        >
          <Icon
            size={96}
            className="shrink-0 scale-75 sm:scale-90 md:scale-100"
          />
          <p className="text-center font-cap-hero text-base leading-tight sm:text-left sm:text-lg md:text-xl">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default FeatureStrip;
