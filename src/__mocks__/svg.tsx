import { SVGProps, forwardRef } from 'react'

const SvgrMock = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(function SvgrMock(props, ref) {
  return <svg ref={ref} {...props} />
})

export default SvgrMock
