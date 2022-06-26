

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
export default function Image({source, ...rest}) {

  console.log(rest);
  return (
    <img src={source} alt="" sizes="" />
  )
}