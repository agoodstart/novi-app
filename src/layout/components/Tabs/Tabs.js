import React, { useState, useEffect } from 'react';
import styles from './Tabs.module.scss'

export function Tabs({children, customStyles}) {
    const generateTabsControl = () => {
        let checkLength = [0, 0];
        React.Children.map(children, (child, _index) => {
            if (child.type === TabList) {
                checkLength[0] = child.props.children.length;
            } else {
                checkLength[1] += 1;
            }
        })

        if (checkLength[0] !== checkLength[1]) throw Error('Tabs and panel must be the same length');

        return Array.from({length: checkLength[0]}, (_, index) => {
            if (index === 0) return true;

            return false
        })
    }
    
    const [tabsControl, setTabsControl] = useState(generateTabsControl())
    
    const MapThroughChildren = () => {
        let mutateTabsControl = [...tabsControl]

        return React.Children.map(children, (child, index) => {
            if (child.type === TabList) return React.cloneElement(child, { tabsControl, setTabsControl })

            return React.cloneElement(child, { isActive: mutateTabsControl.shift() ?? false })
        })
    }

    useEffect(() => {
        console.log(tabsControl);
    }, [tabsControl])

    return (
        <div className={styles['tabs']} style={customStyles}>
            <MapThroughChildren />
        </div>
    )
}

export function TabPanel(props) {
    console.log('is tabPanel active:', props.isActive)
    return (
        <div className={props.isActive ? styles['tabs__panel-active'] : styles['tabs__panel']}>
            {props.children}
        </div>
    )
}

export function TabList(props) {
    const toggleState = (selectedIndex) => {
        props.setTabsControl(props.tabsControl.map((_tabValue, index) => {
            return index !== selectedIndex ? props.tabsControl[index] = false : props.tabsControl[index] = true
        }));
    }

    const MapThroughChildren = () => {
        return React.Children.map(props.children, (child, index) => {  
            return React.cloneElement(child, { toggleState, index, isActive: props.tabsControl[index] })
        })
    }

    return (
        <ul className={styles['tabs__list']}>
            <MapThroughChildren />
        </ul>
    )
}

export const Tab = (props) => {
    const activate = () => {
        props.toggleState(props.index);
    }

    return (
        <li className={`${styles['tabs__item']} ${props.isActive || props.default ? styles['tabs__item-active'] : ""}`}>
            <a
            onClick={activate} 
            className={styles['tabs__link']}
            href="#">{props.children}</a>
        </li>
    )
}