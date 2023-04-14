import { useEffect, useState } from 'react';
import { moon, sunny } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import './DarkModeToggle.css'

export const DarkModeToggle: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true)
            document.body.classList.toggle('dark');
        }
    }, [])

    const handleToggle = () => {
        setDarkMode(prev => !prev)
        document.body.classList.toggle('dark');
    }

    return (
        <>
            <IonIcon
                icon={darkMode ? moon : sunny}
                onClick={handleToggle}
                className='dark-mode-toggle-icon ion-float-right'
                aria-label="Switch between dark and light mode"
            />
        </>
    );
};
