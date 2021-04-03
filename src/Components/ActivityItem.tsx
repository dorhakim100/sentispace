import React, { useEffect, useRef, useState } from 'react';
import Hammer from 'hammerjs';
import { observer } from 'mobx-react';
import moment from 'moment';
import Activity from '../Models/Activity';
import { useActivitiesStore } from '../Stores/ActivitiesStore';
import { observe } from 'mobx';

type ActivityItemProps = {
    activity: Activity
};

export default observer(
    ({activity}: ActivityItemProps) => {

        const [selected, setSelected] = useState(false);

        const sectionRef = useRef<HTMLElement>(null);

        const momentTime = moment(activity.time);

        const store = useActivitiesStore();
        const disposeSelectionObserver = observe(
            store.selectedActivities,
            () => {
                if (!store.selectedActivities.includes(activity)) {
                    setSelected(false);
                }
            }
        );

        useEffect(() => {
            if (sectionRef.current) {
                const hammer = new Hammer(sectionRef.current);
                hammer.add(new Hammer.Press({
                    event: 'press',
                    time: 500,
                }));
                hammer.on('press', () => {
                    setSelected(true);
                    store.selectedActivities.push(activity);
                })
            }
            return disposeSelectionObserver;
        }, [activity, store.selectedActivities, disposeSelectionObserver]);

        function onEditClick() {
            store.selectedActivities = store.selectedActivities.removef(activity);
            store.currentlyEditing = activity;
        }

        function onRemoveClick() {
            store.selectedActivities = store.selectedActivities.removef(activity);
            store.delete(activity);
        }

        const SelectedParts = () => (
            <>
                <button className="edit action-button"
                        onClick={onEditClick}>
                    <i className="fas fa-pen-square"></i>
                </button>
                <button className="delete action-button"
                        onClick={onRemoveClick}>
                    <i className="fas fa-minus-square"></i>
                </button>
                <div className="selected"></div>
            </>
        );

        return (
            <section className="activity" ref={sectionRef}>
                <div className="time-container" 
                     data-tod={Math.floor(momentTime.hour() / 3.1)}>
                    <time>{momentTime.format('HH:mm')}</time>
                </div>
                <span className="title">{activity.title}</span>
                <div className="subtitle">
                    <span className="feeling-label">Feeling:</span>
                    <div className="feeling-mood" data-mood={activity.feeling}>
                        <span>{activity.feeling.toUpperCase()}</span>
                    </div>
                </div>
                {store.selectMode && selected? <SelectedParts/> : null}
            </section>  
        )   
    }
);