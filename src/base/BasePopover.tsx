import React from 'react'
import { Popover, Whisper } from 'rsuite';
import { TypeAttributes } from 'rsuite/esm/@types/common';
import { OverlayTriggerType } from 'rsuite/esm/Overlay/OverlayTrigger';

type BasePopoverProps = {
    content: React.ReactElement;
    title?: any;
    children: React.ReactElement;
    trigger?: OverlayTriggerType;
    placement?: TypeAttributes.Placement;
}

function BasePopover({ content, title = undefined, children, trigger = "click", placement = "rightStart" }: BasePopoverProps) {


    return (
        <Whisper
            trigger={trigger}
            placement={placement}
            controlId={`control-id-${placement}`}
            speaker={<Popover>{content}</Popover>}
        >
            {children}
        </Whisper>
    )
}

export default BasePopover