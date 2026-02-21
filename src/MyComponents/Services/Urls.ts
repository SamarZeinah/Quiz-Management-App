// import axios from "axios";

export const baseUrl="/api";
export const Photo_baseUrl="https://upskilling-egypt.com:3006";
//public    Dont need Token
// export const publicAxiosInstance=axios.create({
//     baseURL:baseUrl,
// })
//private   need Token after login
// export const privateAxiosInstance=axios.create({
//     baseURL:baseUrl,
//     headers: { Authorization: localStorage.getItem('token') }
// })
export const Auth_URLS={
    LOGIN:`${baseUrl}/auth/login`,
    REGISTER:`${baseUrl}/auth/register`,
    FORGET_PASSWORD:`${baseUrl}/auth/forgot-password`,
    RESET_PASSWORD:`${baseUrl}/auth/reset-password`,
    CHANGE_PASSWORD:`${baseUrl}/auth/change-password`,
}
export const Groups_URLS={
    GET_GROUPS:`${baseUrl}/group`,
    DELETE_GROUPS:(id:string)=>`${baseUrl}/group/${id}`,
    CREATE_GROUP:`${baseUrl}/group`,
    UPDATE_GROUP:( groupId: string) =>`${baseUrl}/group/${groupId}`

}
export const Students_URLS={
    GET_ALLWITHOUTGROUP:`${baseUrl}/student/without-group`,
    GET_ALL_STUDENTS:`${baseUrl}/student`,
    Delete_Student:(StudentId:string)=>`${baseUrl}/student/${StudentId}`,
    Delete_Student_From_Group:(StudentId:string,GroupId:string)=>`${baseUrl}/student/${GroupId}/${StudentId}`,
    GET_TOP_FIVE_STUDENTS:`${baseUrl}/student/top-five`,


}
export const Quizzes_URLS={
    GET_FIRSTFIVEINCOMMING_QUIZZES:`${baseUrl}/quiz/incomming`,

}
export const Questions_URLS={
    GET_All_QUESTIONS:`${baseUrl}/question`,
    DELETE_QUESTION:(QuestionId:string)=>`${baseUrl}/question/${QuestionId}`,

}