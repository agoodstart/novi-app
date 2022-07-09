import { useRef, useEffect } from 'react';

import styles from './Grid.module.scss';

export function Grid({gridRows, gridColumns, rowGap, columnGap, children}) {
  const gridRef = useRef();

  useEffect(() => {
    if(gridRows) {
      gridRef.current.classList.add(styles[`grid__rows--${gridRows}`]);
    }

    if(gridColumns) {
      gridRef.current.classList.add(styles[`grid__columns--${gridColumns}`]);
    }

    if(rowGap) {
      gridRef.current.classList.add(styles[`grid__gap-rows--${rowGap}`]);
    }

    if(columnGap) {
      gridRef.current.classList.add(styles[`grid__gap-columns--${columnGap}`]);
    }
  })

  return (
    <div ref={gridRef} className={styles['grid']}>
      {children}
    </div>
  )
}

export function GridItem({children, columnStart, columnEnd, rowStart, rowEnd}) {
  const gridItemRef = useRef();
  
  useEffect(() => {
    if(columnStart) {
      gridItemRef.current.classList.add(styles[`item__column-start--${columnStart}`]);
    }

    if(columnEnd) {
      gridItemRef.current.classList.add(styles[`item__column-end--${columnEnd}`]);
    }

    if(rowStart) {
      gridItemRef.current.classList.add(styles[`item__row-start--${rowStart}`]);
    }

    if(rowEnd) {
      gridItemRef.current.classList.add(styles[`item__row-end--${rowEnd}`]);
    }
  })

  return (
    <div ref={gridItemRef} className="">
      {children}
    </div>
  )
}