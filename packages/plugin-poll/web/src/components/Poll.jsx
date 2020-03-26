import React, { Component } from 'react';
import cls from 'classnames';

import { AddIcon } from '../assets/icons';
import { LAYOUT } from '../constants';

import { withPoll, PollContextPropTypes } from './poll-context';
import { withRCEHelpers, RCEHelpersPropTypes } from './rce-helpers-context';
import { PollHeader } from './poll-header';
import { PollOption } from './option';

import styles from './poll.scss';

class PollComponent extends Component {
  static propTypes = {
    ...PollContextPropTypes,
    ...RCEHelpersPropTypes,
  };

  handleOptionUpdate(index) {
    return option => this.props.updatePollOption(index, option);
  }

  handleOptionRemove(index) {
    return () => this.props.removeOption(index);
  }

  render() {
    const { poll, rce, addOption, design, layout, vote, unvote } = this.props;
    const style = {
      ...design,
    };

    return (
      <div className={styles.container} style={style}>
        <PollHeader />

        <ul
          className={cls(styles.options, {
            [styles.list]: layout.type === LAYOUT.LIST,
            [styles.grid]: layout.type === LAYOUT.GRID,
          })}
        >
          {poll.options.map(option => (
            <li className={styles.option} key={option.localId}>
              <PollOption
                imageEnabled={layout.type === LAYOUT.GRID}
                option={option}
                update={this.handleOptionUpdate(option.localId)}
                remove={this.handleOptionRemove(option.localId)}
                removeEnabled={!rce.isViewMode && poll.options.length > 1}
                vote={vote}
                unvote={unvote}
                poll={poll}
                isViewMode={rce.isViewMode}
              />
            </li>
          ))}

          {!rce.isViewMode && (
            <li>
              <button onClick={addOption} className={styles.addOptionButton}>
                {layout.type === LAYOUT.GRID ? <AddIcon /> : 'Add answer'}
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export const Poll = withRCEHelpers(withPoll(PollComponent));
