import {IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow} from "@ionic/react";
import React, { useEffect, useState } from "react";
import {HeaderMobile} from "../../components/header/HeaderMobile";
import {add} from "ionicons/icons";
import axios from "axios";
import {API_URL} from "../../App";
import {useAuthStore} from "../../store/authStore";
import {useHistory} from "react-router-dom";
import RegistrationDesktop from "../registration/RegistrationDesktop";
import RegistrationMobile from "../registration/RegistrationMobile";
import {isEmailValid} from "../../helper/formHelper";

interface User {
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    isAdmin: boolean;
    password: string;
}

const Settings: React.FC = () => {
    const [userInfo, setUserInfo] = useState<User>({
        email: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        isAdmin: false,
        password: "",
    });
    const [labelText, setLabelText] = useState("");

    const { token } = useAuthStore();
    const history = useHistory();
    const isSettings = true;

    function handleChange(e: { target: { name: any; value: any } }) {
        setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleIsAdminChange(e: any) {
        if (e.detail.value === undefined) return;
        let isAdminValue = e.detail.value === "admin";
        setUserInfo((prev) => ({ ...prev, isAdmin: isAdminValue }));
    }

    const handleSubmit = function (e: React.SyntheticEvent) {
        e.preventDefault();
        axios
            .patch(API_URL + "/User/Me", {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                password: userInfo.password,
                birthDate: userInfo.birthDate,
                isAdmin: userInfo.isAdmin,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            .catch((error) => {
                if (axios.isAxiosError(error)) {
                    setLabelText(error.message);
                } else {
                    setLabelText("Connection failed!");
                    setTimeout(() => {
                        setLabelText("");
                    }, 3000);
                }
            });
    };

    useEffect(() => {
        async function getUserInfo() {
            try {
                const response = await axios.get(`${API_URL}/User/Me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserInfo(response.data);

            } catch (error) {
                // return to project view
                history.push("/home");
            }
        }

        getUserInfo();
    }, []);

    useEffect(() => {
        const lastNameElement = document.querySelector('input[name="lastName"]');
        if (lastNameElement instanceof HTMLInputElement) {
            lastNameElement.value = userInfo.lastName;
        }

        const firstNameElement = document.querySelector('input[name="firstName"]');
        if (firstNameElement instanceof HTMLInputElement) {
            firstNameElement.value = userInfo.firstName;
        }

        const birthDateElement = document.querySelector('input[name="birthDate"]');
        if (birthDateElement instanceof HTMLInputElement) {
            console.log( userInfo.birthDate)
            const dateParts = userInfo.birthDate?.split('-');
            const formattedDate = dateParts ? `${dateParts[2].split('T')[0]}.${dateParts[1]}.${dateParts[0]}` : '';
            console.log(formattedDate);
            birthDateElement.value = formattedDate;
        }
    }, [userInfo]);


    const isDesktop = window.innerWidth >= 768;

    return (
        <IonPage>
            <HeaderMobile />
            <IonContent>
                <>
                    (
                    <div>
                        {isDesktop ? (
                            <RegistrationDesktop
                                mask={userInfo}
                                handleChange={handleChange}
                                handleLogin={handleSubmit}
                                handleIsAdminChange={handleIsAdminChange}
                                labelText={labelText}
                                isSettings={isSettings}
                            />
                        ) : (
                            <RegistrationMobile
                                mask={userInfo}
                                handleChange={handleChange}
                                handleLogin={handleSubmit}
                                handleIsAdminChange={handleIsAdminChange}
                                labelText={labelText}
                                isSettings={isSettings}
                            />
                        )}
                    </div>
                    );
                </>
            </IonContent>
        </IonPage>
    );
};

export default Settings;
