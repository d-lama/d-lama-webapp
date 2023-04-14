import React, {useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {Input, InputType} from "../components/forms/Input";
import {Button, ButtonType} from "../components/forms/Button";


function Registration() {
    const [labelText, setLabelText] = useState('');
    const handleSubmit = function (event: { preventDefault: () => void; }) {
        // Handle user authentication logic here
        event.preventDefault()
        setLabelText('Invalid username or password!');
        setTimeout(() => {
            setLabelText('');
        }, 3000);
    }

    return (
        <>
            <IonPage>
                <IonHeader class="ion-no-border" mode={"md"}>
                    <IonToolbar>
                        <IonTitle style={{fontSize: '3rem', fontWeight: 'bold', marginTop: '60px'}}
                                  className="ion-text-center">D-LAMA</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent class={"ion-padding"}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh'
                    }}>
                        <form style={{width: '80%', maxWidth: '400px'}} onSubmit={handleSubmit}>
                            <Input inputName={"Enter First Name"} placeholder={"Max"} helperText={"Enter a valid name"}
                                   errorText={"Invalid email"} inputType={InputType.text}/>
                            <Input inputName={"Enter Last Name"} placeholder={"Muster"}
                                   helperText={"Enter a valid name"} errorText={"Invalid email"}
                                   inputType={InputType.text}/>
                            <Input inputName={"Enter Email"} placeholder={"max.muster@gmail.com"}
                                   helperText={"Enter a valid email"} errorText={"Invalid password"}
                                   inputType={InputType.email}/>
                            <Input inputName={"Enter Password"} placeholder={"**************"}
                                   helperText={"Enter a valid password"} errorText={"Invalid password"}
                                   inputType={InputType.password}/>
                            <Input inputName={"Confirm Password"} placeholder={"**************"}
                                   helperText={"Confirm the password"} errorText={"Invalid password"}
                                   inputType={InputType.password}/>
                            <IonItem id="{{error}}" style={{marginBottom: '15px'}}>
                                {labelText &&
                                    <IonLabel className="ion-text-center" color="danger">{labelText}</IonLabel>}
                            </IonItem>
                            <Button buttonText={"Register"} buttonType={ButtonType.submit} color={"primary"}></Button>
                        </form>
                    </div>
                </IonContent>
            </IonPage>
        </>

    );
}

export default Registration;