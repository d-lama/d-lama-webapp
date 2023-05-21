import React, { useEffect, useRef, useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { Gesture, GestureConfig, createGesture } from '@ionic/core';

import './CardLabelComponent.css';

interface Props {
    cardTitle: string;
    cardSubtitle: string;
    content: string;
    onSwipe: (direction: string) => void;
    darkMode: boolean;
}

const CardLabelComponent: React.FC<Props> = ({
     cardTitle,
     cardSubtitle,
     content,
     onSwipe,
     darkMode
 }) => {
    const cardRef = useRef<HTMLIonCardElement>(null);
    const [resetAnimation, setResetAnimation] = useState(false);

    useEffect(() => {
        const gestureY = initGesture("y");
        const gestureX = initGesture("x");
        gestureX.enable();
        gestureY.enable();
        return () => {
            gestureX.destroy();
            gestureY.destroy();
        };
    });

    function initGesture(direction: string): Gesture {
        const el = cardRef.current as HTMLElement;
        const style = el.style;
        const windowHeight = window.innerHeight;
        const xOptions: GestureConfig = {
            el,
            gestureName: 'card-swipe',
            direction: 'x',
            onStart: () => {
                style.transition = 'none';
            },
            onMove: (ev) => {
                style.transform = `translate(${ev.deltaX}px, ${ev.deltaY}px) rotate(${ev.deltaX / 20}deg)`;

                const angle = Math.atan2(ev.deltaY, ev.deltaX);
                let direction = '';

                if (angle >= -Math.PI / 4 && angle < Math.PI / 4) {
                    direction = 'right';
                } else if (angle >= Math.PI / 4 && angle < (3 * Math.PI) / 4) {
                    direction = 'down';
                } else if (angle >= (3 * Math.PI) / 4 || angle < -(3 * Math.PI) / 4) {
                    direction = 'left';
                } else {
                    direction = 'up';
                }

                // Get all elements with class ".card-animation-${direction}"
                const elements = document.querySelectorAll(`.card-animation-${direction}`);

                // Add "active" class to the elements with current direction
                elements.forEach((element) => {
                    element.classList.add('active');
                });

                // Remove "active" class from elements with other directions
                const otherDirections = ['up', 'down', 'left', 'right'].filter((dir) => dir !== direction);
                otherDirections.forEach((dir) => {
                    const otherElements = document.querySelectorAll(`.card-animation-${dir}`);
                    otherElements.forEach((element) => {
                        element.classList.remove('active');
                    });
                });

            },
            onEnd: (ev) => {
                style.transition = '0.3s ease-out';
                if (ev.deltaX > window.innerWidth / 2) {
                    style.transform = `translateX(${window.innerWidth * 1.5}px)`;
                    onSwipe('right');
                } else if (ev.deltaX < -window.innerWidth / 2) {
                    style.transform = `translateX(-${window.innerWidth * 1.5}px)`;
                    onSwipe('left');
                } else {
                    style.transform = '';
                }

                setTimeout(() => {
                    style.transform = 'none';
                    setResetAnimation(false);
                }, 10);
                setResetAnimation(true);

                ['up', 'down', 'left', 'right'].forEach((dir) => {
                    const elements = document.querySelectorAll(`.card-animation-${dir}`);
                    elements.forEach((element) => {
                        element.classList.remove('active');
                    });
                });
            },
        };
        const yOptions: GestureConfig = {
            el,
            gestureName: 'card-swipe',
            direction: 'y',
            onStart: () => {
                style.transition = 'none';
            },
            onMove: (ev) => {
                style.transform = `translate(${ev.deltaX}px, ${ev.deltaY}px) rotate(${ev.deltaX / 20}deg)`;

                const angle = Math.atan2(ev.deltaY, ev.deltaX);
                let direction = '';

                if (angle >= -Math.PI / 4 && angle < Math.PI / 4) {
                    direction = 'right';
                } else if (angle >= Math.PI / 4 && angle < (3 * Math.PI) / 4) {
                    direction = 'down';
                } else if (angle >= (3 * Math.PI) / 4 || angle < -(3 * Math.PI) / 4) {
                    direction = 'left';
                } else {
                    direction = 'up';
                }

                // Get all elements with class ".card-animation-${direction}"
                const elements = document.querySelectorAll(`.card-animation-${direction}`);

                // Add "active" class to the elements with current direction
                elements.forEach((element) => {
                    element.classList.add('active');
                });

                // Remove "active" class from elements with other directions
                const otherDirections = ['up', 'down', 'left', 'right'].filter((dir) => dir !== direction);
                otherDirections.forEach((dir) => {
                    const otherElements = document.querySelectorAll(`.card-animation-${dir}`);
                    otherElements.forEach((element) => {
                        element.classList.remove('active');
                    });
                });
            },
            onEnd: (ev) => {
                style.transition = '0.3s ease-out';
                if (ev.deltaY < -windowHeight / 6) {
                    style.transform = `translateY(-${windowHeight * 1.5}px)`;
                    onSwipe('up');
                } else if (ev.deltaY > windowHeight / 6) {
                    style.transform = `translateY(${windowHeight * 1.5}px)`;
                    onSwipe('down');
                } else {
                    style.transform = '';
                }

                setTimeout(() => {
                    style.transform = 'none';
                    setResetAnimation(false);
                }, 10);
                setResetAnimation(true);

                ['up', 'down', 'left', 'right'].forEach((dir) => {
                    const elements = document.querySelectorAll(`.card-animation-${dir}`);
                    elements.forEach((element) => {
                        element.classList.remove('active');
                    });
                });
            },
        };

        const options = direction === 'x' ? xOptions : yOptions;

        return createGesture(options);
    }

    return (
        <IonCard
            ref={cardRef}
            className={`labelingCard ${darkMode ? 'dark' : ''} ${resetAnimation ? 'reset-animation' : ''}`}
        >
            <IonCardHeader>
                <IonCardTitle>{cardTitle}</IonCardTitle>
                <IonCardSubtitle>{cardSubtitle}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{content}</IonCardContent>
        </IonCard>
    );
};

export default CardLabelComponent;
