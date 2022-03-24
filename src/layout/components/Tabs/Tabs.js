import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import styles from './Tabs.module.scss'

const FilterChildren = (children, Type, propsObject = {}) => {
    return React.Children.map(children, (child, index) => {
        if (child.type === Type) return React.cloneElement(child, {index, ...propsObject});
    })
}

export function Tabs({children, customStyles}) {
    const tabRef = useRef(); 

    return (
        <div className={styles['tabs']}>
            {FilterChildren(children, TabList, { panelRef: tabRef})}
            <PanelControl ref={tabRef} children={FilterChildren(children, TabPanel)} />
        </div>
    )
}

const PanelControl = React.forwardRef((props, ref) => {
    const [index, setIndex] = useState(0)

    useImperativeHandle(ref, () => ({
        togglePanel: (selectedIndex) => setIndex(selectedIndex)
        })
    );

    return (
        props.children[index]
    )
})

export const TabPanel = (props) => {
    return (
        <div className={styles['tabs__panel']}>
            {props.children}
        </div>
    )
}

export function TabList({children, panelRef}) {
    const [tabValues, setTabValues] = useState(Array.from(children, () => {
        return false
    }));

    const toggleState = (selectedIndex) => {
        panelRef.current.togglePanel(selectedIndex);
        setTabValues(tabValues.map((_, index) => {
            return index !== selectedIndex ? tabValues[index] = false : tabValues[index] = true
        }));
    }

    return (
        <ul className={styles['tabs__list']}>
            {FilterChildren(children, Tab, { toggleState, tabValues })}
        </ul>
    )
}

export const Tab = (props) => {
    const activate = () => {
        props.toggleState(props.index);
    }

    return (
        <li className={`${styles['tabs__item']} ${props.tabValues[props.index] ? "active" : ""}`}>
            <a
            onClick={activate} 
            className={styles['tabs__link']}
            href="#">{props.children}</a>
        </li>
    )
}