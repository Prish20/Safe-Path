import AnimatedLogo from '@/assets/AnimatedLogo';
import { Suspense } from 'react';

const Loadable = (Component) => (
    function (props: {[key: string]: unknown}) {

        return (
            <Suspense fallback={<AnimatedLogo width={250} height={250} />}>
                <Component {...props} />
            </Suspense>
        )
    }
)

export default Loadable;
