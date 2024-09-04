/* eslint-disable prefer-const */
import { AnimatePresence, motion } from 'framer-motion'
// import vintage from '../assets/VINTAGE.png'
import { ChangeEventHandler, useEffect, useState } from 'react';
import { getProfile, updateProfile, uploadImage } from '@/service/userService';
import { AlertProps, EditProfileType, ProfileType, ScheduleType } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { topUp } from '@/service/transactionService';
import { FilePenLine, LogOut } from 'lucide-react';
import defaultImage from '../assets/VINTAGE.png';
import AlertPopup from '@/components/AlertPopup';



const Profile = () => {
    document.title = 'Profile'
    const [user, setUser] = useState<ProfileType>({} as ProfileType);

    const fetchUser = async () => {
        const data = await getProfile();
        setUser(data);
        setEditData(data)
    };
    useEffect(() => {
        fetchUser();
    }, [])

    const auth = useAuth();
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [saldo, setSaldo] = useState<string>('');

    const [editData, setEditData] = useState<EditProfileType>({} as EditProfileType);
    const [isModified, setIsModified] = useState(false);
    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const handleToggleEditForm = () => {
        setShowEditForm(!showEditForm);
        setIsModified(false)
        fetchUser()
    };

    const handleSaldoChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        setSaldo(formatRupiah(value));
    };
    const formatRupiah = (value: string): string => {
        let saldo_string = value.replace(/[^,\d]/g, '');
        let split = saldo_string.split(',');
        let sisa = split[0].length % 3;
        let rupiah = split[0].substr(0, sisa);
        let ribuan = split[0].substr(sisa).match(/\d{3}/g);
        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
        return 'Rp. ' + (rupiah || '');
    };

    const rupiahToNumber = (rupiah: string): number => {
        const numberString = rupiah.replace(/[^,\d]/g, '').replace(',', '.');
        return parseInt(numberString);
    };

    const hanldeTopup: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        topUp(rupiahToNumber(saldo))
    };


    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditData(prevData => ({ ...prevData, [name]: value }));
        setIsModified(
            value !== user[name as keyof EditProfileType] ||
            editData.email !== user.email ||
            editData.fullName !== user.fullName ||
            (editData.dateOfBirth ? new Date(editData.dateOfBirth).toISOString().split("T")[0] : '') !== (user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : '') ||
            editData.address !== user.address ||
            editData.phoneNumber !== user.phoneNumber ||
            editData.gender !== user.gender
        );
    };

    const handleEditChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData(prevData => ({ ...prevData, [name]: new Date(value) }));
        setIsModified(
            value !== user[name as keyof EditProfileType] ||
            editData.email !== user.email ||
            editData.fullName !== user.fullName ||
            (editData.dateOfBirth ? new Date(editData.dateOfBirth).toISOString().split("T")[0] : '') !== (user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : '') ||
            editData.address !== user.address ||
            editData.phoneNumber !== user.phoneNumber ||
            editData.gender !== user.gender
        );
    }

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await updateProfile(editData);
        console.log(res);
        if (res.success) {
            setAlertPopup({
                message: res.message,
                type: res.success,
                onClose: closeAlert
            })
            if (!(editData.email === user.email)) {
                setAlertPopup(prevAlert => ({ ...prevAlert, ["message"]: res.message + "Please Login Again" }));
                auth.logout()
            } else {
                fetchUser();
            }
        } else {
            setAlertPopup({
                message: res.message,
                type: res.success,
                onClose: closeAlert
            })
        }
        setShowEditForm(false);
        setIsAlertVisible(true);
    };

    const hanldeLogout = () => {
        auth.logout();
        navigate('/');
    };
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 0,
        }).format(value);
    };
    const [alertPopup, setAlertPopup] = useState<AlertProps>({} as AlertProps);
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const closeAlert = () => {
        setIsAlertVisible(false);
        setAlertPopup(prevAlert => ({ ...prevAlert, [alertPopup.message]: '' }));
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const res = await uploadImage(e.target.files[0]);
            console.log(res)
            if (res.success) {
                setAlertPopup({
                    message: res.message,
                    type: res.success,
                    onClose: closeAlert
                })
            } else {
                setAlertPopup({
                    message: res.message,
                    type: res.success,
                    onClose: closeAlert
                })
            }
            setIsAlertVisible(true);
        }
    }

    const [phoneNumberError, setPhoneNumberError] = useState<string>('');

    const handlePhoneNumber: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;
        let filteredValue = value
            .replace(/[^+\d]/g, '')
            .replace(/(?!^\+)\+/g, '');

        if (filteredValue.length > 14) {
            filteredValue = filteredValue.slice(0, 14);
        }

        let isValid = false;
        const phoneNumberPattern = /^(?:\+62|08)[1-9]\d{8,12}$/;

        if (filteredValue.startsWith('+62')) {
            isValid = phoneNumberPattern.test(filteredValue);
        } else if (filteredValue.startsWith('08')) {
            isValid = phoneNumberPattern.test(filteredValue);
        } else {
            isValid = false;
        }
        setEditData(prevData => ({ ...prevData, [name]: filteredValue }));

        if (isValid) {
            setIsModified(true);
            setPhoneNumberError('');
        } else {
            setIsModified(false);
            setPhoneNumberError("Nomor telepon tidak valid. Harus dimulai dengan +62 atau 08 dan panjang 10-13 digit.");
        }
    }

    const [schedule, setSchedule] = useState<ScheduleType>({} as ScheduleType)
    const handleChangeSchedule = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSchedule(prevData => ({ ...prevData, [name]: new Date(value) }));
        setIsModified((new Date(schedule.startDate).toISOString().split("T")[0] !== ''));
    }
    return (
        <main className="flex justify-center items-center min-h-screen text-white p-4">
            <motion.div
                className="bg-monokromatik-7 rounded-lg overflow-hidden w-full max-w-4xl mx-auto text-black shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col md:flex-row">
                    <motion.div
                        className="md:w-1/3 bg-gradient-to-bl from-monokromatik-5 to-monokromatik-6 text-center flex flex-col items-center justify-center p-6"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className='relative w-max flex items-center justify-center group'>
                            <motion.img
                                src={user.image ? `data:image/jpeg;base64,${user.image}` : defaultImage}
                                alt="Avatar"
                                className="w-24 h-24 rounded-full mx-auto transition duration-300 ease-in-out group-hover:brightness-50"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <label className="flex items-center cursor-pointer space-x-2">
                                    <FilePenLine className='text-green-500 text-2xl' />
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="sr-only"
                                    />
                                </label>
                            </div>
                        </div>
                        <motion.h2
                            className="text-xl font-semibold mb-2 text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            {user.fullName}
                        </motion.h2>
                        <motion.p
                            className="text-white mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            {user.email}
                        </motion.p>
                        <motion.div
                            onClick={hanldeLogout}
                            className="cursor-pointer inline-flex items-center px-4 py-2 bg-monokromatik-2 hover:bg-monokromatik-3 rounded transition"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            <LogOut className="mr-2" /> Log Out
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="md:w-2/3 p-6 bg-monokromatik-6 text-white"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Information</h3>
                            <hr className="border-t-2 border-monokromatik-2 mb-4" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm">Gender</h4>
                                    <p>{user.gender}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm">Phone</h4>
                                    <p>{user.phoneNumber}</p>
                                </div>
                                {user.dateOfBirth && (
                                    <div>
                                        <h4 className="text-sm">Date of Birth</h4>
                                        <p>{user.dateOfBirth.toString()}</p>
                                    </div>
                                )}
                                {user.address && (
                                    <div>
                                        <h4 className="text-sm">Address</h4>
                                        <p>{user.address}</p>
                                    </div>
                                )}
                            </div>
                            <motion.button
                                className="mt-4 px-4 py-2 bg-monokromatik-2 hover:bg-monokromatik-3 rounded text-white text-sm transition"
                                onClick={handleToggleEditForm}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Edit Information
                            </motion.button>
                        </div>
                        <div className='mb-6'>
                            <h3 className="text-lg font-semibold mb-2">Income & Expense</h3>
                            <hr className="border-t-2 border-monokromatik-2 mb-4" />
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex-1">
                                    <label htmlFor="startDate" className="block mb-1 text-sm font-medium">Start Date</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name='startDate'
                                        value={schedule.startDate == null
                                            ? ""
                                            : new Date(schedule.startDate).toISOString().split("T")[0]}
                                        // {...register('startDate')}
                                        onChange={handleChangeSchedule}
                                        className="border p-2 rounded w-full text-black"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="endDate" className="block mb-1 text-sm font-medium">End Date</label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name='endDate'
                                        value={schedule.endDate ? schedule.endDate.toISOString().split('T')[0] : ''}
                                        onChange={handleChangeSchedule}
                                        className="border p-2 rounded w-full text-black"
                                    />
                                </div>
                                <motion.button
                                    className={`px-4 py-2 rounded text-white text-sm transition ${isModified ? 'bg-monokromatik-2 hover:bg-monokromatik-3' : 'bg-gray-400 cursor-not-allowed'}`}
                                    // onClick={handleToggleEditForm}
                                    whileHover={{ scale: isModified ? 1.05 : 1 }}
                                    whileTap={{ scale: isModified ? 0.95 : 1 }}
                                    disabled={!isModified}
                                >
                                    Get Income & Expenses
                                </motion.button>
                                <div>
                                    <h2 className="text-lg font-semibold">Summary</h2>
                                    <div className="">
                                        {/* Uncomment and update with real data */}
                                        {/* {data ? ( */}
                                        <div className="">
                                            <p><strong>Income:</strong> {formatCurrency(0)}</p>
                                            <p><strong>Expense:</strong> {formatCurrency(0)}</p>
                                        </div>
                                        {/* ) : (
                                            <p>No data available. Please select a date range.</p>
                                        )} */}
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Account Balance</h3>
                            <hr className="border-t-2 border-monokromatik-2 mb-4" />
                            <div className="flex flex-col sm:flex-row items-center sm:justify-between">
                                <div>
                                    <h4 className="text-sm">Saldo</h4>
                                    <p>Rp. {formatCurrency(user.saldo)}</p>
                                </div>
                                <motion.button
                                    className="mt-4 sm:mt-0 px-4 py-2 bg-monokromatik-2 hover:bg-monokromatik-3 rounded text-white text-sm transition"
                                    onClick={handleToggleForm}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Purchase Saldo
                                </motion.button>
                            </div>

                            <AnimatePresence>
                                {showForm && (
                                    <motion.form
                                        onSubmit={hanldeTopup}
                                        className="mt-4"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.input
                                            type="text"
                                            name="saldo"
                                            id="saldo"
                                            value={saldo}
                                            onChange={handleSaldoChange}
                                            className="w-full px-3 py-2 bg-monokromatik-5 text-black rounded mb-2 focus:outline-none focus:ring-2 focus:ring-monokromatik-1"
                                            placeholder="Rp. "
                                        />
                                        <motion.button
                                            type="submit"
                                            className="px-4 py-2 bg-monokromatik-2 hover:bg-monokromatik-3 rounded text-white text-sm transition"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Top Up
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>

                <AnimatePresence>
                    {showEditForm && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 flex text-black items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                className="shadow-2xl bg-white p-6 rounded-lg w-full max-w-md"
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                                <form onSubmit={handleEditSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-sm mb-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            id="email"
                                            name="email"
                                            value={editData.email}
                                            onChange={handleEditChange}
                                            className="w-full px-3 py-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-monokromatik-1"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="fullName" className="block text-sm mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            required
                                            name="fullName"
                                            value={editData.fullName}
                                            onChange={handleEditChange}
                                            className="w-full px-3 py-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-monokromatik-1"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="dateOfBirth" className="block text-sm mb-1">Date of Birth</label>
                                        <input
                                            type="date"
                                            id="dateOfBirth"
                                            required
                                            name="dateOfBirth"
                                            onChange={handleEditChangeDate}
                                            value={editData.dateOfBirth == null
                                                ? ""
                                                : new Date(editData.dateOfBirth).toISOString().split("T")[0]}
                                            className="w-full px-3 py-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-monokromatik-1"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="address" className="block text-sm mb-1">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            required
                                            name="address"
                                            value={editData.address ? editData.address : ''}
                                            onChange={handleEditChange}
                                            className="w-full px-3 py-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-monokromatik-1"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="phoneNumber" className="block text-sm mb-1">Phone Number</label>
                                        <input
                                            id="phoneNumber"
                                            type="text"
                                            required
                                            name="phoneNumber"
                                            value={editData.phoneNumber}
                                            onChange={handlePhoneNumber}
                                            className="w-full px-3 py-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-monokromatik-1"
                                        />
                                        {phoneNumberError && <p className="text-red-500 text-sm">{phoneNumberError}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="gender" className="block text-sm mb-1">Gender</label>
                                        <select
                                            id="gender"
                                            required
                                            name="gender"
                                            value={editData.gender}
                                            onChange={handleEditChange}
                                            className="w-full px-3 py-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-monokromatik-1"
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <motion.button
                                        type="submit"
                                        className={`px-4 py-2 rounded text-white text-sm transition ${isModified ? 'bg-monokromatik-2 hover:bg-monokromatik-3' : 'bg-gray-400 cursor-not-allowed'}`}
                                        whileHover={{ scale: isModified ? 1.05 : 1 }}
                                        whileTap={{ scale: isModified ? 0.95 : 1 }}
                                        disabled={!isModified}
                                    >
                                        Save Changes
                                    </motion.button>
                                    <button
                                        type="button"
                                        className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white text-sm"
                                        onClick={handleToggleEditForm}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            {isAlertVisible && (
                <AlertPopup message={alertPopup.message} type={alertPopup.type} onClose={closeAlert} />
            )}
        </main>
    );
}

export default Profile;