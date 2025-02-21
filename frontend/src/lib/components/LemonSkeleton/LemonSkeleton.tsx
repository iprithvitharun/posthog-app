import clsx from 'clsx'
import { range } from 'lib/utils'
import { LemonButtonProps } from '../LemonButton'
import './LemonSkeleton.scss'

export interface LemonSkeletonProps {
    className?: string
    /** Repeat this component this many of times */
    repeat?: number
    /** Used in combination with repeat to progressively fade out the repeated skeletons */
    fade?: boolean
    active?: boolean
}
export function LemonSkeleton({ className, repeat, active = true, fade = false }: LemonSkeletonProps): JSX.Element {
    const content = (
        <div className={clsx('LemonSkeleton rounded h-4', !active && 'LemonSkeleton--static', className || 'w-full')} />
    )

    if (repeat) {
        return (
            <>
                {range(repeat).map((i) => (
                    // eslint-disable-next-line react/forbid-dom-props
                    <div key={i} style={fade ? { opacity: 1 - i / repeat } : undefined}>
                        {content}
                    </div>
                ))}
            </>
        )
    }
    return content
}

LemonSkeleton.Text = function LemonSkeletonText({ className, ...props }: LemonSkeletonProps) {
    return <LemonSkeleton className={clsx('rounded h-6 w-full', className)} {...props} />
}

LemonSkeleton.Row = function LemonSkeletonRow({ className, ...props }: LemonSkeletonProps) {
    return <LemonSkeleton className={clsx('rounded h-10 w-full', className)} {...props} />
}

LemonSkeleton.Circle = function LemonSkeletonCircle({ className, ...props }: LemonSkeletonProps) {
    return <LemonSkeleton className={clsx('rounded-full shrink-0', className || 'h-10 w-10')} {...props} />
}

LemonSkeleton.Button = function LemonSkeletonButton({
    className,
    size,
    ...props
}: LemonSkeletonProps & { size?: LemonButtonProps['size'] }) {
    return (
        <LemonSkeleton
            className={clsx(
                'rounded px-3',
                size === 'small' && 'h-10',
                (!size || size === 'medium') && 'h-10',
                className || 'w-20'
            )}
            {...props}
        />
    )
}
