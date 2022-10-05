// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {HTMLProps, ReactNode} from 'react';
import styled from 'styled-components';

export const OkButton = styled.button`
    background-color: var(--button-bg);
    color: var(--button-color);
    border-radius: 50%;
    width: 28px;
    height: 28px;
    border-width: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CancelButton = styled.button`
    background-color: var(--button-color);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    border-width: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
`;

export const Duration = styled.div`
    padding-inline-end: 1.5rem;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: var(--center-channel-text);
`;

export const TextColumn = styled.div`
flex: 1;
display: flex;
flex-direction: column;
text-decoration: none;
`;

const TextOverFlowStopDiv = styled.div`
    max-width: 20rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-word;
`;

export const Title = styled(TextOverFlowStopDiv)`
    color: var(--center-channel-text);
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
`;

export const Subtitle = styled(TextOverFlowStopDiv)`
    color: rgba(var(--center-channel-color-rgb), 0.56);
    font-size: 12px;
    line-height: 16px;
`;

interface AttachmentContainerProps extends HTMLProps<HTMLDivElement> {
    icon: ReactNode;
    onIconClick?: () => void;
    iconDanger?: boolean;
}

const IconWrapper = styled.div<Pick<AttachmentContainerProps, 'iconDanger'>>`
    width: 40px;
    background-color: ${(props) => (props.iconDanger ? 'var(--error-text)' : 'rgba(var(--button-bg-rgb), 0.12)')};
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
`;

const ControlsColumn = styled.div`
    position: relative;
    display: flex;
    overflow: hidden;
    height: 100%;
    flex: 1;
    align-items: center;
    font-size: 12px;
    text-align: left;
    padding-right: 1rem;
    justify-content: space-between;
`;

export const AttachmentContainer = ({icon, onIconClick, iconDanger, children}: AttachmentContainerProps) => {
    return (
        <div className='file-preview__container'>
            <div className='file-preview post-image__column'>
                <div className='post-image__thumbnail'>
                    <IconWrapper
                        onClick={onIconClick}
                        iconDanger={iconDanger}
                    >
                        {icon}
                    </IconWrapper>
                </div>
                <ControlsColumn>
                    {children}
                </ControlsColumn>
            </div>
        </div>
    );
};