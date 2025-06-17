import type { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import clsx from 'clsx';
import type { LinkItem } from '../types/link.type';

const linkBase =
    'cursor-pointer text-sm font-cap-link tracking-wide transition-colors hover:underline underline-offset-4';

interface Props extends LinkItem {
    onClick?: () => void;
    closeMobile?: () => void;
}

export const RenderLink: FC<Props> = ({ to, label, onClick, closeMobile }) => {
    const location   = useLocation();
    const targetHash = to.includes('#') ? to.slice(to.indexOf('#')) : null;

    const isActiveHash =
        targetHash === '#'
        ? location.hash === '' || location.hash === '#'
        : targetHash && location.hash === targetHash;

    const isActivePath = !targetHash && location.pathname === to;
    const activeCls    = isActiveHash || isActivePath
        ? 'text-highlight underline decoration-2'
        : '';

    const handle = () => {
        onClick?.();
        closeMobile?.();
    };

    if (targetHash) {
        const id = targetHash === '#' ? 'top' : targetHash.replace('#', '');
        return (
        <ScrollLink
            to={id}
            smooth
            duration={600}
            offset={-80}
            onClick={handle}
            className={clsx(linkBase, activeCls)}
        >
            {label}
        </ScrollLink>
        );
    }

    return (
        <NavLink to={to} onClick={handle} className={() => clsx(linkBase, activeCls)}>
        {label}
        </NavLink>
    );
};
