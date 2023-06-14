import React from 'react';
import classNames from 'classnames/bind';
import styles from './SegmentedProgressBar.module.scss';
import ProgressBar from './ProgressBar';

const cx = classNames.bind(styles);

function SegmentedProgressBar({ completed, stopNumbers = [30, 70, 100], colors, states }) {
    var completedNumbers = [];
    var convertCompletedNumber = 0;
    var hasConvertedCompletedNumber = false;

    // create completedNumbers for ProgressBar
    stopNumbers.map((stopNumber, index) => {
        if (completed <= stopNumber) {
            if (!hasConvertedCompletedNumber) {
                if (index > 0) {
                    convertCompletedNumber =
                        ((completed - stopNumbers[index - 1]) / (stopNumber - stopNumbers[index - 1])) * 100;
                } else {
                    convertCompletedNumber = (completed / stopNumber) * 100;
                    if (completed === 0) {
                        convertCompletedNumber += 4;
                    }
                }
                completedNumbers.push(convertCompletedNumber);
                hasConvertedCompletedNumber = true;
            } else {
                completedNumbers.push(0);
            }
        } else {
            completedNumbers.push(100);
        }
    });

    const renderProgressBars = () => {
        return states.map((state, index) => {
            return (
                <div key={index} className={cx('progressbar-item')}>
                    <ProgressBar completed={completedNumbers[index]} color={colors[index]} />
                    <div className={cx('progressbar-state-title')}>{state}</div>
                </div>
            );
        });
    };

    return <div className={cx('wrapper')}>{renderProgressBars()}</div>;
}

export default SegmentedProgressBar;
