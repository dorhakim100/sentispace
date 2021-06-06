import React from 'react';
import { observer } from 'mobx-react';

import NavigationViewModel, { DisplayModes } from '../../ViewModels/NavigationViewModel';

type NavFooterProps = {
    vm: NavigationViewModel
}

export default observer(
    ({vm}: NavFooterProps) => {

        function onCenterButtonClicked() {
            if (vm.displayMode === DisplayModes.selecting) {
                vm.displayMode = DisplayModes.none;
            } else {
                vm.displayMode = DisplayModes.creating;
            }
        }

        return (
            <footer className="nav-footer">
                <nav>
                    <button className="fab button-secondary"
                            disabled={!vm.hasPrev || vm.displayMode === DisplayModes.selecting}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="fab button-primary" 
                            onClick={onCenterButtonClicked}>
                        <i className={`fas fa-plus${vm.displayMode === DisplayModes.selecting? ' rotated' : ''}`}></i>
                    </button>
                    <button className="fab button-secondary"
                            disabled={!vm.hasNext || vm.displayMode === DisplayModes.selecting}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </nav>
                <div className="bottom-filler"></div>
            </footer>
        );
    }
);