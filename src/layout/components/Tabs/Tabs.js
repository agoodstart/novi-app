import React, { useState, useEffect, useMemo } from 'react';
import styles from './Tabs.module.scss'

export function Tabs({children, customStyles, ...rest}) {
    return (
        <div className={styles['tabs']}>
            {children}
        </div>
    )
}

export function TabPanel({children}) {
    return (
        <div className={styles['tabs__panel']}>
            {children}
        </div>
    )
}

export function TabList({children}) {
    const [tabValues, setTabValues] = useState(Array.from(children, () => {
        return false
    }));

    const toggleState = (selectedIndex) => {
        setTabValues(tabValues.map((_tabValue, index) => {
            return index !== selectedIndex ? tabValues[index] = false : tabValues[index] = true
        }));
    }

    const MapThroughChildren = () => {
        return React.Children.map(children, (child, index) => {  
            return React.cloneElement(child, { toggleState, index, isActive: tabValues[index] })
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
        <li className={`${styles['tabs__item']} ${props.isActive ? "active" : ""}`}>
            <a
            onClick={activate} 
            className={styles['tabs__link']}
            href="#">{props.children}</a>
        </li>
    )
}