/* eslint-disable react/no-unescaped-entities */
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { CustomButton } from '../components';

// Import animation configurations
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../config/motion';

const Home = () => {
  // Use the useSnapshot hook to get the current state from Valtio
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
        {/* Render the following content if snap.intro is truthy */}
        {snap.intro && (
            // Apply a motion animation to this section element using slideAnimation('left')
            <motion.section className='home' {...slideAnimation('left')}>
                {/* Apply a motion animation to this header element using slideAnimation('down') */}
                <motion.header {...slideAnimation('down')}>
                    {/* Display an image */}
                    <img
                        src='./threejs.png'
                        alt="logo"
                        className="w-8 h-8 object-contain"
                    />    
                </motion.header>

                {/* Apply a motion animation to this div element using headContainerAnimation */}
                <motion.div className='home-content' {...headContainerAnimation}>
                    {/* Apply a motion animation to this div element using headTextAnimation */}
                    <motion.div {...headTextAnimation}>
                        <h1 className="head-text">
                            FORGE <br className='xl:block hidden' /> YOUR <br className='xl:block hidden' /> OWN.
                        </h1>
                    </motion.div>
                    {/* Apply a motion animation to this div element using headContentAnimation */}
                    <motion.div 
                        {...headContentAnimation}
                        className='flex flex-col gap-5'
                    >
                        <p className='max-w-md font-normal text-gray-600 text-base'>
                            Create your own unique shirt with our 3D customization tool. <strong>Unleash your imagination</strong> and define your own style.
                        </p>

                        <CustomButton 
                            type='filled'
                            title='Customize It'
                            handleClick={() => state.intro = false} // Handle click event to update state.intro
                            customStyles='w-fit px-4 py-2.5 font-bold text-sm'
                        />
                    </motion.div>
                </motion.div>
            </motion.section>
        )}
    </AnimatePresence>
  )
}

// Export the Home component as the default export
export default Home;