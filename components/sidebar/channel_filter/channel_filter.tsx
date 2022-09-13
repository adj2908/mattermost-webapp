// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import classNames from 'classnames';

import {trackEvent} from 'actions/telemetry_actions';
import OverlayTrigger from 'components/overlay_trigger';
import Tooltip from 'components/tooltip';
import * as Utils from 'utils/utils';
import Constants from 'utils/constants';
import KeyboardShortcutSequence, {KEYBOARD_SHORTCUTS} from 'components/keyboard_shortcuts/keyboard_shortcuts_sequence';

type Props = {
    hasMultipleTeams: boolean;
    unreadFilterEnabled: boolean;
    actions: {
        setUnreadFilterEnabled: (enabled: boolean) => void;
    };
};

type State = {

};

export default class ChannelFilter extends React.PureComponent<Props, State> {
    componentDidMount() {
        document.addEventListener('keydown', this.handleUnreadFilterKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleUnreadFilterKeyPress);
    }

    handleUnreadFilterClick = (e?: React.MouseEvent) => {
        e?.preventDefault();
        this.toggleUnreadFilter();
    }

    handleUnreadFilterKeyPress = (e: KeyboardEvent) => {
        if (Utils.cmdOrCtrlPressed(e) && e.shiftKey && Utils.isKeyPressed(e, Constants.KeyCodes.U)) {
            e.preventDefault();
            this.toggleUnreadFilter();
        }
    }

    toggleUnreadFilter = () => {
        const {unreadFilterEnabled} = this.props;

        if (unreadFilterEnabled) {
            trackEvent('ui', 'ui_sidebar_unread_filter_disabled');
        } else {
            trackEvent('ui', 'ui_sidebar_unread_filter_enabled');
        }

        this.props.actions.setUnreadFilterEnabled(!unreadFilterEnabled);
    }

    render() {
        const {unreadFilterEnabled, hasMultipleTeams} = this.props;

        let tooltipMessage = Utils.localizeMessage('sidebar_left.channel_filter.filterByUnread', 'Filter by unread');

        if (unreadFilterEnabled) {
            tooltipMessage = Utils.localizeMessage('sidebar_left.channel_filter.showAllChannels', 'Show all channels');
        }

        const tooltip = (
            <Tooltip
                id='new-group-tooltip'
                className='hidden-xs'
            >
                {tooltipMessage}
                <KeyboardShortcutSequence
                    shortcut={KEYBOARD_SHORTCUTS.navToggleUnreads}
                    hideDescription={true}
                    isInsideTooltip={true}
                />
            </Tooltip>
        );

        return (
            <div className='SidebarFilters'>
                <OverlayTrigger
                    delayShow={500}
                    placement={hasMultipleTeams ? 'top' : 'right'}
                    overlay={tooltip}
                >
                    <a
                        href='#'
                        className={classNames('SidebarFilters_filterButton', {
                            active: unreadFilterEnabled,
                        })}
                        onClick={this.toggleUnreadFilter}
                        aria-label={tooltipMessage}
                    >
                        <i className='icon icon-filter-variant'/>
                    </a>
                </OverlayTrigger>
            </div>
        );
    }
}
