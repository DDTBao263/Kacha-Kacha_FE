import { useState, ChangeEvent, FormEvent } from 'react';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import TableStore from "../../components/Tables/TableStore";
import { Restaurant } from "../../types/restaurant";
import FormStore from "../../components/Forms/FormStore/FormStore"

type FormData = {
    restaurantID: string;
    name: string;
    location: string;
    status: string;
};

const Store = () => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [popupMode, setPopupMode] = useState<'add' | 'update'>('add');
    const [formData, setFormData] = useState<FormData>({
        restaurantID: "",
        name: "",
        location: "",
        status: "",
    });

    const openPopup = (mode: 'add' | 'update', data?: Restaurant) => {
        setPopupMode(mode);
        if (mode === 'update' && data) {
            setFormData({
                restaurantID: data.restaurantID || "",
                name: data.name || "",
                location: data.location || "",
                status: data.status || "",
            });
        } else {
            setFormData({
                restaurantID: "",
                name: "",
                location: "",
                status: "",
            });
        }
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(popupMode === 'add' ? 'Add Restaurant:' : 'Update Restaurant:', formData);
        closePopup();
    };

    return (
        <>
            <Breadcrumb pageName="Store" />
            <div className="flex justify-start gap-4">
                <button
                    onClick={() => openPopup('add')}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    <i className="fa-solid fa-plus"></i>
                    Add Restaurant
                </button>

            </div>
            <div className="mt-3">
                <TableStore onEdit={(data) => openPopup('update', data)} />
            </div>

            {isPopupOpen && (
                <FormStore
                    popupMode={popupMode}
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    closePopup={closePopup}
                />
            )}
        </>
    );
};

export default Store;
