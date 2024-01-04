import { SET_DAYOFBIRTH_INPUT, SET_FULLNAME_INPUT, SET_HOMETOWN_INPUT, ADD_STUDENT, 
        UPDATE_STUDENT, SET_FIELD_INPUT, DELETE_STUDENT, SET_IMAGE_INPUT } from "./constant";

export type StudentPayload = {
    fullname: string;
    hometown: string;
    field: string;
    dateOfBirth: Date;
    image: string;
}

export type UpdateStudent = {
    index: number;
    fullname: string;
    hometown: string;
    field: string;
    image: string;
    dateOfBirth: Date;
}

export const setImageInput = (image: any):  { type: typeof SET_IMAGE_INPUT; image: any } => (
    {
        type: SET_IMAGE_INPUT,
        image
    }
)

export const setDayOfBirthInput = (dateOfBirth: Date):  { type: typeof SET_DAYOFBIRTH_INPUT; dateOfBirth: Date } => (
    {
        type: SET_DAYOFBIRTH_INPUT,
        dateOfBirth
    }
)

export const setFullnameInput = (fullname: string):  { type: typeof SET_FULLNAME_INPUT; fullname: string }=> (
    {
        type: SET_FULLNAME_INPUT,
        fullname
    }
)

export const setHometownInput = (hometown: string): { type: typeof SET_HOMETOWN_INPUT; hometown: string }=> (
    {
        type: SET_HOMETOWN_INPUT,
        hometown
    }
)

export const setFieldInput = (field: string): { type: typeof SET_FIELD_INPUT; field: string } => (
    {
        type: SET_FIELD_INPUT,
        field
    }
)

export const addStudent = (payload: StudentPayload): { type: typeof ADD_STUDENT; payload: StudentPayload} => ({
    type: ADD_STUDENT,
    payload
});

export const updateStudent = (payload: UpdateStudent): { type: typeof UPDATE_STUDENT; payload: UpdateStudent} => ({
    type: UPDATE_STUDENT,
    payload
});

export const deleteStudent = (index:number): { type: typeof DELETE_STUDENT; index:number} => ({
    type: DELETE_STUDENT,
    index
});




  