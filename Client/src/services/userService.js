import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const handleLoginUserApi = (userEmail, userPassword) => {
  return axios.post("/api/login-user", {
    email: userEmail,
    password: userPassword,
  });
};
const handleRegisterApi = (
  userEmail,
  userPassword,
  userFirstname,
  userLastname,
  userPhone
) => {
  return axios.post("/api/register", {
    email: userEmail,
    password: userPassword,
    firstName: userFirstname,
    lastName: userLastname,
    phonenumber: userPhone,
  });
};

const getUserById = (id) => {
  return axios.get(`/api/get-user?id=${id}`);
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};

const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};
const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};
const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};
const createNewHandbook = (data) => {
  return axios.post("/api/create-new-handbook", data);
};
const getAllSpecialty = () => {
  return axios.get(`/api/get-specialty`);
};
const getAllHandbook = () => {
  return axios.get(`/api/get-handbook`);
};
const getHistoryPatient = (patientId, date) => {
  return axios.get(
    `/api/get-history-patient?patientId=${patientId}&date=${date}`
  );
};
const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
const getAllDetailHandbookById = (data) => {
  return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`);
};
const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const postSendRemedy = (data) => {
  return axios.post(`/api/send-remedy`, data);
};
const postMessages = (chatId, senderId, text) => {
  return axios.post(`/api/add-message`, chatId, senderId, text);
};
const getChatsById = (userId) => {
  return axios.get(`/api/get-chats-by-id?userId=${userId}`);
};
const getMessagesByChatId = (chatId) => {
  return axios.get(`/api/get-message?chatId=${chatId}`);
};
const checkout = (data) => {
  return axios.post("/api/checkout", data);
};

const refund = (data) => {
  return axios.post("/api/refund", data);
}
export {
  checkout,
  refund,
  handleLoginApi,
  handleLoginUserApi,
  handleRegisterApi,
  getUserById,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getAllDetailSpecialtyById,
  getAllPatientForDoctor,
  postSendRemedy,
  createNewHandbook,
  getAllHandbook,
  getAllDetailHandbookById,
  getChatsById,
  getMessagesByChatId,
  postMessages,
  getHistoryPatient,
};
