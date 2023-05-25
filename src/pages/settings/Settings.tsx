import {IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow, useIonToast} from "@ionic/react";
import React, { useEffect, useState } from "react";
import {HeaderMobile} from "../../components/header/HeaderMobile";
import {add, checkmarkOutline} from "ionicons/icons";
import axios from "axios";
import {API_URL} from "../../App";
import {useAuthStore} from "../../store/authStore";
import {useHistory} from "react-router-dom";
import RegistrationDesktop from "../registration/RegistrationDesktop";
import RegistrationMobile from "../registration/RegistrationMobile";
import {isEmailValid} from "../../helper/formHelper";
import BottomNavigationBar from "../../components/menu/BottomNavigationBar";

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

    const [present] = useIonToast();

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
            }).then(() => {
                getMyUserInfo();

                present({
                    message: "Success updating Profile.",
                    duration: 3000,
                    position: "top",
                    icon: checkmarkOutline,
                    color: "success",
                });
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

    const getMyUserInfo = () => {
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
    }

    useEffect(getMyUserInfo, []);

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
            const dateParts = userInfo.birthDate?.split('T');
            birthDateElement.value = dateParts[0];
        }

        const emailElement = document.querySelector('input[name="email"]');
        if (emailElement instanceof HTMLInputElement) {
            emailElement.value = userInfo.email;
        }

        const passwordElement = document.querySelector('input[name="password"]');
        if (passwordElement instanceof HTMLInputElement) {
            passwordElement.value = userInfo.password;
        }

        const roleSegment = document.querySelector('ion-segment');
        if (roleSegment) {
            const AdminCheck = roleSegment.querySelector('ion-segment-button[value="admin"]')
            const LabelerCheck = roleSegment.querySelector('ion-segment-button[value="labeler"]')

            if (userInfo.isAdmin && AdminCheck) {
                AdminCheck.classList.add("segment-button-checked");
            } else if (!userInfo.isAdmin && LabelerCheck) {
                LabelerCheck.classList.add("segment-button-checked");
            }
        }
    }, [userInfo]);


    const isDesktop = window.innerWidth >= 768;

    return (
        <IonPage>
            <HeaderMobile />
            <IonContent>
                <>
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
                </>
            </IonContent>
            <BottomNavigationBar />
        </IonPage>
    );
};

export default Settings;
