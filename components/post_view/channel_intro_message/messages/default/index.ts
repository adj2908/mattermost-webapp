// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getConfig} from 'mattermost-redux/selectors/entities/general';
import {getCurrentChannel} from 'mattermost-redux/selectors/entities/channels';
import {getCurrentTeam} from 'mattermost-redux/selectors/entities/teams';
import {GlobalState} from 'types/store';

import DefaultIntroMessage from './default';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const enableUserCreation = config.EnableUserCreation === 'true';
    const isReadOnly = false;
    const team = getCurrentTeam(state);
    const channel = getCurrentChannel(state) || {};

    return {
        channel,
        enableUserCreation,
        isReadOnly,
        teamIsGroupConstrained: Boolean(team.group_constrained),
    };
}

export default connect(mapStateToProps)(DefaultIntroMessage);