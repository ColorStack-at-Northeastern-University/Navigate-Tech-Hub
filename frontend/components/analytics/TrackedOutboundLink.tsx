'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import type { ValueEventName, ValueEventProperties } from '@/lib/analytics';
import { trackValueEvent } from '@/lib/analytics';

type TrackedOutboundLinkProps<Name extends ValueEventName> =
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> & {
        eventName: Name;
        eventProperties?: ValueEventProperties[Name];
        children: ReactNode;
        onClick?: AnchorHTMLAttributes<HTMLAnchorElement>['onClick'];
    };

export default function TrackedOutboundLink<Name extends ValueEventName>({
    eventName,
    eventProperties,
    onClick,
    children,
    ...props
}: TrackedOutboundLinkProps<Name>) {
    return (
        <a
            {...props}
            onClick={(event) => {
                trackValueEvent(eventName, eventProperties);
                onClick?.(event);
            }}
        >
            {children}
        </a>
    );
}
