// src/components/FeatureStrip.tsx
import {
  RiTruckLine,
  RiMedalLine,
  RiStore2Line,
} from 'react-icons/ri';
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

/**
 * Feature strip 100 % responsive.
 * • `mt-10` agrega el espacio vertical que pediste respecto
 *   a la sección anterior (≈ 40 px)  
 * • Resto de utilidades igual que antes.
 */
export const FeatureStrip = (): ReactElement => (
  <section className="mt-10 w-full bg-[#7BAF8C] py-8 md:py-10">
    <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-8 px-4 sm:flex-row sm:justify-between">
      {FEATURES.map(({ icon: Icon, lines }) => (
        <div
          key={lines.join('-')}
          className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <Icon
            size={96}
            className="shrink-0 text-black scale-75 sm:scale-90 md:scale-100"
          />
          <p className="font-cap-hero text-base leading-tight text-white sm:text-lg md:text-xl">
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
