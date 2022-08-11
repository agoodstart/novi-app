import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import styles from './Tabs.module.scss'

/*
TODO:
move activecolors to tablist
*/

export function Tabs({children, color, backgroundColor}) {
    const tabsRef = useRef();
    const panelRefs = useRef([]);
    let realIndex = 0;

    useEffect(() => {
        if(backgroundColor) {
            tabsRef.current.classList.add(backgroundColor)
        }
    }, [])

    return (
        <div ref={tabsRef} className={styles['tabs']}>
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

export const TabPanel = React.forwardRef(({children, backgroundColor}, ref) => {
    const tabPanelRef = useRef();
    const [active, setActive] = useState(false)

    useImperativeHandle(ref, () => ({
        toggleActive: (isActive) => {
            setActive(isActive);
        }
    }));

    return (
        <React.Fragment>
            {active ?
                <div ref={tabPanelRef} className={styles['tabs__panel']}>
                    {children}
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
    const tabRef = useRef();
    const activate = () => {
        props.toggleState(props.index);
    }

    useEffect(() => {
        if(props.isActive) {
            tabRef.current.classList.add(props.activeBackgroundColor)
        } else {
            tabRef.current.classList.add(props.inactiveBackgroundColor)
        }
    }, [])

    return (
        <li ref={tabRef} className={styles['tabs__item']}>
            <p
            style={{
                cursor: 'pointer'
            }}
            onClick={activate} 
            className={styles['tabs__link']}
            >{props.children}</p>
        </li>
    )
}