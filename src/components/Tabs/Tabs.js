import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import styles from './Tabs.module.scss'

export function Tabs({children, color, backgroundColor}) {
    const panelRefs = useRef([]);
    let realIndex = 0;

    const colors = {
        backgroundColor,
        color,
    }

    return (
        <div className={styles['tabs']} style={colors}>
            {React.Children.map(children, (child, index) => {
                if (child.type === TabPanel) {
                    panelRefs.current.push(React.createRef());
                    return React.cloneElement(child, { ref: panelRefs.current[realIndex++] })
                };
                return React.cloneElement(child, { panelRefs: panelRefs });
            }
        )}
        </div>
    )
}

export const TabPanel = React.forwardRef((props, ref) => {
    const [active, setActive] = useState(false)

    useImperativeHandle(ref, () => ({
        toggleActive: (isActive) => {
            setActive(isActive);
        }
    }));

    return (
        <React.Fragment>
            {active ?
                <div className={styles['tabs__panel']}>
                    {props.children}
                </div>: 
            null}
        </React.Fragment>
    )
})

export function TabList({children, panelRefs}) {
    const [tabValues, setTabValues] = useState(Array.from(children, (_, k) => {
        if(k === 0) return true;
        return false;
    }));

    const toggleState = (selectedIndex) => {
        setTabValues(tabValues.map((_, index) => {
            return index !== selectedIndex ? tabValues[index] = false : tabValues[index] = true
        }));
    }
    
    useEffect(() => {
        panelRefs.current.forEach((panelRef, index) => {
            panelRef.current.toggleActive(tabValues[index]);
        })
    }, [tabValues])

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
        <li className={`${styles['tabs__item']} ${props.isActive || props.default ? styles['tabs__item-active'] : ""}`}>
            <a
            onClick={activate} 
            className={styles['tabs__link']}
            href="#">{props.children}</a>
        </li>
    )
}